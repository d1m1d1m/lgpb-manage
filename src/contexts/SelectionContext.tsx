import { createContext, useRef, useState, type PropsWithChildren } from "react";
import Konva from "konva";
import type { Node, NodeConfig } from "konva/lib/Node";

interface SelectionContextType {
  layerRef : React.RefObject<Konva.Layer | null>,
  targetedNodeId : string | null,
  setTargetedNodeId : React.Dispatch<React.SetStateAction<string | null>>,
  getTargetedNode : () => Node<NodeConfig> | undefined,
}

export const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export default function SelectionProvider({ children } : PropsWithChildren)
{
  const layerRef = useRef<Konva.Layer>(null);
  const [ targetedNodeId, setTargetedNodeId ] = useState<string | null>(null);

  function getTargetedNode()
  {
    const layer = layerRef.current;

    if(targetedNodeId && layer) {
      return layer.findOne(`#${targetedNodeId}`);
    }
  }

  return(
    <SelectionContext.Provider
      value={{
        layerRef,
        targetedNodeId,
        setTargetedNodeId,
        getTargetedNode
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}