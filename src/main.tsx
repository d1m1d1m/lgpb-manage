import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import './index.css';
import App from './App.tsx';
import AppLayout from './components/AppLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppLayout>
      <App/>
    </AppLayout>
  </BrowserRouter>
);
