import React from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonGrid({ pokemons, loading, emptyMessage = "No results" }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-800/40 h-48" />
        ))}
      </div>
    );
  }

  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="text-center text-slate-500 dark:text-slate-400 py-10">{emptyMessage}</div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemons.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />)
      )}
    </div>
  );
}
