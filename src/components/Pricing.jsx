import React from 'react';

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    desc: 'Prototype and test quickly',
    features: [
      '1 active funnel',
      '100 monthly interactions',
      'Basic analytics',
      'Community support',
    ],
    cta: 'Start free',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$49',
    period: '/mo',
    desc: 'Scale your first wins',
    features: [
      '5 active funnels',
      '5k monthly interactions',
      'A/B testing',
      'Email support',
    ],
    cta: 'Start trial',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: '$199',
    period: '/mo',
    desc: 'For teams in production',
    features: [
      'Unlimited funnels',
      '50k monthly interactions',
      'SLA + SSO',
      'Priority support',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-3 text-white/70">Start free. Upgrade when you’re ready to scale.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.name} className={`relative rounded-2xl border ${t.highlighted ? 'border-violet-400/40' : 'border-white/10'} bg-white/5 p-6`}> 
              {t.highlighted && (
                <div className="absolute -top-3 left-6 rounded-full border border-violet-400/30 bg-violet-400/10 px-2 py-0.5 text-[10px] text-violet-200">Most Popular</div>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-white/70">{t.desc}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-3xl font-bold">{t.price}</span>
                <span className="text-white/60">{t.period}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="text-green-400">✓</span>{f}</li>
                ))}
              </ul>
              <a href="#hero" className={`mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl px-6 font-medium ${t.highlighted ? 'bg-gradient-to-tr from-violet-500 via-blue-500 to-amber-400 text-[#0b0b12]' : 'border border-white/10 text-white/90 hover:bg-white/5'}`}>{t.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
