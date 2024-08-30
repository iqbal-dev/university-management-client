/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useSearchParams } from "react-router-dom";
import { paramsToObject } from "../utils/paramsToObject";

// Custom hook for managing search parameters
export const useManageSearchParams = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);

  const queryParams = paramsToObject(searchParams);

  const updateSearchParams = (newParams: Record<string, any>) => {
    const mergedParams = { ...queryParams, ...newParams };
    setSearchParams(new URLSearchParams(mergedParams));
  };

  return { queryParams, updateSearchParams };
};
