import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";

const root_container = document.getElementById("root");
const root = ReactDOMClient.createRoot(root_container);

root.render(<App />);

export function ucFirst(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}
