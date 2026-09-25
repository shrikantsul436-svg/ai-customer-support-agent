"use client";

import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Loader2,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";

type Message = {
  id: number;
  role: "user" | "agent";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "agent",
      content:
        "Hi! I'm your AI Customer Support Agent. I can help you with orders, refunds, and refund eligibility. What can I help you with?",
    },
  ]);

  const [input, setInput] = useState("");
  const [customerId, setCustomerId] = useState("CUS001");
  const [loading, setLoading] = useState(false);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = input.trim();

    if (!message || loading) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to contact support agent.");
      }

      const agentMessage: Message = {
        id: Date.now() + 1,
        role: "agent",
        content: data.response,
      };

      setMessages((previous) => [...previous, agentMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "agent",
        content:
          error instanceof Error
            ? `Sorry, something went wrong: ${error.message}`
            : "Sorry, something went wrong while contacting the support agent.",
      };

      setMessages((previous) => [...previous, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <Bot size={22} />
            </div>

            <div>
              <h1 className="font-semibold">AI Customer Support</h1>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Agent online
              </div>
            </div>
          </div>

          <Link
            href="/admin"
            className="hidden rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 sm:block"
          >
            Admin
          </Link>
        </header>

        {/* Customer selector */}
        <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-white">
                Customer account
              </p>
              <p className="text-xs text-slate-400">
                Select a mock CRM customer for this conversation.
              </p>
            </div>

            <select
              value={customerId}
              onChange={(event) => setCustomerId(event.target.value)}
              className="rounded-lg border border-white/10 bg-[#0d1a2b] px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
            >
              <option value="CUS001">CUS001 — Rahul Sharma</option>
              <option value="CUS002">CUS002 — Priya Patil</option>
              <option value="CUS003">CUS003 — Amit Joshi</option>
              <option value="CUS004">CUS004 — Sneha Kulkarni</option>
              <option value="CUS005">CUS005 — Aditya Deshmukh</option>
              <option value="CUS006">CUS006 — Neha Shah</option>
              <option value="CUS007">CUS007 — Rohan Mehta</option>
              <option value="CUS008">CUS008 — Kavya Nair</option>
              <option value="CUS009">CUS009 — Vikram Singh</option>
              <option value="CUS010">CUS010 — Ananya Rao</option>
            </select>
          </div>
        </div>

        {/* Chat */}
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1728] shadow-2xl">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h2 className="font-semibold">Refund Support Agent</h2>
              <p className="text-xs text-slate-400">
                Checks CRM data and refund policy before taking action
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.role === "agent" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                    <Bot size={18} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[70%] ${
                    message.role === "user"
                      ? "rounded-br-md bg-cyan-500 text-white"
                      : "rounded-bl-md border border-white/10 bg-white/[0.04] text-slate-200"
                  }`}
                >
                  {message.content}
                </div>

                {message.role === "user" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-300">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <Bot size={18} />
                </div>

                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-400">
                  <Loader2 size={16} className="animate-spin" />
                  Checking your request...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4">
            <form onSubmit={sendMessage} className="flex gap-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                disabled={loading}
                placeholder="Ask about an order or refund..."
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={18} />
              </button>
            </form>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 size={14} />
              Refund decisions are verified against the configured policy.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}