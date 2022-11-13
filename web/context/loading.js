import React, { createContext, useState } from "react";
// const LoadingContext = createContext<{ loading: boolean } | {}>({});
const LoadingContext = createContext({});

// interface LoadingProviderProps {
//   children: React.ReactNode;
// }

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
