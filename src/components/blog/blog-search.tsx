"use client";

import { Input } from "@/components/ui/input";
import { FiSearch, FiX } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    const currentQuery = searchParams.get("search") || "";
    if (debouncedSearch.trim() === currentQuery) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      // Always reset to page 1 when search changes
      params.delete("page");
      const trimmed = debouncedSearch.trim();
      if (trimmed) {
        params.set("search", trimmed);
      } else {
        params.delete("search");
      }
      const queryString = params.toString();
      router.push(queryString ? `/blogs?${queryString}` : "/blogs");
    });
  }, [debouncedSearch, router, searchParams]);

  const clearSearch = () => {
    setSearchValue("");
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      params.delete("search");
      const queryString = params.toString();
      router.push(queryString ? `/blogs?${queryString}` : "/blogs");
    });
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8 px-4">
      <div className="relative group">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary z-10" />
        <Input
          type="text"
          placeholder="Search blogs by title or content..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 pr-10 h-11 bg-background border-muted-foreground/30 focus:border-primary transition-all duration-300"
        />
        {searchValue && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/30 flex items-center justify-center transition-colors"
            aria-label="Clear search"
          >
            <FiX className="h-3 w-3 text-muted-foreground" />
          </button>
        )}
      </div>
      {isPending && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground animate-pulse">
          Searching...
        </div>
      )}
    </div>
  );
}
