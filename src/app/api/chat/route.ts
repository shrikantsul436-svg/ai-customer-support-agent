import { NextRequest, NextResponse } from "next/server";

import {
  HumanMessage,
} from "@langchain/core/messages";

import { refundAgent } from "@/agent/graph";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const message = body.message;
    const customerId = body.customerId;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        {
          error: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    const customerContext = customerId
      ? `The selected customer is ${customerId}.`
      : "No customer has been selected.";

    const result = await refundAgent.invoke({
      messages: [
        new HumanMessage(
          `${customerContext}

Customer request:
${message}`
        ),
      ],
    });

    const messages = result.messages;

    const lastMessage = messages[messages.length - 1];

    let responseText = "";

    if (
      lastMessage &&
      typeof lastMessage.content === "string"
    ) {
      responseText = lastMessage.content;
    } else {
      responseText =
        "I could not generate a response. Please try again.";
    }

    return NextResponse.json({
      success: true,
      response: responseText,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "The support agent could not process your request.",
      },
      {
        status: 500,
      }
    );
  }
}