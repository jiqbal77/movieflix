"use client";

import { memo, useState, useEffect, useCallback, ChangeEvent } from "react";
import SearchIcon from "@App/components/ui/SearchIcon";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  debounceMs?: number;
}

const SearchBar = memo(function SearchBar({ onSearch, initialValue = "", debounceMs = 300 }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch, debounceMs]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for movies..."
          className="w-full px-6 py-4 text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder:text-gray-400"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
});

export default SearchBar;
