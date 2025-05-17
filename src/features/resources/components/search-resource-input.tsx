"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQueryParams } from "@/hooks/use-query-params";

export function SearchResourceInput() {
  const { setQueryParam, removeQueryParam } = useQueryParams();

  return (
    <div className="relative max-w-md flex-grow">
      <Search className="text-muted-foreground absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2" />
      <Input
        onChange={(e) => {
          if (e.target.value === "") {
            removeQueryParam("search");
            return
          }
          setQueryParam("search", e.target.value);
        }}
        type="search"
        placeholder="Search resource..."
        className="pl-8"
      />
    </div>
  );
}
