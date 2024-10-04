import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
        <div className="App h-screen bg-gray-100">
            <Header />
            <div className="flex flex-col w-full items-center h-full">
                <div className="flex justify-center w-[60%] h-[80%]  mt-52 rounded-tl-3xl rounded-br-3xl border-[#FF0033] border-2 border-dashed p-4">
                <div className='  w-[100%] h-[100%] bg-slate-500  rounded-tl-3xl rounded-br-3xl'>
                    <ul className='w-full'>
                        {registeredTeams.map((team) => {
                            console.log(team);
                            return (
                                <li key={team.Name} className='flex items-center justify-between w-full h-20 bg-gray-500 border-b-2 border-gray-600 px-4 rounded-tl-3xl rounded-br-3xl'>
                                    <p className='text-2xl'>{team.Name}</p>
                                    <p className='text-2xl'>{team.score}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                </div>
                <div className="flex w-full justify-end h-[30%]">
                    <StandardButton text="Siguiente" size="big" onClick={() => navigate('/presentador')}/>
                </div>
            </div>
        </div>
    );
}