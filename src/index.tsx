import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";

const root_container = document.getElementById("root");

if (root_container) {
  const root = ReactDOMClient.createRoot(root_container);

  root.render(<App />);
}

export function ucFirst(str: string) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}
