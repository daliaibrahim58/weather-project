import { createContext } from "react";

// Provide a default value for the context
export const ResponseContext = createContext({
  degree: null,
  min: null,
  max: null,
  icon: null,
  desc: null,
}, "");
