// Pagina de seleccion de usuario
// Imports
import React from 'react';
import { useNavigate } from 'react-router-dom';
//Componentes
import Header from './components/header';
import StandardButton from './components/standardButton';


function App() {

    const navigate = useNavigate();

    return (
        <div className="App h-screen bg-gray-100">
            <Header/>
            <div className=" flex items-center flex-col h-[92%] pt-44"  >
                <h1 className=" text-4xl " ><b>Elige tu tipo de usuario:</b></h1>
                <div className=" mt-28">
                    <StandardButton text="Presentador" onClick={() => navigate('/presentador')} size="large" />
                    <StandardButton text="Administrador" onClick={() => navigate('/admin')} size="large" />
                </div>
            </div>
        </div>
    );
}

export default App;
