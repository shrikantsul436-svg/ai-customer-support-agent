import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { readFile } from "fs/promises";
import path from "path";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type Order = {
  id: string;
  customerId: string;
  productName: string;
  category: string;
  price: number;
  orderDate: string;
  deliveryDate: string;
  status: string;
  refundStatus: string;
  downloaded?: boolean;
};

type Refund = {
  id: string;
  orderId: string;
  customerId: string;
  amount: number;
  reason: string;
  status: string;
  createdAt: string;
};

async function loadJson<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), "data", filename);
  const file = await readFile(filePath, "utf-8");

  return JSON.parse(file) as T;
}

/**
 * Get customer information from the mock CRM.
 */
export const getCustomer = tool(
  async ({ customerId }) => {
    const customers = await loadJson<Customer[]>("customers.json");

    const customer = customers.find(
      (item) => item.id.toLowerCase() === customerId.toLowerCase()
    );

    if (!customer) {
      return JSON.stringify({
        found: false,
        message: `Customer ${customerId} was not found.`,
      });
    }

    return JSON.stringify({
      found: true,
      customer,
    });
  },
  {
    name: "get_customer",
    description:
      "Retrieve a customer profile from the CRM using the customer ID.",
    schema: z.object({
      customerId: z.string().describe("Customer ID such as CUS001"),
    }),
  }
);

/**
 * Get order information.
 */
export const getOrder = tool(
  async ({ orderId }) => {
    const orders = await loadJson<Order[]>("orders.json");

    const order = orders.find(
      (item) => item.id.toLowerCase() === orderId.toLowerCase()
    );

    if (!order) {
      return JSON.stringify({
        found: false,
        message: `Order ${orderId} was not found.`,
      });
    }

    return JSON.stringify({
      found: true,
      order,
    });
  },
  {
    name: "get_order",
    description:
      "Retrieve complete order information using an order ID.",
    schema: z.object({
      orderId: z.string().describe("Order ID such as ORD1001"),
    }),
  }
);

/**
 * Get refund history.
 */
export const getRefundHistory = tool(
  async ({ orderId }) => {
    const refunds = await loadJson<Refund[]>("refunds.json");

    const orderRefunds = refunds.filter(
      (item) => item.orderId.toLowerCase() === orderId.toLowerCase()
    );

    return JSON.stringify({
      orderId,
      hasPreviousRefund: orderRefunds.length > 0,
      refunds: orderRefunds,
    });
  },
  {
    name: "get_refund_history",
    description:
      "Check whether an order has previously received a refund.",
    schema: z.object({
      orderId: z.string().describe("Order ID such as ORD1009"),
    }),
  }
);

/**
 * Get the strict refund policy.
 */
export const getRefundPolicy = tool(
  async () => {
    const filePath = path.join(
      process.cwd(),
      "data",
      "refund-policy.md"
    );

    const policy = await readFile(filePath, "utf-8");

    return policy;
  },
  {
    name: "get_refund_policy",
    description:
      "Retrieve the official e-commerce refund policy document.",
    schema: z.object({}),
  }
);

/**
 * Validate refund eligibility using deterministic business rules.
 *
 * The LLM can request this tool, but the final validation
 * happens in application code.
 */
export const checkRefundEligibility = tool(
  async ({ orderId, reason }) => {
    const orders = await loadJson<Order[]>("orders.json");
    const refunds = await loadJson<Refund[]>("refunds.json");

    const order = orders.find(
      (item) => item.id.toLowerCase() === orderId.toLowerCase()
    );

    if (!order) {
      return JSON.stringify({
        eligible: false,
        reason: "ORDER_NOT_FOUND",
        message: `Order ${orderId} does not exist.`,
      });
    }

    const previousRefund = refunds.find(
      (item) =>
        item.orderId.toLowerCase() === orderId.toLowerCase() &&
        item.status === "COMPLETED"
    );

    if (previousRefund) {
      return JSON.stringify({
        eligible: false,
        reason: "ALREADY_REFUNDED",
        message:
          "This order already has a completed refund.",
      });
    }

    if (order.category === "Digital" && order.downloaded) {
      return JSON.stringify({
        eligible: false,
        reason: "DIGITAL_PRODUCT_DOWNLOADED",
        message:
          "Downloaded digital products are not refundable.",
      });
    }

    const eligibleReasons = [
      "damaged",
      "defective",
      "wrong product",
      "wrong product received",
      "different from description",
      "significantly different from description",
    ];

    const normalizedReason = reason.toLowerCase().trim();

    const reasonAllowed = eligibleReasons.some((allowedReason) =>
      normalizedReason.includes(allowedReason)
    );

    if (!reasonAllowed) {
      return JSON.stringify({
        eligible: false,
        reason: "REASON_NOT_ELIGIBLE",
        message:
          "The requested refund reason is not covered by the refund policy.",
      });
    }

    const deliveryDate = new Date(order.deliveryDate);
    const today = new Date();

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const daysSinceDelivery = Math.floor(
      (today.getTime() - deliveryDate.getTime()) /
        millisecondsPerDay
    );

    if (daysSinceDelivery > 30) {
      return JSON.stringify({
        eligible: false,
        reason: "REFUND_WINDOW_EXPIRED",
        message:
          "The refund request is outside the 30-day refund window.",
        daysSinceDelivery,
      });
    }

    if (daysSinceDelivery < 0) {
      return JSON.stringify({
        eligible: false,
        reason: "INVALID_DELIVERY_DATE",
        message: "The delivery date is in the future.",
      });
    }

    return JSON.stringify({
      eligible: true,
      reason: "POLICY_CHECK_PASSED",
      message:
        "The order satisfies the current refund eligibility rules.",
      orderId,
      refundAmount: order.price,
      daysSinceDelivery,
    });
  },
  {
    name: "check_refund_eligibility",
    description:
      "Deterministically validate whether an order qualifies for a refund according to the refund policy.",
    schema: z.object({
      orderId: z.string().describe("Order ID"),
      reason: z
        .string()
        .describe("Customer's reason for requesting the refund"),
    }),
  }
);

/**
 * Process a refund only after deterministic validation.
 */
export const processRefund = tool(
  async ({ orderId, reason }) => {
    const eligibility = await checkRefundEligibility.invoke({
      orderId,
      reason,
    });

    const result = JSON.parse(eligibility as string);

    if (!result.eligible) {
      return JSON.stringify({
        success: false,
        message: result.message,
        reason: result.reason,
      });
    }

    return JSON.stringify({
      success: true,
      orderId,
      amount: result.refundAmount,
      status: "APPROVED",
      message: `Refund approved for ₹${result.refundAmount}.`,
    });
  },
  {
    name: "process_refund",
    description:
      "Process a refund only when deterministic refund-policy validation succeeds.",
    schema: z.object({
      orderId: z.string().describe("Order ID"),
      reason: z.string().describe("Customer's refund reason"),
    }),
  }
);

export const refundTools = [
  getCustomer,
  getOrder,
  getRefundHistory,
  getRefundPolicy,
  checkRefundEligibility,
  processRefund,
];