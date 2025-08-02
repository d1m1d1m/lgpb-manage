import type { TextConfig } from "konva/lib/shapes/Text";
import { Group, Text } from "react-konva";
import { v4 as uuidv4 } from 'uuid';
import useSelection from "../hooks/useSelection";
import { useMemo } from "react";
import useTextEdition from "../hooks/useTextEdition";
import Konva from "konva";

interface TextNodeProps
{
  config: TextConfig
}

export default function TextNode({ config } : TextNodeProps)
{
  Konva.pixelRatio = 1
  const id = useMemo(() => uuidv4(), []);
  const { enterEditionMode } = useTextEdition();
  const { enableHoverTransformer, disableHoverTransformer, setSelectedNodeId } = useSelection();
  
  return(
    <Group>
      <Text
        id={id}
        name={config.text}
        onMouseEnter={enableHoverTransformer}
        onMouseOut={disableHoverTransformer}
        onClick={(e) => {
          const textNode = e.target;
          setSelectedNodeId(textNode.id());

          if(isNaN(textNode.width()) || isNaN(textNode.height())) return;

          e.target.width(e.target.width());
          e.target.height(e.target.height());
        }}
        onDblClick={enterEditionMode}

        onTransform={(e) => {
          const node = e.target;

          node.width(node.width() * node.scaleX());
          node.height(node.height() * node.scaleY());
          node.scaleX(1);
          node.scaleY(1);
        }}
        fontSize={16}
        draggable

        { ...config }
      />
    </Group>
  );
}