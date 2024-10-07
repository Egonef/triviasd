//Imports
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

//Componentes
import StandardButton from './standardButton';





export default function TeamForm() {

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
            //Si el equipo ya está registrado, mostramos un mensaje de error y  limnpiamos los campos
            if (response.data === 'Team already registered') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El equipo ya está registrado',
                    confirmButtonColor: '#FF0033',
                });
                setTeamName('');
                setLeaderName('');
                setLeaderEmail('');
            }else if(response.data === 'Empty record'){
                //Si algún campo está vacío, mostramos un mensaje de error y limpiamos los campos
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pueden dejar campos vacíos',
                    confirmButtonColor: '#FF0033',
                });
            }else if(response.data === 'Max teams reached'){
                //Si ya hay 4 equipos registrados, mostramos un mensaje de error y limpiamos los campos
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ya se han registrado 4 equipos',
                    confirmButtonColor: '#FF0033',
                });
                setTeamName('');
                setLeaderName('');
                setLeaderEmail('');
            }else{
                //Si el equipo se registró correctamente, mostramos un mensaje de éxito y limpiamos los campos
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Equipo registrado',
                    confirmButtonColor: '#95ff00',
                });
                setTeamName('');
                setLeaderName('');
                setLeaderEmail('');
            }

        } catch (error) {
            console.error("Error al llamar a la API:", error.response ? error.response.data : error.message);
        }
    }



    return (
        <div className="flex flex-col items-center w-[45%] h-[30%] rounded-tl-3xl rounded-br-3xl  border-[#FF0033] border-2 border-dashed">
        <form id='registerForm' className=" flex flex-col shadow-xl bg-[#636466] my-4 w-[95%] h-[95%] rounded-tl-3xl rounded-br-3xl p-8 ">
            <div className="flex flex-col items-center h-auto ">
                <div className='flex flex-col w-4/5 '>
                    <label htmlFor="Name" className="block text-white text-md font-bold mb-2 ">
                        Nombre del equipo
                    </label>
                    <input type="text" id="Name" value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="border-2 border-[#FF0033] rounded-lg "/>
                </div>
                <div className='flex flex-col mb-2 mt-5 w-4/5 '>
                    <label htmlFor="leaderName" className="block text-white text-md font-bold mb-2 ">
                        Nombre del líder
                    </label>
                    <input type="text" id="leaderName" value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    className="border-2 border-[#FF0033] rounded-lg"/>
                </div>
                <div className='flex flex-col mb-2 mt-5 w-4/5'>
                    <label htmlFor="leaderMail" className="block text-white text-md font-bold mb-2 ">

                        Correo del líder
                    </label>
                    <input type="text" id="leaderEmail"  value={leaderEmail}
                    onChange={(e) => setLeaderEmail(e.target.value)}
                    className="border-2 border-[#FF0033] rounded-lg"/>
                </div>

                <StandardButton text="Registrar" onClick={registerTeam} size='small' type={"button"} />
            </div>

        </form>
        </div>
    )
}