import React from 'react';

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/10 py-10 text-sm text-white/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} agie.dev. All rights reserved.</p>
        <nav className="flex items-center gap-6">
          <a href="#hero" className="hover:text-white">Privacy</a>
          <a href="#hero" className="hover:text-white">Terms</a>
          <a href="#robot" className="hover:text-white">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
