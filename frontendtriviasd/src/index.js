//Pagina origen del proyecto, aqui controlamos las rutas de la aplicacion

//Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import de paginas
import Admin from './routes/administrador';
import Presentador from './routes/presentador';
import Pregunta from './routes/pregunta';
import ExperienciaSD from './routes/xpsd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/presentador" element={<Presentador />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/pregunta" element={<Pregunta />} />
            <Route path="/xpsd" element={<ExperienciaSD />} />
        </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();