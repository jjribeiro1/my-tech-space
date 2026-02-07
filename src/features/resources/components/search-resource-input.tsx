"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchResourceInput() {
  const [search, setSearch] = useQueryState("search", {
    shallow: false,
  });
  const [inputValue, setInputValue] = useState(search ?? "");
  const debouncedValue = useDebounce(inputValue, 400);

  useEffect(() => {
    if (debouncedValue === (search ?? "")) {
      return;
    }

    if (debouncedValue === "") {
      setSearch(null);
    } else {
      setSearch(debouncedValue);
    }
  }, [debouncedValue, search, setSearch]);

  return (
    <div className="relative max-w-md grow">
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
