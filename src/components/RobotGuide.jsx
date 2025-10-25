import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Settings, Rocket } from 'lucide-react';

function useModelViewer() {
  React.useEffect(() => {
    if (customElements.get('model-viewer')) return;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    document.head.appendChild(script);
    return () => {
      // no cleanup required
    };
  }, []);
}

const faqs = [
  {
    icon: HelpCircle,
    q: 'What is agie.dev?',
    a: 'A no-code builder to design, deploy, and scale AI voice & chat agents as conversion funnels — with payments, scheduling, and analytics built in.'
  },
  {
    icon: Settings,
    q: 'How does it work?',
    a: 'Use a drag-and-drop canvas to compose steps and actions, connect tools like Stripe, Twilio, and Calendly, then publish to phone, web, or WhatsApp in minutes.'
  },
  {
    icon: MessageSquare,
    q: 'Who is it for?',
    a: 'Product, growth, and ops teams who need to ship AI agents fast — without waiting on engineering backlogs.'
  },
  {
    icon: Rocket,
    q: 'Why is it different?',
    a: 'Production-grade reliability with A/B testing, analytics, and real-time actions so your agents both convert and get work done.'
  }
];

export default function RobotGuide() {
  useModelViewer();
  const [active, setActive] = React.useState(0);

  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-violet-500/10 via-blue-500/10 to-amber-400/10 blur-2xl" />
          <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
            {/* 3D Robot using model-viewer (Web Component) */}
            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-[#0b0b12]">
              {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
              <model-viewer
                src="https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb"
                alt="Agie — your AI robot guide"
                auto-rotate
                camera-controls
                ar
                exposure="0.9"
                camera-orbit="45deg 75deg 3.2m"
                style={{ width: '100%', height: '100%', background: 'transparent' }}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-white/60">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3"><span className="text-white font-semibold">Realtime</span><br/>Voice & chat</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3"><span className="text-white font-semibold">Plug & Play</span><br/>Stripe, Twilio</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3"><span className="text-white font-semibold">Insights</span><br/>A/B + analytics</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Meet Agie — your robot guide
          </div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Let Agie show you what agie.dev can do</h2>
          <p className="mt-3 text-white/70">Tap a topic — Agie explains how the no-code builder helps you design, launch, and scale AI agent funnels.</p>

          <div className="mt-8 grid grid-cols-1 gap-3">
            {faqs.map((item, i) => (
              <button
                key={item.q}
                onClick={() => setActive(i)}
                className={`group flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                  active === i
                    ? 'border-violet-400/40 bg-white/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <span className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg ${
                  active === i ? 'bg-violet-500/30' : 'bg-white/10'
                }`}>
                  <item.icon size={18} />
                </span>
                <div>
                  <div className="font-medium text-white">{item.q}</div>
                  <div className={`mt-1 text-sm ${active === i ? 'text-white/90' : 'text-white/70'}`}>{item.a}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <a href="#pricing" className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-500 via-blue-500 to-amber-400 px-6 font-medium text-[#0b0b12] hover:opacity-95">Start free</a>
            <a href="#features" className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 px-6 text-white/80 hover:bg-white/5">Explore features</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
