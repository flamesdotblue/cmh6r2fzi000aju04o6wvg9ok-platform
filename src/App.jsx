import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PokemonGrid from "./components/PokemonGrid";

const PAGE_SIZE = 24;

async function fetchPokemonList(page) {
  const offset = (page - 1) * PAGE_SIZE;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
  if (!res.ok) throw new Error("Failed to fetch Pokemon list");
  const data = await res.json();
  const detailed = await Promise.all(
    data.results.map(async (p) => {
      const r = await fetch(p.url);
      if (!r.ok) throw new Error("Failed to fetch pokemon details");
      const d = await r.json();
      return simplifyPokemon(d);
    })
  );
  return { results: detailed, count: data.count };
}

async function fetchPokemonByNameOrId(query) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query.toLowerCase())}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch pokemon");
  }
  const data = await res.json();
  return simplifyPokemon(data);
}

function simplifyPokemon(d) {
  const official = d.sprites.other?.["official-artwork"]?.front_default;
  const dream = d.sprites.other?.dream_world?.front_default;
  const fallback = d.sprites.front_default;
  const image = official || dream || fallback || "";
  return {
    id: d.id,
    name: d.name,
    image,
    height: d.height,
    weight: d.weight,
    types: d.types?.map((t) => t.type.name) || [],
    abilities: d.abilities?.map((a) => a.ability.name) || [],
  };
}

export default function App() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const totalPages = useMemo(() => (total ? Math.ceil(total / PAGE_SIZE) : 0), [total]);

  useEffect(() => {
    if (isSearching) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchPokemonList(page)
      .then(({ results, count }) => {
        if (cancelled) return;
        setPokemons(results);
        setTotal(count);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message || "Something went wrong");
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [page, isSearching]);

  async function handleSearch(submittedQuery) {
    const q = submittedQuery.trim();
    setQuery(q);
    if (!q) {
      setIsSearching(false);
      setPage(1);
      return;
    }
    setIsSearching(true);
    setLoading(true);
    setError("");
    try {
      const result = await fetchPokemonByNameOrId(q);
      if (!result) {
        setPokemons([]);
        setError("No Pokémon found");
        return;
      }
      setPokemons([result]);
    } catch (e) {
      setError(e.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setQuery("");
    setIsSearching(false);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">
      <div className="container mx-auto px-4 py-6">
        <Header />
        <div className="mt-6">
          <SearchBar value={query} onSearch={handleSearch} onClear={clearSearch} />
        </div>

        <div className="mt-8">
          {error && !loading ? (
            <div className="rounded-lg border border-red-300/40 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-200 p-4 text-center">
              {error}
            </div>
          ) : null}

          <PokemonGrid pokemons={pokemons} loading={loading} emptyMessage={isSearching ? "Try another name or ID" : "No Pokémon to show"} />

          {!isSearching && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between gap-2">
              <button
                className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
              >
                Previous
              </button>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Page {page} of {totalPages}
              </div>
              <button
                className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
