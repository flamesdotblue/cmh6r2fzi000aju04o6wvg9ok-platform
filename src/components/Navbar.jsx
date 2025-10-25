import React from 'react';
import { Rocket } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-[#0b0b12]/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-500 via-blue-500 to-amber-400">
              <Rocket size={16} className="text-[#0b0b12]" />
            </span>
            <span className="text-white">agie.dev</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#assistant" className="hover:text-white">Robot guide</a>
            <a href="#assistant" className="hover:text-white">Demo</a>
            <a href="#assistant" className="hover:text-white">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#assistant" className="hidden sm:inline-flex h-9 items-center rounded-lg border border-white/10 px-3 text-sm text-white/80 hover:bg-white/5">Meet Agie</a>
            <a href="#assistant" className="inline-flex h-9 items-center rounded-lg bg-gradient-to-tr from-violet-500 via-blue-500 to-amber-400 px-4 text-sm font-medium text-[#0b0b12] hover:opacity-95">Get started</a>
          </div>
        </div>
      </div>
    </header>
  );
}
