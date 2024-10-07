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
        <div className="App min-h-screen flex items-center justify-center">
            <Header/>
            <div className=" flex items-center flex-col"  >
                <h1 className=" text-4xl text-[#636466]" >Elige tu tipo de usuario:</h1>
                <div className=" mt-28">
                    <StandardButton text="Presentador" onClick={() => navigate('/xpsd')} size="large" />
                    <StandardButton text="Administrador" onClick={() => navigate('/admin')} size="large" />
                </div>
            </div>
        </div>
    );
}

export default App;
