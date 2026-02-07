"use client";

import { Input } from "@/components/ui/input";
import { FiSearch, FiX } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

export function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = useCallback(
    (term: string) => {
      setSearchValue(term);
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        // Always reset to page 1 when search changes
        params.delete("page");
        if (term) {
          params.set("search", term);
        } else {
          params.delete("search");
        }
        const queryString = params.toString();
        router.push(queryString ? `/blogs?${queryString}` : "/blogs");
      });
    },
    [router, searchParams]
  );

  const clearSearch = () => {
    handleSearch("");
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8 px-4">
      <div className="relative group">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary z-10" />
        <Input
          type="text"
          placeholder="Search blogs by title or content..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
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
