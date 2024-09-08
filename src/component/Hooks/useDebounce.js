import { useEffect } from "react";
const useDebounce = (addSearchValue, setAddSearchValue, value, delay) => {
  useEffect(() => {
    const searchQuery = setTimeout(() => {
      setAddSearchValue(value);
    }, delay);
    return () => {
      clearTimeout(searchQuery);
    };
  }, [value, delay]);
  return addSearchValue;
};

export default useDebounce;
