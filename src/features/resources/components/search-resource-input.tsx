"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQueryParams } from "@/hooks/use-query-params";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchResourceInput() {
  const { setQueryParam, removeQueryParam } = useQueryParams();
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 400);

  useEffect(() => {
    if (debouncedValue === "") {
      removeQueryParam("search");
    } else {
      setQueryParam("search", debouncedValue);
    }
  }, [debouncedValue, setQueryParam, removeQueryParam]);

  return (
    <div className="relative max-w-md flex-grow">
      <Search className="text-muted-foreground absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2" />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="search"
        placeholder="Search resource..."
        className="pl-8"
      />
    </div>
  );
}
