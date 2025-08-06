import { useContext } from "react";
import { LabelEditorContext } from "../contexts/LabelEditorContext";

export default function useLabelEditor() {
  const ctx = useContext(LabelEditorContext);
  if (!ctx) throw new Error("useLabelEditor must be used within LabelEditorProvider");
  return ctx;
};