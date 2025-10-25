import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-48 left-1/4 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-[520px] w-[520px] rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-400" />
            Live: No‑code AI Agent Funnels
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Build AI funnels without code
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Design, deploy, and scale AI voice & chat agents with payments, scheduling, and analytics — all in one place.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <a href="#pricing" className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-500 via-blue-500 to-amber-400 px-6 font-medium text-[#0b0b12] shadow-lg shadow-violet-500/10 hover:opacity-95">Start free</a>
            <a href="#features" className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 px-6 text-white/80 hover:bg-white/5">See features</a>
          </div>
          <p className="mt-3 text-xs text-white/50">Free plan • No credit card • Ship in minutes</p>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
            <div className="aspect-square w-full overflow-hidden rounded-xl">
              <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-6 blur-2xl opacity-70">
            <div className="h-full w-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.18),rgba(96,165,250,0.14),rgba(245,158,11,0.10),transparent)]" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-white/60">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3"><span className="text-white font-semibold">+27%</span><br/>Conversion rate</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3"><span className="text-white font-semibold">-62%</span><br/>Time to deploy</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3"><span className="text-white font-semibold">99.9%</span><br/>Uptime SLA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
