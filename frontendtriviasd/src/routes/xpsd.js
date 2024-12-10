//Imports
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';
//import background from '../assets/xpsd.svg'; // Importa el archivo SVG
//Components


export default function ExperienciaSD() {
    const navigate = useNavigate();


    return(
        <div
            className="App  min-h-screen bg-gray-100 overflow-hidden" onClick={() => navigate("/seleccionEquipos")}
            
        >
            <div className="flex flex-col items-center justify-center h-full mt-60 2xl:mt-96">
            
            </div>
        </div>
    )

   

}