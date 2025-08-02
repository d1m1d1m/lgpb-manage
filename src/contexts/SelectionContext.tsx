import { createContext, useEffect, useRef, useState, type PropsWithChildren } from "react";
import Konva from "konva";
import type { NodeConfig, Node } from "konva/lib/Node";

interface SelectionContextType
{
  hoverTransformerRef : React.RefObject<Konva.Transformer | null>,
  selectTransformerRef : React.RefObject<Konva.Transformer | null>,

  selectedNodeId : string | null,
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>,
  getSelectedNode : () => Node<NodeConfig> | null | undefined,

  enableHoverTransformer : (evt : Konva.KonvaEventObject<MouseEvent>) => void,
  disableHoverTransformer: () => void
}

export const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export default function SelectionProvider({ children } : PropsWithChildren)
{
  const hoverTransformerRef = useRef<Konva.Transformer>(null);
  const selectTransformerRef = useRef<Konva.Transformer>(null);

  const [ selectedNodeId, setSelectedNodeId ] = useState<string | null>(null);

  function getSelectedNode()
  {
    const selectTransformer = selectTransformerRef.current;
    if(!selectedNodeId || !selectTransformer) return null;

    return selectTransformer.nodes().find((n) => n.id() === selectedNodeId);
  }

  function enableHoverTransformer(evt : Konva.KonvaEventObject<MouseEvent>)
  {
    if(evt.target.id() === selectedNodeId) return;

    const hoveredNode = evt.target;
    const hoverTransformer = hoverTransformerRef.current;

    if(!hoverTransformer || !hoveredNode) return;

    hoverTransformer.nodes([hoveredNode]);
    hoverTransformer.getLayer()?.batchDraw();
  }

  function disableHoverTransformer()
  {
    const hoverTransformer = hoverTransformerRef.current;

    if (!hoverTransformer) return;

    hoverTransformer.nodes([]);
    hoverTransformer.getLayer()?.batchDraw();
  }

  useEffect(() => {
    disableHoverTransformer();
    const selectTransformer = selectTransformerRef.current;

    if (!selectTransformer) return;

    if (!selectedNodeId) {
      selectTransformer.nodes([]);
    }
    else {
      const stage = selectTransformer.getStage();
      const targetNode = stage?.findOne(`#${selectedNodeId}`);

      if (targetNode) {
        selectTransformer.nodes([targetNode]);
      }
      else {
        selectTransformer.nodes([]);
      }
    }

    selectTransformer.getLayer()?.batchDraw();
  }, [selectedNodeId]);
  
  return(
    <SelectionContext.Provider
      value={{
        hoverTransformerRef,
        selectTransformerRef,

        selectedNodeId,
        setSelectedNodeId,
        getSelectedNode,

        enableHoverTransformer,
        disableHoverTransformer
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}