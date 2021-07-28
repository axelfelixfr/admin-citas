import React, { useEffect, useState } from 'react';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

function App() {

    // Obtenemos las citas en el localStorage con getItem
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    
    // Si no existe citasIniciales en el localStorage, entonces pasa a ser un arreglo vacío
    if(!citasIniciales){
        citasIniciales = [];
    }

    // Arreglo de citas
    const [citas, setCitas] = useState(citasIniciales); // El state inicial sera el de citasIniciales

    // Función que tome las citas actuales y agregue la nueva
    const crearCita = cita => {
        // Al crear una cita usamos setCitas, se la pasamos al state citas, con el operador spread (...) pasamos el state anterior
        setCitas([
            ...citas,
            cita
        ]);
    }

    // Función que elimina una cita por su id
    const eliminarCita = id => {
        const citasRestantes = citas.filter(cita => cita.id !== id);
        setCitas(citasRestantes);
    }

    // useEffect para realizar ciertas operaciones cuando el state cambia
    useEffect(() => {
        // Si existen citasIniciales, agregamos el state citas al localStorage
        if(citasIniciales){
            localStorage.setItem('citas', JSON.stringify(citas));
        } else {
            localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citasIniciales, citas]);

    // Mensaje condicional sobre las citas
    const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

    return (
        <>
            <h1>Administrador de Pacientes</h1>

            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Formulario crearCita={crearCita} />
                    </div>

                    <div className="one-half column">
                        <h2>{ titulo }</h2>
                        {/* Iteramos cada una de las citas */}
                        {
                            citas.map(cita => (
                                <Cita key={ cita.id } cita={ cita } eliminarCita={ eliminarCita } />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
