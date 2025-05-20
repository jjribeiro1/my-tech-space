import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQueryParam = useCallback(
    (name: string) => {
      const value = searchParams.get(name);
      return value;
    },
    [searchParams],
  );

  const setQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const removeQueryParam = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const hasQueryParam = useCallback(
    (name?: string) => {
      if (name) {
        return searchParams.has(name);
      }
      return searchParams.size > 0;
    },
    [searchParams],
  );

  return {
    getQueryParam,
    setQueryParam,
    removeQueryParam,
    hasQueryParam,
  };
}
