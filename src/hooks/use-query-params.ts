import { useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = useMemo(() => searchParams.toString(), [searchParams]);

  const getQueryParam = useCallback(
    (name: string) => {
      const params = new URLSearchParams(search);
      const value = params.get(name);
      return value;
    },
    [search],
  );

  const setQueryParam = useCallback(
    (name: string, value: string) => {
      const currentParams = new URLSearchParams(search);
      const currentValue = currentParams.get(name);
      if (currentValue === value) {
        return;
      }

      const params = new URLSearchParams(search);
      params.set(name, value);

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, search],
  );

  const removeQueryParam = useCallback(
    (name: string) => {
      const currentParams = new URLSearchParams(search);
      if (!currentParams.has(name)) {
        return;
      }

      const params = new URLSearchParams(search);
      params.delete(name);

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [router, pathname, search],
  );

  const hasQueryParam = useCallback(
    (name?: string) => {
      const params = new URLSearchParams(search);
      if (name) {
        return params.has(name);
      }
      return Array.from(params.keys()).length > 0;
    },
    [search],
  );

  return {
    getQueryParam,
    setQueryParam,
    removeQueryParam,
    hasQueryParam,
  };
}
