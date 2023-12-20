import { createContext, useEffect, useState } from "react";

export const LoaderContext = createContext(null);

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleNewRouteLoaderLoad = () => {
      console.log("loading route ================");
      setIsLoading((prev) => true);
    };
    window.addEventListener("popstate", handleNewRouteLoaderLoad);
    return () =>
      window.removeEventListener("popstate", handleNewRouteLoaderLoad);
  }, []);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
