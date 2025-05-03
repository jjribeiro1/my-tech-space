"use client";
import { useTransition } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toggleFavoriteResourceAction } from "../actions/toggle-favorite-resource-action";
import { toast } from "sonner";
import { Resource } from "../types";

interface Props {
  resource: Resource;
}

export function ToggleFavoriteResourceButton({ resource }: Props) {
  const [isPending, startTransation] = useTransition();

  function onSubmit() {
    startTransation(async () => {
      const action = await toggleFavoriteResourceAction(resource.id);
      if (action.success) {
        toast.success(action.message);
      } else {
        toast.error(action.message);
      }
    });
  }

  return (
    <Button
      onClick={onSubmit}
      variant="ghost"
      size="icon"
      className={cn(
        "text-muted-foreground cursor-pointer hover:text-yellow-500",
        resource.isFavorite && "fill-yellow-500 text-yellow-500",
      )}
      disabled={isPending}
      title={resource.isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={cn("h-4 w-4", resource.isFavorite && "fill-yellow-500")}
        aria-label={resource.isFavorite ? "Favorite" : "Not favorite"}
      />
      <span className="sr-only">
        {resource.isFavorite ? "Remove from favorites" : "Add to favorites"}
      </span>
    </Button>
  );
}
