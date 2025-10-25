import React from 'react';

export default function AdminFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-xs text-white/60 flex items-center justify-between">
        <div>© {new Date().getFullYear()} agie.dev</div>
        <div className="flex items-center gap-4">
          <a className="hover:text-white" href="#">Privacy</a>
          <a className="hover:text-white" href="#">Terms</a>
          <a className="hover:text-white" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
