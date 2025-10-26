import React, { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value = "", onSearch, onClear }) {
  const [input, setInput] = useState(value);

  React.useEffect(() => {
    setInput(value);
  }, [value]);

  function submit(e) {
    e.preventDefault();
    onSearch?.(input);
  }

  return (
    <form onSubmit={submit} className="flex items-stretch gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          aria-label="Search Pokémon"
          className="w-full pl-10 pr-10 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search by name or ID (e.g., pikachu or 25)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input && (
          <button
            type="button"
            onClick={() => {
              setInput("");
              onClear?.();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="Clear search"
            title="Clear"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50"
      >
        <Search className="h-4 w-4" />
        <span>Search</span>
      </button>
    </form>
  );
}
