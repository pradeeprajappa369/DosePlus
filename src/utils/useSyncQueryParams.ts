import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

type QueryState = Record<string, string | number>;
type SetterMap = Record<string, (value: string) => void>;

export function useSyncQueryParams(
  state: QueryState,
  setters: SetterMap
) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Guards
  const isUpdatingFromUrl = useRef(false);
  const lastSyncedQuery = useRef<string>('');

  /* --------------------------------
     URL → STATE
  -------------------------------- */
  useEffect(() => {
    isUpdatingFromUrl.current = true;

    Object.keys(setters).forEach((key) => {
      const value = searchParams.get(key);

      if (value !== null && String(state[key]) !== value) {
        setters[key](value);
      }
    });

    isUpdatingFromUrl.current = false;
  }, [searchParams]);

  /* --------------------------------
     STATE → URL
  -------------------------------- */
  useEffect(() => {
    if (isUpdatingFromUrl.current) return;

    const params = new URLSearchParams();

    Object.keys(state).forEach((key) => {
      params.set(key, String(state[key]));
    });

    const nextQuery = params.toString();

    // 🔒 Prevent infinite navigation loop
    if (nextQuery === lastSyncedQuery.current) return;

    lastSyncedQuery.current = nextQuery;
    setSearchParams(params, { replace: true });
  }, [
    state.search,
    state.category,
    state.status,
    state.stock,
    state.page,
    state.limit
  ]);
}
