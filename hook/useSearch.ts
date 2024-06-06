import { useContext } from "react";
import { SearchContext } from "@/context/SearchProvider";

export const useSearch = () => {
  const searchCtx = useContext(SearchContext);
  if (!searchCtx) {
    throw new Error("useAuth must be used within an SearchProvider");
  }
  return searchCtx;
};
