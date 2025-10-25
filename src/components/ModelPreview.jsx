import React from 'react';

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

function isModelUrl(url) {
  if (!url) return false;
  return /\.(glb|gltf)(\?|#|$)/i.test(url);
}

export default function ModelPreview({ config }) {
  useModelViewer();
  const src = config?.modelSrc || '';
  const animation = config?.animation || 'Idle';
  const useInlineModel = isModelUrl(src) || src.startsWith('blob:');

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Preview</h2>
        <div className="text-xs text-white/60">{useInlineModel ? 'Inline 3D (model-viewer)' : 'Embedded viewer (iframe)'}</div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
        <div className="aspect-square w-full">
          {useInlineModel ? (
            <model-viewer
              src={src}
              alt="3D model preview"
              autoplay
              camera-controls
              animation-name={animation}
              exposure="0.95"
              shadow-intensity="0.6"
              camera-orbit="45deg 75deg 3m"
              style={{ width: '100%', height: '100%', background: 'transparent' }}
            />
          ) : src ? (
            <iframe
              title="Embedded 3D viewer"
              src={src}
              className="h-full w-full"
              allow="fullscreen; xr-spatial-tracking; accelerometer; magnetometer; gyroscope; web-share"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-center p-6 text-white/60">
              <div>
                <div className="text-white font-medium">No model selected</div>
                <div className="text-xs mt-1">Paste a .glb/.gltf URL or upload a file to preview.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-xs text-white/60">
        {useInlineModel ? (
          <div>Rendering with model-viewer. Ensure your GLB/GLTF allows CORS when hosted on another domain.</div>
        ) : (
          <div>Rendering with an embedded viewer. Controls depend on the provider (e.g., Hyper3D). For in-page animation control, use a direct GLB/GLTF URL.</div>
        )}
      </div>
    </section>
  );
}
