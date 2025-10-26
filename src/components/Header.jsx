import React from "react";

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Pokédex</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Search and explore Pokémon from the PokéAPI</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1 rounded border border-slate-300/60 dark:border-slate-700 px-2 py-1">
          API: pokéapi.co
        </span>
        <span className="inline-flex items-center gap-1 rounded border border-slate-300/60 dark:border-slate-700 px-2 py-1">
          Built with React + Tailwind
        </span>
      </div>
    </header>
  );
}
