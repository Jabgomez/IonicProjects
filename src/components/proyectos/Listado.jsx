import React, { useContext } from 'react';

import { 
    IonList, 
    IonItem
} from '@ionic/react';

//Context
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Listado = ({proyectos}) => {
    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    //obtener el state de las tareas
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    const seleccionarProyecto = id => {
        proyectoActual(id); //Selecciona el proyecto actual
        obtenerTareas(id); //Filtrar las tareas del proyecto seleccionado
    }

    return (  
        <IonList>
            {
                proyectos.map(proyecto => (
                    <IonItem key={proyecto._id} routerLink="/Tareas" onClick={()=>{seleccionarProyecto(proyecto._id)}}>
                            {proyecto.nombre}
                    </IonItem>
                ))
            }
        </IonList>
                
    );
}
 
export default Listado;