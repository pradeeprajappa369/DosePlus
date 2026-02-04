import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

type QueryState = Record<string, string>;
type SetterMap = Record<string, (value: string) => void>;

export function useSyncQueryParams(
  state: QueryState,
  setters: SetterMap
) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Prevent infinite loop
  const isUpdatingFromUrl = useRef(false);

  /* --------------------------------
     URL → STATE
  -------------------------------- */
  useEffect(() => {
    isUpdatingFromUrl.current = true;

    Object.keys(setters).forEach(key => {
      const value = searchParams.get(key);
      if (value !== null && state[key] !== value) {
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

    const nextParams: Record<string, string> = {};
    let hasChanged = false;

    Object.keys(state).forEach(key => {
      const currentValue = searchParams.get(key) ?? '';
      nextParams[key] = state[key];

      if (currentValue !== state[key]) {
        hasChanged = true;
      }
    });

    if (hasChanged) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [
    state.search,
    state.category,
    state.status,
    state.stock
  ]);
}
