// AppProvider.jsx
import Router from "./router";
import { useState, createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AppContext = createContext();
const queryClient = new QueryClient();

export default function AppProvider() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AppContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </AppContext.Provider>
  );
}
export function useApp() {
  return useContext(AppContext);
}
