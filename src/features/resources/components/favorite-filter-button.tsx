"use client";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";

interface Props {
  favoritesCount: number;
}

export function FavoriteFilterButton({ favoritesCount }: Props) {
  const { setQueryParam, removeQueryParam, hasQueryParam } = useQueryParams();

  const filterIsActive = hasQueryParam("isFavorite");

  function toggleFilter() {
    return filterIsActive
      ? removeQueryParam("isFavorite")
      : setQueryParam("isFavorite", "true");
  }

  return (
    <Button
      onClick={toggleFilter}
      className={cn(
        "cursor-pointer gap-2 transition-all",
        filterIsActive && "bg-yellow-500 text-white hover:bg-yellow-500/80",
      )}
      variant={filterIsActive ? "default" : "outline"}
      size="sm"
    >
      <Star
        className={cn("h-4 w-4", filterIsActive && "fill-white")}
        aria-hidden="true"
      />
      <span>Favorites</span>
      {favoritesCount > 0 && (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium",
            filterIsActive
              ? "bg-white/20 text-white"
              : "bg-primary/10 text-primary",
          )}
        >
          {favoritesCount}
        </span>
      )}
    </Button>
  );
}
