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
            style={{ backgroundImage: `url('/xpsd.svg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="flex flex-col items-center justify-center h-full mt-60 2xl:mt-96">
            <TypeAnimation className="text-9xl font-extrabold text-gray-500 "
                    sequence={['VIVE LA EXPERIENCIA',700,
                                '',800]}
                    style={{ fontSize: '3em', fontWeight: 'bolder' }}
                    repeat={Infinity}
            />
            </div>
        </div>
    )

   

}