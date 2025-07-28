import { useEffect, useState } from "react";
import { useSelection } from "./hooks/useSelection"

export default function Panel() 
{
  const { targetedNodeId, getTargetedNode } = useSelection();
  const [ targetedNodeConfig, setTargetedNodeConfig ] = useState<any>(null);

  useEffect(() => {
    if(!targetedNodeId) setTargetedNodeConfig(null);

    setTargetedNodeConfig({...getTargetedNode()?.getAttrs()});

    getTargetedNode()?.on('dragmove', (e) => {
      setTargetedNodeConfig({...e.target.getAttrs()});
    });

    getTargetedNode()?.on('transform', (e) => {
      setTargetedNodeConfig({...e.target.getAttrs()});
    });
  }, [targetedNodeId]);

  return(
    <div className="w-3/4">
      <h2>Paramètrages de {targetedNodeId}</h2>

      {targetedNodeId && targetedNodeConfig ? (
        <div>
          <div>
            <h3>Position (X | Y)</h3>
            <div>{Math.round(targetedNodeConfig.x)} | {Math.round(targetedNodeConfig.y)}</div>
          </div>

          <div>
            <h3>Dimension (W | H)</h3>
            <div>{Math.round(targetedNodeConfig.width)} | {Math.round(targetedNodeConfig.height)}</div>
          </div>
        </div>
      ) : <p>Pas de sélection</p>}
    </div>
  )
}