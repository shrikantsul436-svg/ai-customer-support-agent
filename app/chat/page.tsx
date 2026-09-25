"use client";

import { FormEvent, useState } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
  Loader2,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const customers = [
  { id: "CUS001", name: "Rahul Sharma" },
  { id: "CUS002", name: "Priya Patil" },
  { id: "CUS003", name: "Amit Joshi" },
  { id: "CUS004", name: "Sneha Kulkarni" },
  { id: "CUS005", name: "Aditya Deshmukh" },
  { id: "CUS006", name: "Neha Shah" },
  { id: "CUS007", name: "Rohan Mehta" },
  { id: "CUS008", name: "Kavya Nair" },
  { id: "CUS009", name: "Vikram Singh" },
  { id: "CUS010", name: "Ananya Rao" },
];

export default function ChatPage() {
  const [customerId, setCustomerId] = useState("CUS001");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Customer Support Agent. I can help you with orders, refunds, and refund eligibility. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e?: FormEvent) {
    e?.preventDefault();

    const message = input.trim();

    if (!message || loading) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: message,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setLoading(true);

    try {
      console.log("Sending message:", {
        message,
        customerId,
      });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          customerId,
          history: messages,
        }),
      });

      console.log("API status:", response.status);

      const data = await response.json();

      console.log("API response:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "The support agent could not process your request."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            typeof data.response === "string"
              ? data.response
              : JSON.stringify(data.response),
        },
      ]);
    } catch (error) {
      console.error("CHAT ERROR:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? `Sorry, something went wrong: ${error.message}`
              : "Sorry, something went wrong while contacting the support agent.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.07] bg-[#07111f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
              <Sparkles size={20} />
            </div>

            <div>
              <h1 className="text-sm font-semibold sm:text-base">
                AI Customer Support
              </h1>
              <p className="text-xs text-slate-500">
                Policy-aware support agent
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-emerald-300">
              Agent Online
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl flex-col px-4 py-6 sm:px-6">
        {/* Customer selector */}
        <div className="mb-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Customer
              </p>

              <p className="mt-1 text-sm text-slate-300">
                Select the customer profile for this conversation.
              </p>
            </div>

            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0b1728] px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-400/50"
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.id} — {customer.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chat */}
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] shadow-2xl">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <Bot size={20} />
            </div>

            <div>
              <p className="font-semibold">Refund Support Agent</p>
              <p className="text-xs text-slate-500">
                Connected to CRM and refund policy
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="min-h-[450px] flex-1 space-y-5 overflow-y-auto p-5">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex gap-3 ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Bot size={17} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-br-md bg-cyan-400 font-medium text-slate-950"
                      : "rounded-tl-md border border-white/[0.07] bg-white/[0.04] text-slate-300"
                  }`}
                >
                  {message.content}
                </div>

                {message.role === "user" && (
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-slate-300">
                    <User size={17} />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Bot size={17} />
                </div>

                <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-white/[0.07] bg-white/[0.04] px-4 py-3">
                  <Loader2
                    size={16}
                    className="animate-spin text-cyan-300"
                  />

                  <span className="text-sm text-slate-400">
                    Agent is thinking...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/[0.07] p-4">
            <form
              onSubmit={sendMessage}
              className="flex items-end gap-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about an order or refund..."
                disabled={loading}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0b1728] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400 text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                {loading ? (
                  <Loader2 size={19} className="animate-spin" />
                ) : (
                  <Send size={19} />
                )}
              </button>
            </form>

            <p className="mt-2 px-1 text-[11px] text-slate-600">
              Press Enter to send your message.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}