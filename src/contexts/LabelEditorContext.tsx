import { createContext, useRef, useState, type PropsWithChildren } from "react";
import { v4 as uuidv4 } from 'uuid';
import Konva from "konva";

interface LabelEditorContextType {
  stageRef : React.RefObject<Konva.Stage | null>,
  nodes    : any[],
  addNode  : (elmt : any) => void
}

export const LabelEditorContext = createContext<LabelEditorContextType | undefined>(undefined);

export default function LabelEditorProvider({ children } : PropsWithChildren)
{
  const [ nodes, setNodes ] = useState<any[]>([]);

  const stageRef = useRef<Konva.Stage>(null);

  function addNode(config: any)
  {
    setNodes(prev => [
      ...prev,
      {...config, id : uuidv4()}
    ])
  }

  return(
    <LabelEditorContext.Provider
      value={{
        stageRef,
        nodes,
        addNode
      }}
    >
      {children}
    </LabelEditorContext.Provider>
  );
}