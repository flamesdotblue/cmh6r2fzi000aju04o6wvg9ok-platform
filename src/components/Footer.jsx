import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-white font-semibold">agie.dev</div>
            <p className="mt-1 text-sm text-slate-400">No-code builder for AI voice agents.</p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#use-cases" className="hover:text-white transition">Use Cases</a>
            <a href="#docs" className="hover:text-white transition">Docs</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#privacy" className="hover:text-white transition">Privacy</a>
            <a href="#terms" className="hover:text-white transition">Terms</a>
          </nav>
        </div>
        <div className="mt-8 text-xs text-slate-500">© {new Date().getFullYear()} agie.dev. All rights reserved.</div>
      </div>
    </footer>
  );
}
