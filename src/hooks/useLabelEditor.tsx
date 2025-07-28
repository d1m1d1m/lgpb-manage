import { useContext } from "react";
import { LabelEditorContext } from "../contexts/LabelEditorContext";

export const useLabelEditor = () => {
  const ctx = useContext(LabelEditorContext);
  if (!ctx) throw new Error("useLabelEditor must be used within LabelEditorProvider");
  return ctx;
};