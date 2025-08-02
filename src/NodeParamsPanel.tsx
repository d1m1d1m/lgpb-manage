import { useEffect, useState } from "react";
import useSelection from "./hooks/useSelection";

export default function NodeParamsPanel() 
{
  const { selectedNodeId, getSelectedNode } = useSelection();
  const [ targetedNodeConfig, setTargetedNodeConfig ] = useState<any>(null);

  useEffect(() => {
    if(!selectedNodeId) setTargetedNodeConfig(null);

    setTargetedNodeConfig({...getSelectedNode()?.getAttrs()});

    getSelectedNode()?.on('dragmove', (e) => {
      setTargetedNodeConfig({...e.target.getAttrs()});
    });

    getSelectedNode()?.on('transform', (e) => {
      setTargetedNodeConfig({...e.target.getAttrs()});
    });
  }, [selectedNodeId]);

  useEffect(() => {
    if(selectedNodeId && targetedNodeConfig) {
      const node = getSelectedNode();

      node?.setAttrs(targetedNodeConfig);
      node?.getLayer()?.batchDraw();
    }
  }, [targetedNodeConfig]);

  return(
    <div className="w-3/4 p-3">
      <h2>Paramètrages de {selectedNodeId}</h2>

      {selectedNodeId && targetedNodeConfig ? (
        <div>
          <fieldset className="border p-2 mb-2">
            <legend>Position</legend>
            <div>{Math.round(targetedNodeConfig.x)} | {Math.round(targetedNodeConfig.y)}</div>
          </fieldset>

          <fieldset className="border p-2 mb-2">
            <legend>Dimension</legend>
            <div>{Math.round(targetedNodeConfig.width)} | {Math.round(targetedNodeConfig.height)}</div>
          </fieldset>

          <fieldset className="border p-2 mb-2">
            <legend>Police</legend>

            <label className="flex flex-col w-fit">
              <span>Taille de police</span>
              <input
                className="border"
                type="number"
                value={targetedNodeConfig.fontSize}
                onChange={(e) => setTargetedNodeConfig({...targetedNodeConfig, fontSize: parseInt(e.target.value) })}
              />
            </label>

            <label className="flex flex-col w-fit">
              <span>Alignement horizontal</span>
              <select value={targetedNodeConfig.align} onChange={(e) => setTargetedNodeConfig({...targetedNodeConfig, align: e.target.value })}>
                <option value="left">Gauche</option>
                <option value="center">Centrer</option>
                <option value="right">Droite</option>
                <option value="justify">Justifié</option>
              </select>
            </label>

            <label className="flex flex-col w-fit">
              <span>Alignement vertical</span>
              <select value={targetedNodeConfig.verticalAlign} onChange={(e) => setTargetedNodeConfig({...targetedNodeConfig, verticalAlign: e.target.value })}>
                <option value="top">En haut</option>
                <option value="middle">Au milieu</option>
                <option value="bottom">En bas</option>
              </select>
            </label>
            
            <label className="flex flex-col w-fit">
              <span>Famille de police</span>
              <select value={targetedNodeConfig.verticalAlign} onChange={(e) => setTargetedNodeConfig({...targetedNodeConfig, fontFamily: e.target.value })}>
                <option value="arial">Arial</option>
                <option value="moreganic">Moreganic</option>
                <option value="monospace">Monospace</option>
              </select>
            </label>
          </fieldset>
        </div>
      ) : <p>Pas de sélection</p>}
    </div>
  )
}