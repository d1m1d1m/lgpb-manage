import { Layer, Stage, Transformer, Image as KonvaImage, Text } from "react-konva";
import useLabelEditor from "./hooks/useLabelEditor";
import useSelection from "./hooks/useSelection";
import TextNode from "./components/TextNode";
import NodeParamsPanel from "./NodeParamsPanel";
import useTextEdition from "./hooks/useTextEdition";
import { useEffect, useState } from "react";
import Konva from "konva";

export default function App() {
  Konva.pixelRatio = window.devicePixelRatio;
  const { stageRef, nodes } = useLabelEditor();
  const { hoverTransformerRef, selectTransformerRef, selectedNodeId, setSelectedNodeId, enableHoverTransformer, disableHoverTransformer } = useSelection();
  const { textareaRef, leaveEditionMode, onEditing } = useTextEdition();

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  return (
    <div
      className="flex items-center justify-center h-screen"
    >
      <h2 className="fixed top-0">{selectedNodeId}</h2>

      <div className="w-1/2 p-3">
        
      </div>
      
      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.currentTarget.style.border = "1px solid red"}
        onDragExit={(e) => e.currentTarget.style.border = "none"}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.style.border = "none";

          const files = e.dataTransfer.files;
          if (files.length === 0) return;

          const file = files[0];

          if (file.type.startsWith("image/"))
          {
            const reader = new FileReader();
            reader.onload = () => {
              const img = new window.Image();
              img.src = reader.result as string;
              img.onload = () => setImage(img); // ⚠️ Important : attendre onload
            };
            reader.readAsDataURL(file);
          }
        }}
      >
        <Stage
          ref={stageRef}
          className="border w-fit h-fit"
          width={400}
          height={400}
          onMouseDown={(e) => {
            const clickedEmpty = e.target === e.target.getStage();
            if (clickedEmpty) {
              leaveEditionMode();
              setSelectedNodeId(null);
            };
          }}
        >
          <Layer onMouseMove={(e) => {
            
          }}>
            <TextNode
              config={{
                text: "un titre qui tue"
              }}
            />

            <TextNode
              config={{
                text: "sous titre de merde"
              }}
            />

            {image && <KonvaImage
              id="image"
              onMouseEnter={enableHoverTransformer}
              onMouseOut={disableHoverTransformer}
              onClick={(e) => setSelectedNodeId(e.target.id())}
              image={image}
              width={400}
              height={400}
              x={50}
              y={50}
              draggable
            />}

            <Transformer
              ref={hoverTransformerRef}
              enabledAnchors={[]}
              rotateEnabled={false}
            />

            <Transformer
              ref={selectTransformerRef}
              anchorSize={6}
              rotateAnchorOffset={24}
            />
          </Layer>
        </Stage>
      </div>
      
      <input onChange={(e) => {
        const { files } = e.target;
        
        if(files?.length) {
          const reader = new FileReader();
          
          reader.onload = function() {
            const img = new window.Image();
            img.src = reader.result as string;
            img.onload = () => setImage(img);
          }

          reader.readAsDataURL(files[0]);
        }

      }} type="file"/>

      <textarea
        ref={textareaRef}
        onChange={onEditing}
      />

      {/* <NodeParamsPanel/> */}
    </div>
  )
}