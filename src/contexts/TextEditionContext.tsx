import type Konva from "konva";
import type { Text } from "konva/lib/shapes/Text";
import { createContext, useRef, type ChangeEvent, type PropsWithChildren } from "react";
import useSelection from "../hooks/useSelection";

interface TextEditionContextType
{
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,

  enterEditionMode : (evt : Konva.KonvaEventObject<MouseEvent>) => void,
  leaveEditionMode : () => void,
  onEditing : (e : any) => void
}

export const TextEditionContext = createContext<TextEditionContextType | undefined>(undefined);

export default function TextEditionProvider({ children } : PropsWithChildren)
{
  const { selectedNodeId, getSelectedNode } = useSelection();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function enterEditionMode(evt : Konva.KonvaEventObject<MouseEvent>)
  {
    const textArea = textareaRef.current;

    if(!textArea) return;

    const textNode = evt.target as Text;
    const stage = textNode.getStage();

    if(!stage || !textNode) return;

    const stageScale = stage.scale();
    const stageContainerRect = stage.container().getBoundingClientRect();
    const textNodeRect = textNode.getClientRect();

    textArea.style.display = "block";
    textArea.style.position = "absolute";
    textArea.style.top = `${textNodeRect.y + stageContainerRect.top + 1}px`;
    textArea.style.left = `${textNodeRect.x + stageContainerRect.left + 1}px`;
    textArea.style.width = `${textNodeRect.width * stageScale.x}px`;
    textArea.style.height = `${textNodeRect.height * stageScale.y}px`;
    textArea.style.fontSize = `${textNode.fontSize()}px`;
    textArea.style.fontFamily = textNode.fontFamily();
    textArea.style.lineHeight = `${textNode.fontSize()}px`;
    textArea.style.color = textNode.fill() as string;
    textArea.style.background = "transparent";
    textArea.style.outline = "none";
    textArea.style.padding = "0";
    textArea.style.margin = "0";
    textArea.style.resize = "none";
    textArea.style.overflow = 'hidden';

    textArea.value = textNode.text();
    textArea.focus();
    textNode.visible(false);
  }

  function onEditing(e : ChangeEvent<HTMLTextAreaElement>)
  {
     const textArea = textareaRef.current;

    if(!textArea || !selectedNodeId) return;

    const node = getSelectedNode();
    node?.setAttr('text', e.target.value);
  }

  function leaveEditionMode()
  {
    const textArea = textareaRef.current;

    if(!textArea || !selectedNodeId) return;

    const node = getSelectedNode();
    node?.visible(true);
    textArea.style.display = "none";
  }

  return(
    <TextEditionContext.Provider
      value={{
        textareaRef,
        enterEditionMode,
        leaveEditionMode,
        onEditing
      }}
    >
      {children}
    </TextEditionContext.Provider>
  );
}