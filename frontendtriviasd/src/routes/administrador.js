// Pagina de registro de equipos
// Date: 08/09/2021

// Imports


//Componentes
import Header from '../components/header';



function AdminForm() {
    return (
        <div className="App h-screen bg-gray-100">
            <Header/>
            <form className=" flex flex-row shadow-md bg-[#FF0033] w-1/4 h-96 rounded-md p-8  items-center">
                <div className="flex flex-col justify-center   h-auto mr-5">
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

                    <button type='button' className=" flex items-center justify-center self-center bg-lime-700 text-white  rounded-lg p-2 my-5 w-32 h-12 cursor-pointer" >Registrar</button>
                   
                </div>

               
            </form>
        </div>
    );
}

export default AdminForm;
