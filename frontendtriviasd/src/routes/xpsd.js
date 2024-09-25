//Imports
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom'
//Components


export default function ExperienciaSD() {
    const navigate = useNavigate();


    return(
        <div className="App  h-screen bg-gray-100" onClick={() => navigate("/seleccionEquipos")}>

            <div className="flex flex-col items-center h-[50%] pt-44">
            <TypeAnimation className="text-4xl font-bold"
                    sequence={['Vive la experiencia securitas direct',500,
                                '',500]}
                    style={{ fontSize: '2em' }}
                    repeat={Infinity}
            />

            </div>
        </div>
    )

   

}