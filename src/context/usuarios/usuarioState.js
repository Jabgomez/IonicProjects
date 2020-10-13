import React, { useReducer } from 'react';

//Components
import usuarioContext from './usuarioContext'
import usuarioReducer from './usuarioReducer'
import clienteAxios from '../../config/axios'

//Types
import { 
    EDITAR_USUARIO
} from '../../types'

const UsuarioState = props => {
    const initialState = {
        usuario: {
            _id: '',
            nombre: '',
            email: '',
            cargo: '',
            password: '',
            avatar: '',
            descripcion: '',
            fechaNac: ''
        }
    }

    //Dispatch para ejecutar acciones
    const [state, dispatch] = useReducer(usuarioReducer, initialState)

    //Funciones
    const editarUsuario = async (usuario) => {
        try {
            const resultado = await clienteAxios.put(`/api/usuarios/${usuario._id}`, usuario)
            console.log(resultado)
            dispatch({
                type: EDITAR_USUARIO,
                payload: resultado.data.usuarioSeleccionado
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <usuarioContext.Provider value={{
            usuario: state.usuario,

            editarUsuario
        }}>
            {props.children}
        </usuarioContext.Provider>
    )
}

export default UsuarioState;