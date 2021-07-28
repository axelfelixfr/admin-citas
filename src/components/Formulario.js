import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4'; // Librería para generar id

const Formulario = ({ crearCita }) => {

    // Declaramos el initialState
    const initialState = { 
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    }

    // Crear state de citas
    const [cita, setCita] = useState(initialState);

    // State para la alerta de errores
    const [error, setError] = useState(false);

    // Función que se ejecuta cada vez que el usuario escriba en un input
    const handleInputChange = e => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    }

    // Extraer valores del state
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Cuando el usuario envía los datos del formulario
    const submitCita = e => {
        e.preventDefault();

        // Validar formulario
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
            hora.trim() === ''  || sintomas.trim() === '' ){
            setError(true);
            return;
        }

        // Eliminar mensaje de error
        setError(false);

        // Asignar un ID
        cita.id = uuid(); // Le agregamos un id al objeto cita, con la función uuid() que genera un id aleatorio
        
        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        setCita(initialState);
    }

    return (
        <>
            <h2>Crear cita</h2>

            {/* Si existe un error mostrará el error */}
            {
                (error) && <p className="alerta-error">Todos los campos son obligatorios</p>
            }

            <form
                onSubmit={ submitCita }
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text" 
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={ handleInputChange }
                    value={ mascota }
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text" 
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño"
                    onChange={ handleInputChange }
                    value={ propietario }
                />

                <label>Fecha</label>
                <input 
                    type="date" 
                    name="fecha"
                    className="u-full-width"
                    onChange={ handleInputChange }
                    value={ fecha }
                />

                <label>Hora</label>
                <input 
                    type="time" 
                    name="hora"
                    className="u-full-width"
                    onChange={ handleInputChange }
                    value={ hora }
                />

                <label>Síntomas</label>
                <textarea 
                    name="sintomas"
                    className="u-full-width"
                    onChange={ handleInputChange }
                    value={ sintomas }
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;
