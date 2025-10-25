import React from 'react';
import { Settings, Rocket } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-500 via-blue-500 to-amber-400">
            <Rocket size={16} className="text-slate-950" />
          </span>
          <div>
            <div className="text-white font-semibold leading-5">agie.dev</div>
            <div className="text-xs text-white/60 -mt-0.5">Model Admin</div>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 text-sm text-white/70">
          <Settings size={16} />
          Configure your robot model
        </div>
      </div>
    </header>
  );
}
