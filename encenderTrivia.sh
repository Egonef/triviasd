#!/bin/bash

# Navegar al directorio del backend y encenderlo
echo "Iniciando el backend..."
cd ~/triviasd/backendtriviasd
npm install
npm start &

# Navegar al directorio del frontend y encenderlo
echo "Iniciando el frontend..."
cd ~/triviasd/frontendtriviasd
npm install
npm start &

# Esperar a que los procesos terminen
wait