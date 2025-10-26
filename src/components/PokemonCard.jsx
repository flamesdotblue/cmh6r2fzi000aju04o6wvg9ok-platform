import React from "react";

const TYPE_COLORS = {
  normal: "bg-stone-500/20 text-stone-700 dark:text-stone-200",
  fire: "bg-orange-500/20 text-orange-700 dark:text-orange-200",
  water: "bg-blue-500/20 text-blue-700 dark:text-blue-200",
  grass: "bg-green-500/20 text-green-700 dark:text-green-200",
  electric: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-200",
  ice: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-200",
  fighting: "bg-red-600/20 text-red-700 dark:text-red-200",
  poison: "bg-fuchsia-500/20 text-fuchsia-700 dark:text-fuchsia-200",
  ground: "bg-amber-700/20 text-amber-800 dark:text-amber-200",
  flying: "bg-indigo-500/20 text-indigo-700 dark:text-indigo-200",
  psychic: "bg-pink-500/20 text-pink-700 dark:text-pink-200",
  bug: "bg-lime-500/20 text-lime-700 dark:text-lime-200",
  rock: "bg-yellow-800/20 text-yellow-900 dark:text-yellow-200",
  ghost: "bg-violet-600/20 text-violet-700 dark:text-violet-200",
  dragon: "bg-purple-600/20 text-purple-700 dark:text-purple-200",
  dark: "bg-neutral-700/20 text-neutral-800 dark:text-neutral-200",
  steel: "bg-slate-500/20 text-slate-700 dark:text-slate-200",
  fairy: "bg-rose-400/20 text-rose-700 dark:text-rose-200",
};

export default function PokemonCard({ pokemon }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] grid place-items-center bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        {pokemon.image ? (
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="h-28 sm:h-32 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-28 w-28 rounded-full bg-slate-200 dark:bg-slate-700" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold capitalize text-slate-900 dark:text-white">{pokemon.name}</h3>
          <span className="text-xs text-slate-500">#{String(pokemon.id).padStart(3, "0")}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {pokemon.types.map((t) => (
            <span
              key={t}
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_COLORS[t] || "bg-slate-500/20 text-slate-700 dark:text-slate-200"}`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
          <div className="rounded-md bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 p-2">
            <div className="uppercase tracking-wide text-[10px] text-slate-500">Height</div>
            <div>{pokemon.height}</div>
          </div>
          <div className="rounded-md bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 p-2">
            <div className="uppercase tracking-wide text-[10px] text-slate-500">Weight</div>
            <div>{pokemon.weight}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
