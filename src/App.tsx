import { useState } from "react";
import { Layer, Rect, Stage, Text, Transformer } from "react-konva";
import { v4 as uuidv4 } from 'uuid';
import { useLabelEditor } from "./hooks/useLabelEditor";
import { useSelection } from "./hooks/useSelection";
import { useTransformer } from "./hooks/useTransformer";
import Panel from "./Panel";

export default function App() {
  const { stageRef, nodes, addNode } = useLabelEditor();
  const { layerRef, setTargetedNodeId } = useSelection();
  const { transformerRef } = useTransformer();

  const [selectionRect, setSelectionRect] = useState<null | { x: number, y: number, width: number, height: number }>(null);
  const [dragStartPos, setDragStartPos] = useState<null | { x: number, y: number }>(null);

  return (
    <div className="flex">
      <div className="w-3/4">
        <h2>Composants</h2>

        <ul>
          {nodes.map((n) => (
            <li key={n.attrs.id} onClick={() => setTargetedNodeId(n.attrs.id)}>{n.attrs.id}</li>
          ))}
        </ul>
      </div>

      <Stage
        ref={stageRef}
        className="border w-fit"
        width={400}
        height={400}

        onClick={(e) => {
          if(e.target === e.target.getStage()) {
            setTargetedNodeId(null);
          }
        }}

        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            const { x, y } = e.target.getStage().getPointerPosition()!;
            setDragStartPos({ x, y });
            setSelectionRect(null);
          }
        }}

        onMouseMove={(e) => {
          if (dragStartPos) {
            const { x, y } = e.target.getStage()?.getPointerPosition()!;
            const width = x - dragStartPos.x;
            const height = y - dragStartPos.y;

            setSelectionRect({
              x: dragStartPos.x,
              y: dragStartPos.y,
              width,
              height
            });
          }
        }}

        onMouseUp={() => {
          if (selectionRect) {
            const newNodeId = uuidv4();

            addNode({
              attrs: {
                id: newNodeId,
                x: selectionRect.x,
                y: selectionRect.y,
                width: Math.abs(selectionRect.width),
                height: Math.abs(selectionRect.height),
                text: "Texte",
                fontSize: 16,
                fill: "#000",
                draggable: true
              }
            });

            setTargetedNodeId(newNodeId);
          }
          
          setSelectionRect(null);
          setDragStartPos(null);
        }}
      >
        <Layer ref={layerRef}>
          <Rect
            {...selectionRect}
            stroke="blue"
            dash={[4,2]}
            dashOffset={12}
          />

          {nodes.map((elmt) => (
            <Text
              key={elmt.attrs.id}
              scale={{x: 1, y: 1}}
              onDragStart={() => setTargetedNodeId(elmt.attrs.id)}
              onDragMove={(e) => e.target.setPosition({x: e.target.x(), y: e.target.y()})}
              onClick={(e) => setTargetedNodeId(e.target.id())}
              onTransform={(e) => {
                const n = e.target;

                n.width(n.width() * n.scaleX());
                n.height(n.height() * n.scaleY());

                n.scale({ x: 1, y: 1 });
              }}
              
              {...elmt.attrs}
            />
          ))}

          <Transformer
            ref={transformerRef}
            anchorSize={6}
          />
        </Layer>
      </Stage>

      <Panel/>
    </div>
  )
}