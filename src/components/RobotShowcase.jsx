import React from 'react';
import { Sparkles, Play, Pause } from 'lucide-react';

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

export default function RobotShowcase() {
  useModelViewer();
  const mvRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(true);

  const togglePlay = () => {
    const el = mvRef.current;
    if (!el) return;
    if (playing) {
      // Pause by removing autoplay and setting animationName to none
      el.pause && el.pause();
      setPlaying(false);
    } else {
      el.play && el.play();
      setPlaying(true);
    }
  };

  return (
    <section id="robot" className="relative py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Sparkles size={14} /> Animated 3D robot
          </div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Your model is live and animated</h2>
          <p className="mt-2 text-white/70">We load your local GLB at <code class="font-mono">/models/robot.glb</code>. It autoplays the first animation clip and supports orbit controls. Replace the file anytime — no code changes needed.</p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <button onClick={togglePlay} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 hover:bg-white/20">
              {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? 'Pause' : 'Play'}
            </button>
            <a href="#hero" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-violet-500 via-blue-500 to-amber-400 px-4 py-2 font-medium text-[#0b0b12] hover:opacity-95">Start free</a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-violet-500/10 via-blue-500/10 to-amber-400/10 blur-2xl" />
          <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-[#0b0b12]">
              {/* Your GLB must exist at public/models/robot.glb */}
              <model-viewer
                ref={mvRef}
                src="/models/robot.glb"
                alt="Agie — interactive 3D robot"
                autoplay
                ar
                camera-controls
                exposure="0.95"
                shadow-intensity="0.6"
                camera-orbit="45deg 75deg 3m"
                interaction-prompt="none"
                style={{ width: '100%', height: '100%', background: 'transparent' }}
              />
            </div>
          </div>
          <div className="mt-3 text-xs text-white/50">If the model doesn’t appear, ensure your GLB is saved at /public/models/robot.glb and that animations are included.</div>
        </div>
      </div>
    </section>
  );
}
