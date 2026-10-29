import { useCallback, useSyncExternalStore } from "react";

// The inline script in index.html sets the class before first paint, from the saved choice or the system's
// preference; this reads it back rather than deciding again, so the two can't disagree.
const THEME_EVENT = "themechange";

const subscribe = (onChange: () => void) => {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
};
const getSnapshot = () => document.documentElement.classList.contains("dark");
// The pre-rendered HTML is built dark; React swaps to the real value straight after hydrating.
const getServerSnapshot = () => true;

export function useTheme() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private windows can refuse storage; the toggle still works for this visit.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return { dark, toggle };
}
