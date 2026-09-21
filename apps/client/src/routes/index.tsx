import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-slate-50">
      <section className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Fidel
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          TanStack Start is ready.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          The client app is running with React, server-side rendering, and
          Tailwind CSS.
        </p>
      </section>
    </main>
  )
}
