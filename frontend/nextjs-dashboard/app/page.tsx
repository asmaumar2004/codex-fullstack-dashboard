import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <section className="w-full max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Beginner Full-Stack Project
        </p>
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
          Codex Full-Stack Dashboard
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Learn how a Next.js frontend and a FastAPI backend work together in a
          simple dashboard application.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </section>
    </main>
  );
}
