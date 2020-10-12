import React, {useContext, useCallback} from 'react';
import {NavContext} from '@ionic/react';

import {
    IonActionSheet
} from '@ionic/react'

import {
    trash,
    close,
    checkmark,
    pencil
} from 'ionicons/icons'

//Context
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const ActionSheet = (props) => {
    const {navigate} = useContext(NavContext);

    //obtener el context de las tareas
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, tareaActual, editarTarea} = tareasContext;

    //obtener el context de proyecto
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const [proyectoActual] = proyecto;

    const {showActionSheet, setShowActionSheet} = props;  
    
    const redirect = useCallback(
        () => navigate('/EditarTarea', 'forward'),
        [navigate]
    );

    //Eliminar
    const eliminar = (_id) => {
        eliminarTarea(_id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    } 

    //Cambiar estado de la tarea
    const cambiarEstado = (tarea) => {
        if(tarea.estado === true) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        editarTarea(tarea);
    }

    return (  
        <IonActionSheet
            isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            cssClass='my-custom-class'
            buttons={[{
            text: 'Eliminar',
            role: 'destructive',
            icon: trash,
            handler: () => {
                eliminar(tareaActual._id);
                console.log('Delete clicked');
            }
            }, {
            text: 'Editar',
            icon: pencil,
            handler: () => {
                console.log('Update clicked');
                redirect();
            }
            }, {
            text: 'Marcar tarea',
            icon: checkmark,
            handler: () => {
                cambiarEstado(tareaActual);
                console.log('Mark clicked');
            }
            }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
            }
            }]}
        >
        </IonActionSheet>
    );
}
 
export default ActionSheet;