import { createContext, useEffect, useRef, type PropsWithChildren } from "react";
import Konva from "konva";
import { useSelection } from "../hooks/useSelection";

interface TransformerContextType {
  transformerRef : React.RefObject<Konva.Transformer | null>
}

export const TransformerContext = createContext<TransformerContextType | undefined>(undefined);

export default function TransformerProvider({ children } : PropsWithChildren)
{
  const transformerRef = useRef<Konva.Transformer>(null);
  const { layerRef, targetedNodeId } = useSelection();
  
  useEffect(() => {
    const layer = layerRef.current;
    const transformer = transformerRef.current;

    if (!layer || !transformer) return;

    const node = layer.findOne(`#${targetedNodeId}`);

    if (node) {
      transformer.nodes([node]);
      transformer.getLayer()?.batchDraw();
    }
    else {
      transformer.nodes([]);
      transformer.getLayer()?.batchDraw();
    }
  }, [targetedNodeId]);

  return(
    <TransformerContext.Provider
      value={{
        transformerRef
      }}
    >
      {children}
    </TransformerContext.Provider>
  );
}