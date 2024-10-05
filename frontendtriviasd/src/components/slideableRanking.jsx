import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';


//Components



export default function SlideableRanking(isVisible) {

    //Estado para almacenar los equipos registrados
    const [registeredTeams, setRegisteredTeams] = useState([]);


    async function getTeams() {
        try {
            console.log('getTeams llamado');
            const response = await axios.get('http://localhost:5000/api/admin/getTeams'); //Cambiar la dirección IP por la de la máquina que corre el backend
            console.log('getTeams devuelve: ');
            //Imprimir los equipos registrados
            //console.log(response.data);
            const sortedTeams = response.data.sort((a, b) => b.score - a.score); // Ordenar los equipos antes de actualizar el estado
            setRegisteredTeams(sortedTeams);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }
    useEffect(() => {
        getTeams(); // Llama inmediatamente al montar el componente

    }, []);


    return (
        <div className="App absolute h-screen bg-gray-100">
            <motion.div 
                className="flex flex-col h-full w-10 items-center"
                animate={{ width: isVisible ? '24rem' : '0rem' }} // Animación de entrada y salida
                exit={{ width: '5rem'}} // Animación de salida
                transition={{ duration: 0.5 }}
                onExitComplete={() => console.log('Animación de salida completada')}
            >
                <div className="flex justify-center w-[100%] h-[80%]  mt-[5.5rem] rounded-tl-3xl rounded-br-3xl border-[#FF0033] border-2 border-dashed p-4">
                    <div className='w-full h-full bg-slate-500 rounded-tl-3xl rounded-br-3xl overflow-scroll'>
                        <ul className='w-full'>
                            { isVisible ? registeredTeams.map((team) => {
                                console.log(team);
                                return (
                                    <li key={team.Name} className='flex items-center justify-between w-full h-20 bg-gray-500 border-b-2 border-gray-600 px-4 rounded-tl-3xl rounded-br-3xl'>
                                        <p className='text-2xl'>{team.Name}</p>
                                        <p className='text-2xl'>{team.score}</p>
                                    </li>
                                )
                            }) : null}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}