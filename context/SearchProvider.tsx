"use client";

import { ReactNode, createContext, useState } from "react";

interface ISearchContext {
  results: any;
  setResults: any;
}

export const SearchContext = createContext<ISearchContext | null>(null);

export default function SearchProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<any>([]);

  return (
    <SearchContext.Provider value={{ results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
}
