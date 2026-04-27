// AppProvider.jsx
import Router from "./router";
import { useState, createContext, useContext } from "react";

const AppContext = createContext();

export default function AppProvider() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AppContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}>
      <Router />
    </AppContext.Provider>
  );
}
export function useApp() {
  return useContext(AppContext);
}
