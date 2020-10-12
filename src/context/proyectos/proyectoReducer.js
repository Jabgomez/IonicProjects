import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    CREAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR, RESET_PROYECTO, EDITAR_PROYECTO
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                nuevoProyecto: true
            } 
        
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }

        case CREAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                nuevoProyecto: false,
                errorFormulario: false
            }

        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorFormulario: true
            }

        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }

        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload), 
                proyecto: null
            }

        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        case RESET_PROYECTO:
            return {
                ...state,
                nuevoProyecto : false,
                errorFormulario: false, 
                proyectos : [],
                proyecto: null,
                mensaje: null
            }

        case EDITAR_PROYECTO:
            return{
                ...state,
                proyectos: state.proyectos.map(proyecto => proyecto._id === action.payload._id ? proyecto = action.payload : proyecto),
                proyecto: null,
            }

        default:
            return state;
    }
}