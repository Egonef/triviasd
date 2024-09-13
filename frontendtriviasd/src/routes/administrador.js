// Pagina de registro de equipos
// Date: 08/09/2021

// Imports


//Componentes
import Header from '../components/header';



function AdminForm() {
    return (
        <div className="App h-screen bg-gray-100">
            <Header/>
            <div className=" flex items-center flex-col h-[92%] pt-44"  >
                <form className=" flex flex-row shadow-xl bg-gray-300  w-1/4 h-96 rounded-md p-8">
                    <div className="flex flex-col justify-center h-auto mr-5">
                        <div className='flex flex-col  '>
                            <label for="Name" className="block text-gray-700 text-md font-bold mb-2 ">
                                Nombre del equipo
                            </label>
                            <input type="text" id="Name" className="border-2 border-black rounded-lg "/>
                        </div>
                        <div className='flex flex-col mb-2 mt-5'>
                            <label for="leaderName" className="block text-gray-700 text-md font-bold mb-2 ">

                                Nombre del líder
                            </label>
                            <input type="text" id="leaderName"  className="border-2 border-black rounded-lg "/>
                        </div>
                        <div className='flex flex-col mb-2 mt-5'>
                            <label for="leaderMail" className="block text-gray-700 text-md font-bold mb-2 ">

                                Correo del líder
                            </label>
                            <input type="text" id="leaderEmail"  className="border-2 border-black rounded-lg "/>
                        </div>

                        <button type='button' className=" flex items-center justify-center self-center bg-[#FF0033] text-white  rounded-lg p-2 my-5 w-32 h-12 cursor-pointer" >Registrar</button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default AdminForm;
