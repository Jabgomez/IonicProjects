import { 
    EDITAR_USUARIO
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case EDITAR_USUARIO:
            return{
                ...state,
                usuario: action.payload
            }

        default:
            return state;
    }
}