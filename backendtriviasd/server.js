// Imports

import express from 'express';
import cors from 'cors';
import adminRoutes from './routes/adminRoute.js';
import casterRoutes from './routes/casterRoute.js';



const app = express();


// Configuración de cors para permitir peticiones desde el frontend
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json())

// Rutas generales
app.use('/api/admin' , adminRoutes);
app.use('/api/caster', casterRoutes);

const PORT = 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});