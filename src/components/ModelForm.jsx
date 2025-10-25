import React from 'react';
import { Upload, Link as LinkIcon, Save, RefreshCw, Info } from 'lucide-react';

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

export default function ModelForm({ config, onSave, onReset }) {
  useModelViewer();
  const [sourceKind, setSourceKind] = React.useState(config.sourceKind || 'url');
  const [modelSrc, setModelSrc] = React.useState(config.modelSrc || '');
  const [animation, setAnimation] = React.useState(config.animation || 'Idle');
  const [uploadName, setUploadName] = React.useState('');
  const [uploadObjectUrl, setUploadObjectUrl] = React.useState('');

  React.useEffect(() => {
    setSourceKind(config.sourceKind || 'url');
    setModelSrc(config.modelSrc || '');
    setAnimation(config.animation || 'Idle');
  }, [config]);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/\.(glb|gltf)$/i.test(file.name)) {
      alert('Please select a .glb or .gltf file');
      return;
    }
    if (uploadObjectUrl) URL.revokeObjectURL(uploadObjectUrl);
    const url = URL.createObjectURL(file);
    setUploadObjectUrl(url);
    setUploadName(file.name);
    setModelSrc(url);
    setSourceKind('upload');
  };

  const handleSave = () => {
    const next = { sourceKind, modelSrc, animation };
    onSave?.(next);
  };

  const useDefault = () => {
    setSourceKind('url');
    setModelSrc('https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb');
    setAnimation('Idle');
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Model source</h2>
        <p className="text-sm text-white/60">Paste a direct .glb/.gltf URL for best results. Upload is great for previewing locally.</p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <button onClick={() => setSourceKind('url')} className={`rounded-md px-3 py-1 border ${sourceKind==='url' ? 'border-violet-400/40 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
          <span className="inline-flex items-center gap-1"><LinkIcon size={12} /> URL</span>
        </button>
        <button onClick={() => setSourceKind('upload')} className={`rounded-md px-3 py-1 border ${sourceKind==='upload' ? 'border-violet-400/40 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
          <span className="inline-flex items-center gap-1"><Upload size={12} /> Upload</span>
        </button>
      </div>

      {sourceKind === 'url' && (
        <div className="mt-4">
          <label className="text-sm text-white/80">Direct .glb/.gltf URL</label>
          <input
            value={modelSrc}
            onChange={(e) => setModelSrc(e.target.value)}
            placeholder="https://your-cdn.com/model.glb"
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400/40"
          />
          <p className="mt-2 text-xs text-white/50 inline-flex items-center gap-1"><Info size={12} /> If you paste a web page (e.g. Hyper3D viewer), we will show it in an iframe preview instead of a native 3D model.</p>
        </div>
      )}

      {sourceKind === 'upload' && (
        <div className="mt-4">
          <label className="text-sm text-white/80">Upload .glb/.gltf</label>
          <input type="file" accept=".glb,.gltf" onChange={onFile} className="mt-2 block text-sm" />
          {uploadName && (
            <div className="mt-2 text-xs text-white/60">Selected: {uploadName}</div>
          )}
          <p className="mt-2 text-xs text-amber-200/80">Uploads are not persisted. For production, host the file and use a URL.</p>
        </div>
      )}

      <div className="mt-6">
        <label className="text-sm text-white/80">Default animation name</label>
        <input
          value={animation}
          onChange={(e) => setAnimation(e.target.value)}
          placeholder="Idle"
          className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400/40"
        />
        <p className="mt-2 text-xs text-white/50 inline-flex items-center gap-1"><Info size={12} /> Must match a clip in your model to autoplay that animation.</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900">
          <Save size={14} /> Save config
        </button>
        <button onClick={onReset} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm">
          <RefreshCw size={14} /> Reset
        </button>
        <button onClick={useDefault} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
          Use sample robot
        </button>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
        <div className="font-medium text-white">Tip: Hyper3D link</div>
        <div className="mt-1">If you paste a Hyper3D viewer URL (like https://hyper3d.ai/rodin/...) we7ll show it in the Preview as an embedded viewer. To use full in-page controls and animations, provide a direct .glb/.gltf URL instead.</div>
      </div>
    </section>
  );
}
