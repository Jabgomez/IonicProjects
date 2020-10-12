import React, { useReducer } from 'react';

import TareaContext from './tareaContext'
import tareaReducer from './tareaReducer'
import ClienteAxios from '../../config/axios'

import {
    TAREAS_PROYECTO, 
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA, 
    RESET_TAREA
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaActual: null
    }
    
    //Crear el dispatch y el state
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    //Funciones
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await ClienteAxios.get('/api/tareas', {params: {proyecto}});
            console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch(error) {
            console.log(error);
        }
    }

    const agregarTarea = async tarea => {
        try{
            const resultado = await ClienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        }catch(error){
            console.log(error)
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) => {
        try {
            await ClienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    const guardarTareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const editarTarea = async (tarea) => {
        try {
            const resultado = await ClienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            console.log(resultado)
            dispatch({
                type: EDITAR_TAREA,
                payload: resultado.data.tareaSeleccionada
            })
        } catch (error) {
            console.log(error)
        }
    }

    const resetTarea = () => {
        dispatch({
            type: RESET_TAREA
        })
    }

    return (  
        <TareaContext.Provider value={{
            tareasProyecto: state.tareasProyecto, 
            errorTarea: state.errorTarea,
            tareaActual: state.tareaActual,

            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            guardarTareaActual,
            editarTarea,
            resetTarea
        }}>
            {props.children}
        </TareaContext.Provider>
    );
}
 
export default TareaState;