import { NextRequest, NextResponse } from "next/server";
import {
  HumanMessage,
  AIMessage,
  BaseMessage,
} from "@langchain/core/messages";
import { refundAgent } from "@/agent/graph";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      message,
      customerId,
      history = [],
    } = body;

    if (!message || !customerId) {
      return NextResponse.json(
        {
          success: false,
          error: "message and customerId are required",
        },
        { status: 400 }
      );
    }

    /*
     * Rebuild previous conversation messages.
     *
     * This is important because LangGraph does not automatically
     * remember messages between separate API requests.
     */
    const previousMessages: BaseMessage[] = history.map(
      (item: { role: string; content: string }) => {
        if (item.role === "user") {
          return new HumanMessage(item.content);
        }

        return new AIMessage(item.content);
      }
    );

    /*
     * Add the current customer message.
     */
    const currentMessage = new HumanMessage(
      `Customer ID: ${customerId}

Customer message: ${message}`
    );

    /*
     * Send the complete conversation to LangGraph.
     */
    const result = await refundAgent.invoke({
      messages: [...previousMessages, currentMessage],
    });

    const messages = result.messages;
    const lastMessage = messages[messages.length - 1];

    return NextResponse.json({
      success: true,
      response: lastMessage?.content ?? "No response generated.",
    });
  } catch (error) {
    console.error("CHAT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}