//Imports

import React from 'react';

//Componentes

import Header from '../components/header';

export default function Presentador(){
    return (
        <div className="App h-screen bg-gray-100">
            <Header/>
            <div className="flex flex-col items-center h-[92%] pt-44">
                <h1 className="text-4xl"><b>Presentador</b></h1>
            </div>
        </div>
    )
}