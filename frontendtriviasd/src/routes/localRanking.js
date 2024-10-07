import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

//Components
import Header from '../components/header';
import StandardButton from '../components/standardButton';

export default function RankingLocal() {

    //Estado para almacenar los equipos registrados
    const [registeredTeams, setRegisteredTeams] = useState([]);

    const navigate = useNavigate();


    async function getTeams() {
        try {
            console.log('getTeams llamado');
            const response = await axios.get('http://localhost:5000/api/admin/getSelectedTeams'); //Cambiar la dirección IP por la de la máquina que corre el backend
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
        <div className="App h-screen bg-gray-100 flex flex-col justify-between">
            <Header />
            <div className="flex flex-col w-full items-center h-full justify-end">
                <div className="flex justify-center w-full h-full items-end translate-y-[10%]">
                    <div className='flex flex-row w-[60%] h-[60%] items-end'>
                        {registeredTeams
                            .sort((a, b) => b.score - a.score)
                            .slice(0, 4)
                            .map((team, index) => {
                                let orderClass = '';
                                let heightClass = 'h-[80%]';
                                let bgColorClass = 'bg-gray-500'; // Default color
                                let roundedBorders = 'rounded-tl-3xl rounded-br-3xl'; // Rounded top borders
                                let trophySrc = ''; // Default trophy
                                let trophyPosition = 'top-0';
                                let finalHeight = '80%';
                                switch (index) {
                                    case 0:
                                        orderClass = 'order-2'; // Middle
                                        heightClass = 'h-[100%]'; // Taller
                                        bgColorClass = 'bg-red-500'; // Red for middle
                                        trophySrc = "Trophy1.svg"; // Trophy for first place
                                        trophyPosition = 'xl:top-[-35%] md:top-[-10%]'; // Higher trophy
                                        finalHeight = '100%';
                                        
                                        break;
                                    case 1:
                                        orderClass = 'order-1'; // Left
                                        bgColorClass = 'bg-gray-300'; // Light gray for left
                                        trophySrc = "Trophy2.svg"; // Trophy for second place
                                        trophyPosition = 'xl:top-[-20%] md:top-[3%]';
                                        break;
                                    case 2:
                                        orderClass = 'order-3'; // Right
                                        bgColorClass = 'bg-gray-500'; // Gray for right
                                        trophySrc = "Trophy3.svg"; // Trophy for third place
                                        trophyPosition = 'xl:top-[-20%] md:top-[3%]';
                                        break;
                                    case 3:
                                        orderClass = 'order-4'; // Right
                                        bgColorClass = 'bg-gray-600'; // Gray for right
                                        finalHeight = '60%';
                                        break;
                                    default:
                                        break;
                                }
                                return (
                                    <motion.div
                                        key={team.Name} className={`flex flex-col items-center justify-end w-1/3 ${heightClass} ${bgColorClass} ${orderClass} ${roundedBorders} overflow-hidden`}
                                        initial={{ height: 0 }}
                                        animate={{ height: finalHeight }}
                                        transition={{ duration: 1 }}
                                        >
                                        <motion.img src={trophySrc} className={`absolute ${trophyPosition} scale-[0.8] overflow-hidden`} initial={{ y: 40, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 ,scale: 0.8}}
                                        transition={{ duration: 1 }}/>
                                        <p className='text-2xl'>{team.Name}</p>
                                        <p className='text-2xl'>{team.score}</p>
                                    </motion.div>
                                );
                            })}
                    </div>
                </div>
                <div className="flex w-full justify-end h-[10%] z-10">
                    <StandardButton text="Siguiente" size="big" onClick={() => navigate('/presentador')}/>
                </div>
            </div>
        </div>
    );
}