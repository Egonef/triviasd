// Pagina de seleccion de usuario
// Date: 07/09/2021
// WIP los botones se separarán en dos componentes
// Imports
import './App.css';




function App() {
    return (
        <div className="App h-screen bg-gray-100">
            <header className="flex justify-center h-[8%] bg-[#FF0033]">
                <img className=" " src="pingu.png" alt="logo" ></img>
            </header>
            <div className=" flex items-center flex-col h-[92%] pt-44"  >
                <h1 className=" text-4xl " ><b>Elige tu tipo de usuario:</b></h1>
                <div className=" mt-20">
                    <button className="bg-[#FF0033] text-white font-bold py-2 px-4 rounded-full w-40 h-20 m-4" >Jugador</button>
                    <button className="bg-[#FF0033] text-white font-bold py-2 px-4 rounded-full w-40 h-20 m-4" >Administrador</button>
                </div>
            </div>
        </div>
    );
}

export default App;
