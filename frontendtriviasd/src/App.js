// Pagina de seleccion de usuario
// Date: 07/09/2021
// WIP los botones se separarán en dos componentes
// Imports
import './App.css';

//Componentes
import Header from './components/header';



function App() {
    return (
        <div className="App h-screen bg-gray-100">
            <Header/>
            <div className=" flex items-center flex-col h-[92%] pt-44"  >
                <h1 className=" text-4xl " ><b>Elige tu tipo de usuario:</b></h1>
                <div className=" mt-28">
                    <button className="bg-[#FF0033] text-white text-3xl font-bold py-2 px-4 rounded-2xl w-72 h-36 mr-16" >Presentador</button>
                    <button className="bg-[#FF0033] text-white text-3xl font-bold py-2 px-4 rounded-2xl w-72 h-36 ml-16" >Administrador</button>
                </div>
            </div>
        </div>
    );
}

export default App;
