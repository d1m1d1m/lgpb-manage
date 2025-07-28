import { useContext } from "react";
import { TransformerContext } from "../contexts/TransformerContext";

export const useTransformer = () => {
  const ctx = useContext(TransformerContext);
  if (!ctx) throw new Error("useTransformer must be used within TransformerProvider");
  return ctx;
};