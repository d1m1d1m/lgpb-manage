import { useContext } from "react";
import { TextEditionContext } from "../contexts/TextEditionContext";

export default function useTextEdition() {
  const ctx = useContext(TextEditionContext);
  if (!ctx) throw new Error("useTextEdition must be used within TextEditionProvider");
  return ctx;
};