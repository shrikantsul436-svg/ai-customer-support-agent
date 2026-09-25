import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
          AI-Powered Customer Support
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
          AI Customer Support Agent
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          An AI agent that evaluates e-commerce refund requests using
          customer data, order information, and strict refund policies.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/chat"
            className="rounded-lg bg-white px-6 py-3 font-medium text-slate-950 transition hover:bg-slate-200"
          >
            Customer Support
          </Link>

          <Link
            href="/admin"
            className="rounded-lg border border-slate-700 px-6 py-3 font-medium transition hover:bg-slate-900"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}