// Pagina de registro de equipos
// WIP: Cambiar el boton por componente de boton estandar

// Imports
import React from 'react';
import axios from 'axios';
import { useState } from 'react';

//Componentes
import Header from '../components/header';
import StandardButton from '../components/standardButton';


function AdminForm() {

    const [teamName, setTeamName] = useState('');
    const [leaderName, setLeaderName] = useState('');
    const [leaderEmail, setLeaderEmail] = useState('');

    async function registerTeam() {
        try {
            const response = await axios.post('http://localhost:5000/api/admin/registerTeam', {
                teamName,
                leaderName,
                leaderEmail
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }


    return (
        <div className="App h-screen bg-gray-100">
            <Header/>
            <div className=" flex items-center flex-col h-[92%] pt-44"  >
                <form className=" flex flex-col shadow-xl bg-gray-300  w-1/4 h-96 rounded-md p-8">
                    <div className="flex flex-col items-center h-auto ">
                        <div className='flex flex-col w-4/5 '>
                            <label htmlFor="Name" className="block text-gray-700 text-md font-bold mb-2 ">
                                Nombre del equipo
                            </label>
                            <input type="text" id="Name" value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="border-2 border-black rounded-lg "/>
                        </div>
                        <div className='flex flex-col mb-2 mt-5 w-4/5 '>
                            <label htmlFor="leaderName" className="block text-gray-700 text-md font-bold mb-2 ">
                                Nombre del líder
                            </label>
                            <input type="text" id="leaderName" value={leaderName}
                            onChange={(e) => setLeaderName(e.target.value)}
                            className="border-2 border-black rounded-lg "/>
                        </div>
                        <div className='flex flex-col mb-2 mt-5 w-4/5'>
                            <label htmlFor="leaderMail" className="block text-gray-700 text-md font-bold mb-2 ">

                                Correo del líder
                            </label>
                            <input type="text" id="leaderEmail"  value={leaderEmail}
                            onChange={(e) => setLeaderEmail(e.target.value)}
                            className="border-2 border-black rounded-lg "/>
                        </div>

                        <StandardButton text="Registrar" onClick={registerTeam} size='small' type={"button"} />
                    </div>

                </form>

            </div>
        </div>
    );
}

export default AdminForm;
