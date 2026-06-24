"use client";

import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type CacheEntry = {
  key: string;
  element: React.ReactNode;
};

type CacheRouterContextValue = {
  activeKey: string;
  cache: CacheEntry[];
  openTab: (key: string, element: React.ReactNode) => void;
  closeTab: (key: string) => void;
  setActiveKey: (key: string) => void;
};

const CacheRouterContext = createContext<CacheRouterContextValue | null>(null);

type CacheRouterProviderProps = {
  children: React.ReactNode;
  defaultActiveKey?: string;
};

function CacheRouterProviderComponent({
  children,
  defaultActiveKey = "/",
}: CacheRouterProviderProps) {
  const [activeKey, setActiveKeyState] = useState(defaultActiveKey);
  const [cache, setCache] = useState<CacheEntry[]>([]);

  const openTab = useCallback((key: string, element: React.ReactNode) => {
    setCache((prev) => {
      const exists = prev.some((item) => item.key === key);
      if (exists) {
        return prev;
      }
      return [...prev, { key, element }];
    });
    setActiveKeyState(key);
  }, []);

  const closeTab = useCallback((key: string) => {
    setCache((prev) => prev.filter((item) => item.key !== key));
    setActiveKeyState((current) => (current === key ? "/" : current));
  }, []);

  const setActiveKey = useCallback((key: string) => {
    setActiveKeyState(key);
  }, []);

  const value = useMemo(
    () => ({
      activeKey,
      cache,
      openTab,
      closeTab,
      setActiveKey,
    }),
    [activeKey, cache, closeTab, openTab, setActiveKey],
  );

  return (
    <CacheRouterContext.Provider value={value}>
      {children}
      <div style={{ display: "none" }} aria-hidden>
        {cache.map((item) => (
          <div key={item.key} data-cache-key={item.key}>
            {item.element}
          </div>
        ))}
      </div>
    </CacheRouterContext.Provider>
  );
}

export const CacheRouterProvider = memo(CacheRouterProviderComponent);

export function useCacheRouter() {
  const context = useContext(CacheRouterContext);
  if (!context) {
    throw new Error("useCacheRouter must be used within CacheRouterProvider");
  }
  return context;
}
