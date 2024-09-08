import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

export const ThemeContext=createContext()

export const ThemeProvider=({children})=>{
    const [getSearchKey, setGetSearchKey] = useState("");
    const prefrences=window.matchMedia("(prefers-color-scheme: dark)").matches
    const [isDark,setDark]=useLocalStorage("isDark",prefrences)
    useEffect(() => {
        console.log(getSearchKey, "getkey");
      }, [getSearchKey]);
    return <ThemeContext.Provider value={{isDark,setDark,getSearchKey, setGetSearchKey}}>{children}</ThemeContext.Provider>
}
export const useGlobalContext = () => {
    return useContext(ThemeContext);
  };
  