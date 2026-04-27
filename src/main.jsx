import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import AppProvider from "./AppProvider";
// bootstrap css and js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Router from "./Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
);
