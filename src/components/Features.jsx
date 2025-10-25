import React from 'react';
import { Wand2, Workflow, Headphones, Shield, Zap, PieChart } from 'lucide-react';

const features = [
  {
    title: 'Drag‑and‑drop builder',
    desc: 'Compose voice and chat steps, actions, and conditions — no code needed.',
    icon: Wand2,
  },
  {
    title: 'Omnichannel',
    desc: 'Deploy to phone, web, and WhatsApp with a single funnel configuration.',
    icon: Headphones,
  },
  {
    title: 'Built‑in payments',
    desc: 'Charge for calls, bookings, or upsells via Stripe — hosted checkout.',
    icon: Zap,
  },
  {
    title: 'Scheduling & CRM',
    desc: 'Two‑way calendar sync, contacts, and pipeline automations out of the box.',
    icon: Workflow,
  },
  {
    title: 'Analytics & A/B',
    desc: 'Measure drop‑offs, conversions, and iterate with experiments.',
    icon: PieChart,
  },
  {
    title: 'Production‑grade',
    desc: 'Security, observability, autoscaling, and a 99.9% uptime SLA.',
    icon: Shield,
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Everything you need to ship AI funnels</h2>
          <p className="mt-3 text-white/70">Powerful building blocks with sane defaults so you can move from idea to revenue faster.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/30 to-orange-400/30 text-white">
                <f.icon size={18} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
