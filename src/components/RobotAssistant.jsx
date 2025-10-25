import React from 'react';
import { Mic, MicOff, Volume2, Send, Bot as BotIcon, Pause, Play, Sparkles } from 'lucide-react';

function useModelViewer() {
  React.useEffect(() => {
    if (typeof window !== 'undefined' && !customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);
}

function useSpeech() {
  const synthRef = React.useRef(typeof window !== 'undefined' ? window.speechSynthesis : undefined);
  const speak = React.useCallback((text) => {
    try {
      if (!synthRef.current) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1.02;
      utter.pitch = 1.0;
      utter.volume = 1.0;
      synthRef.current.cancel();
      synthRef.current.speak(utter);
    } catch {}
  }, []);
  return { speak };
}

function useRecognition({ onResult, onStart, onEnd }) {
  const recRef = React.useRef(null);
  const [available, setAvailable] = React.useState(false);

  React.useEffect(() => {
    const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) return;
    setAvailable(true);
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) => {
      let txt = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        txt += e.results[i][0].transcript;
      }
      onResult?.(txt);
    };
    rec.onstart = () => onStart?.();
    rec.onend = () => onEnd?.();
    recRef.current = rec;
  }, [onEnd, onResult, onStart]);

  const start = React.useCallback(() => {
    try { recRef.current?.start(); } catch {}
  }, []);
  const stop = React.useCallback(() => {
    try { recRef.current?.stop(); } catch {}
  }, []);

  return { available, start, stop };
}

const cannedReplies = [
  {
    match: /what is agie|what's agie|about agie/i,
    reply: 'Agie.dev is a no‑code builder to design, deploy, and scale AI voice and chat agents as funnels. Connect Stripe, Twilio, Calendly — go live in minutes.'
  },
  {
    match: /price|pricing|cost/i,
    reply: 'We have a free Starter plan, Growth at $49/mo, and Scale at $199/mo with SSO and SLA.'
  },
  {
    match: /how.*work|how do i start|get started/i,
    reply: 'Drag steps on a canvas, connect integrations, then publish to web, phone, or WhatsApp. Start free — no credit card.'
  },
  {
    match: /hello|hi|hey/i,
    reply: 'Hello! I\'m Agie, your robot guide. Ask me about features, pricing, or deployment.'
  }
];

export default function RobotAssistant() {
  useModelViewer();
  const robotRef = React.useRef(null);
  const [listening, setListening] = React.useState(false);
  const [animation, setAnimation] = React.useState('Idle');
  const [muted, setMuted] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([
    { role: 'bot', text: "Hi, I'm Agie — your robot guide. Ask me anything about agie.dev!" }
  ]);

  const { speak } = useSpeech();

  const onResult = (text) => setInput(text);
  const onStart = () => {
    setListening(true);
    playAnimation('Walk', 1400, 'Idle');
  };
  const onEnd = () => {
    setListening(false);
    if (input.trim()) handleSubmit(input.trim());
    setInput('');
  };

  const { available, start, stop } = useRecognition({ onResult, onStart, onEnd });

  const pickReply = (q) => {
    for (const c of cannedReplies) {
      if (c.match.test(q)) return c.reply;
    }
    return 'Agie.dev helps you build AI voice and chat agents as conversion funnels. Ask about features, pricing, or how to deploy.';
  };

  const handleSubmit = (text) => {
    const userMsg = { role: 'user', text };
    const replyText = pickReply(text);
    const botMsg = { role: 'bot', text: replyText };
    setMessages((m) => [...m, userMsg, botMsg]);
    if (!muted) speak(replyText);
    playAnimation('Wave', 1600, 'Idle');
  };

  const toggleMic = () => {
    if (!available) return;
    if (listening) stop(); else start();
  };

  const playAnimation = (name, duration = 0, then = 'Idle') => {
    setAnimation(name);
    if (duration > 0) {
      window.clearTimeout(playAnimation._t);
      playAnimation._t = window.setTimeout(() => setAnimation(then), duration);
    }
  };

  const handleQuick = (name, say) => {
    playAnimation(name, 1500, 'Idle');
    if (say && !muted) speak(say);
  };

  return (
    <section id="assistant" className="relative py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-violet-500/10 via-blue-500/10 to-amber-400/10 blur-2xl" />
            <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-[#0b0b12]">
                <model-viewer
                  ref={robotRef}
                  src="https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb"
                  alt="Agie — interactive robot guide"
                  autoplay
                  animation-name={animation}
                  ar
                  camera-controls
                  exposure="0.95"
                  shadow-intensity="0.6"
                  camera-orbit="45deg 75deg 3.2m"
                  style={{ width: '100%', height: '100%', background: 'transparent' }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <button onClick={() => handleQuick('Wave', 'Hello! I can wave, walk, and chat about agie.dev.')} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10">👋 Wave</button>
            <button onClick={() => handleQuick('Walk', 'Walking into your product-led future!')} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10">🚶 Walk</button>
            <button onClick={() => handleQuick('Dance', 'Shipping is a dance — you lead, I follow.')} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10">💃 Dance</button>
            <button onClick={() => setAnimation((a) => (a === 'Idle' ? 'Standing' : 'Idle'))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10">{animation === 'Idle' ? <span className="inline-flex items-center gap-1"><Pause size={12} /> Idle</span> : <span className="inline-flex items-center gap-1"><Play size={12} /> Play</span>}</button>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Sparkles size={14} /> Robot product guide
          </div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Talk, walk, and learn with Agie</h2>
          <p className="mt-2 text-white/70">Ask about features, pricing, or how to deploy. Use the mic for voice, or type below. Agie responds with voice and moves for emphasis.</p>

          <div className="mt-6 h-[280px] overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === 'bot' ? 'flex items-start gap-3' : 'flex items-start gap-3 justify-end'}>
                {m.role === 'bot' && (
                  <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-gradient-to-tr from-violet-500 via-blue-500 to-amber-400" />
                )}
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${m.role === 'bot' ? 'bg-white/10' : 'bg-white/20 text-white'}`}>{m.text}</div>
                {m.role === 'user' && (
                  <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-white/20" />
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!input.trim()) return;
              const text = input.trim();
              setInput('');
              handleSubmit(text);
            }}
            className="mt-3 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the robot… e.g. What is agie.dev?"
              className="w-full rounded-xl border border-white/10 bg-[#0b0b12] px-4 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400/40"
            />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-medium hover:bg-white/20">
              <Send size={14} />
            </button>
            <button
              type="button"
              onClick={toggleMic}
              disabled={!available}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium ${listening ? 'bg-red-500 text-white' : 'border border-white/10 bg-white/10 hover:bg-white/20'}`}
              title={available ? 'Use your microphone' : 'Speech recognition not supported'}
            >
              {listening ? <MicOff size={14} /> : <Mic size={14} />} {listening ? 'Stop' : 'Speak'}
            </button>
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-medium hover:bg-white/20"
              title={muted ? 'Unmute voice' : 'Mute voice'}
            >
              <Volume2 size={14} /> {muted ? 'Muted' : 'Voice on'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
