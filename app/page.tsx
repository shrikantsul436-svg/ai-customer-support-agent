"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Headphones,
  Loader2,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Support",
    description:
      "An intelligent support agent understands customer requests and finds the right action.",
  },
  {
    icon: ShieldCheck,
    title: "Policy-First Decisions",
    description:
      "Refund requests are checked against strict business rules before a decision is made.",
  },
  {
    icon: Headphones,
    title: "Human-Friendly Experience",
    description:
      "Customers get clear answers through chat, with voice support available as an option.",
  },
];

type Message = {
  id: number;
  role: "user" | "agent";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "agent",
      content:
        "Hi! I'm your AI Customer Support Agent. Ask me about an order, refund, or refund eligibility.",
    },
  ]);

  const [input, setInput] = useState("");
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
          customerId: "CUS001",
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "The support agent could not process your request."
        );
      }

      const agentMessage: Message = {
        id: Date.now() + 1,
        role: "agent",
        content:
          typeof data.response === "string"
            ? data.response
            : JSON.stringify(data.response),
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
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-[-180px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-[-100px] top-1/3 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20">
              <Sparkles size={21} />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide">
                AI Customer
              </p>
              <p className="text-xs text-slate-400">Support Agent</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Features
            </a>

            <Link
              href="/chat"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Customer Support
            </Link>

            <Link
              href="/admin"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-32 lg:pt-28">
          <div className="flex flex-col justify-center">
            <div className="mb-7 flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-sm text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              AI-powered customer operations
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Customer support that{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                checks before it acts.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
              An intelligent AI support agent that connects customer requests
              with CRM information, order details, and strict refund policies
              to make consistent decisions.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/chat"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 shadow-xl shadow-cyan-400/10 transition hover:bg-cyan-300"
              >
                Try the Support Agent
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-semibold text-white transition hover:bg-white/[0.07]"
              >
                View Admin Dashboard
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" />
                Policy validation
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" />
                CRM lookup
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" />
                Refund decisions
              </span>
            </div>
          </div>

          {/* REAL AGENT */}
          <div className="relative flex items-center justify-center">
            <div className="absolute h-[380px] w-[380px] rounded-full bg-cyan-400/10 blur-[90px]" />

            <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl backdrop-blur-xl">
              <div className="rounded-2xl border border-white/[0.07] bg-[#0b1728]">

                {/* Agent header */}
                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                      <Bot size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Refund Support Agent
                      </p>

                      <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            loading
                              ? "animate-pulse bg-yellow-400"
                              : "bg-emerald-400"
                          }`}
                        />

                        {loading ? "Processing request..." : "Agent active"}
                      </div>
                    </div>
                  </div>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                    LIVE
                  </span>
                </div>

                {/* Messages */}
                <div className="max-h-[470px] min-h-[350px] space-y-5 overflow-y-auto p-5">

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
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                          <Bot size={16} />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                          message.role === "user"
                            ? "rounded-br-md bg-cyan-400 font-medium text-slate-950"
                            : "rounded-tl-md border border-white/[0.07] bg-white/[0.04] text-slate-300"
                        }`}
                      >
                        {message.content}
                      </div>

                      {message.role === "user" && (
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-slate-300">
                          <User size={16} />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Loading */}
                  {loading && (
                    <div className="flex gap-3">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                        <Bot size={16} />
                      </div>

                      <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-white/[0.07] bg-white/[0.04] px-4 py-3 text-sm text-slate-400">
                        <Loader2 size={15} className="animate-spin" />
                        Checking CRM and refund policy...
                      </div>
                    </div>
                  )}
                </div>

                {/* Real input */}
                <div className="border-t border-white/[0.07] p-4">
                  <form
                    onSubmit={sendMessage}
                    className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1.5"
                  >
                    <input
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      disabled={loading}
                      placeholder="Ask about an order or refund..."
                      className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 disabled:opacity-50"
                    />

                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400 text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                    </button>
                  </form>

                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    Connected to the real AI support agent
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 border-t border-white/[0.06] bg-white/[0.015]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Built for reliable support
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              More than a chatbot.
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              The agent uses business data and policy rules to make support
              decisions instead of simply generating a response.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>AI Customer Support Agent</p>
          <p>AI-powered e-commerce refund operations</p>
        </div>
      </footer>
    </main>
  );
}