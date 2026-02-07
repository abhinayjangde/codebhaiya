"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  baseUrl: string;
  searchParams?: Record<string, string>;
  className?: string;
}

/**
 * Reusable pagination component following best practices:
 * - Server-side compatible (no useState)
 * - URL-based state for SEO and shareability
 * - Accessible with proper ARIA labels
 * - Responsive design
 * - Smart page number display with ellipsis
 */
export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  baseUrl,
  searchParams = {},
  className,
}: PaginationProps) {
  // Don't render if only one page
  if (totalPages <= 1) return null;

  const itemsShown = Math.min(
    itemsPerPage,
    totalItems - (currentPage - 1) * itemsPerPage
  );
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = startItem + itemsShown - 1;

  // Build URL for a specific page
  const buildPageUrl = (pageNum: number): string => {
    const params = new URLSearchParams();

    // Preserve existing search params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    // Only add page param if not page 1
    if (pageNum > 1) {
      params.set("page", pageNum.toString());
    } else {
      params.delete("page");
    }

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  // Generate page numbers to display with smart ellipsis
  const getPageNumbers = (): (number | "ellipsis-start" | "ellipsis-end")[] => {
    // Use a Set to avoid duplicates
    const pageSet = new Set<number>();

    // Always show first page
    pageSet.add(1);

    // Always show last page
    if (totalPages > 1) {
      pageSet.add(totalPages);
    }

    // Add pages around current page
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pageSet.add(i);
      }
    }

    // Convert to sorted array
    const sortedPages = Array.from(pageSet).sort((a, b) => a - b);

    // Insert ellipsis where needed
    const result: (number | "ellipsis-start" | "ellipsis-end")[] = [];
    for (let i = 0; i < sortedPages.length; i++) {
      const page = sortedPages[i];
      const prevPage = sortedPages[i - 1];

      // Add ellipsis if there's a gap
      if (prevPage !== undefined && page - prevPage > 1) {
        result.push(i === 1 ? "ellipsis-start" : "ellipsis-end");
      }
      result.push(page);
    }

    return result;
  };

  const pageNumbers = getPageNumbers();
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      role="navigation"
      aria-label="Blog posts pagination"
      className={cn("flex flex-col items-center gap-4 py-8", className)}
    >
      {/* Pagination Controls */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Previous Button */}
        <PaginationLink
          href={hasPrevious ? buildPageUrl(currentPage - 1) : undefined}
          disabled={!hasPrevious}
          aria-label="Go to previous page"
          rel="prev"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:ml-1">Previous</span>
        </PaginationLink>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <span
                  key={page}
                  className="flex h-9 w-9 items-center justify-center text-muted-foreground"
                  aria-hidden="true"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              );
            }

            const isCurrentPage = page === currentPage;
            return (
              <PaginationLink
                key={`page-${page}`}
                href={isCurrentPage ? undefined : buildPageUrl(page)}
                active={isCurrentPage}
                aria-label={`Go to page ${page}`}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {page}
              </PaginationLink>
            );
          })}
        </div>

        {/* Next Button */}
        <PaginationLink
          href={hasNext ? buildPageUrl(currentPage + 1) : undefined}
          disabled={!hasNext}
          aria-label="Go to next page"
          rel="next"
        >
          <span className="sr-only sm:not-sr-only sm:mr-1">Next</span>
          <ChevronRight className="h-4 w-4" />
        </PaginationLink>
      </div>

      {/* Page Info - Accessible summary */}
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing <span className="font-medium">{startItem}</span> to{" "}
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{totalItems}</span> results
      </p>
    </nav>
  );
}

// Internal PaginationLink component for consistent styling
interface PaginationLinkProps {
  href?: string;
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-current"?: "page";
  rel?: "prev" | "next";
}

function PaginationLink({
  href,
  children,
  disabled,
  active,
  className,
  ...props
}: PaginationLinkProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium",
    "h-9 min-w-9 px-3",
    "border border-input bg-background",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    className
  );

  if (disabled || !href) {
    return (
      <span
        className={cn(
          baseStyles,
          disabled && "pointer-events-none opacity-50",
          active &&
            "bg-primary text-primary-foreground border-primary pointer-events-none"
        )}
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={cn(baseStyles, "hover:bg-accent hover:text-accent-foreground")}
      {...props}
    >
      {children}
    </Link>
  );
}
