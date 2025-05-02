"use client";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/use-query-params";

export function FavoriteFilterButton() {
  const { setQueryParam, removeQueryParam, hasQueryParam } = useQueryParams();

  return (
    <Button
      onClick={() => {
        if (hasQueryParam("isFavorite")) {
          removeQueryParam("isFavorite");
        } else {
          setQueryParam("isFavorite", "true");
        }
      }}
      variant="outline"
      size="sm"
      className="cursor-pointer"
    >
      <Star />
      Favorites
    </Button>
  );
}
