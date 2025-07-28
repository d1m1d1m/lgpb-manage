import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import LabelEditorProvider from './contexts/LabelEditorContext.tsx';
import SelectionProvider from './contexts/SelectionContext.tsx';
import TransformerProvider from './contexts/TransformerContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LabelEditorProvider>
      <SelectionProvider>
        <TransformerProvider>
          <App />
        </TransformerProvider>
      </SelectionProvider>
    </LabelEditorProvider>
  </StrictMode>,
);
