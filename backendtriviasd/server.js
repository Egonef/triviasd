// Imports

import express from 'express';
import cors from 'cors';
import adminRoutes from './routes/adminRoute.js';
import casterRoutes from './routes/casterRoute.js';



const app = express();


// Configuración de cors para permitir peticiones desde el frontend
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json())

// Rutas generales
app.use('/api/admin' , adminRoutes);
app.use('/api/caster', casterRoutes);

const PORT = 5000;

app.listen(PORT, console.log(`App is running on port ${PORT}`))