import React, { useReducer } from 'react';
//import {v4 as uuid} from 'uuid';

//Components
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import clienteAxios from '../../config/axios'

//Types
import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    CREAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR, RESET_PROYECTO, EDITAR_PROYECTO
} from '../../types'

const ProyectoState = props => {
    const initialState = {
        nuevoProyecto : false,
        errorFormulario: false, 
        proyectos : [],
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecutar acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO 
        })
    }

    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            console.log(resultado);


            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch(error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error' 
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const crearProyectos = async proyecto => {
        //proyecto.id = uuid()
        try{
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado);

            // insertar proyecto en state
            dispatch({
                type: CREAR_PROYECTO,
                payload: resultado.data
            })

        } catch(error){
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error' 
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const validarFormulario = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const proyectoActual = (proyectoId) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    const eliminarProyecto = async (proyectoId) => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch(error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error' 
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const resetProyecto = () => {
        dispatch({
            type: RESET_PROYECTO
        })
    }
    
    const editarProyecto = async (proyecto) => {
        try {
            const resultado = await clienteAxios.put(`/api/proyectos/${proyecto._id}`, proyecto)
            console.log(resultado)
            dispatch({
                type: EDITAR_PROYECTO,
                payload: resultado.data.proyecto
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <proyectoContext.Provider value={{
            nuevoProyecto: state.nuevoProyecto, 
            proyectos: state.proyectos,
            errorFormulario: state.errorFormulario,
            proyecto: state.proyecto,
            mensaje: state.mensaje,

            mostrarFormulario,
            obtenerProyectos,
            crearProyectos,
            validarFormulario,
            proyectoActual,
            eliminarProyecto,
            resetProyecto,
            editarProyecto
        }}>
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;