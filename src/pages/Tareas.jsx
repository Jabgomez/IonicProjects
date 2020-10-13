import React, {useContext, useState} from 'react';
import { Redirect } from 'react-router-dom';


import {
    settings,
    addOutline
} from 'ionicons/icons'

import { 
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonIcon,
    IonButton, 
    IonCard, 
    IonCardHeader,
    IonCardContent, 
    IonCardSubtitle, 
    IonTitle,
    IonFab,
    IonFabButton,
    IonList,
    IonItem
} from '@ionic/react';

//Context
import proyectoContext from '../context/proyectos/proyectoContext'
import tareaContext from '../context/tareas/tareaContext'

//Components
import Listado from '../components/tareas/Listado'
import PopoverProyectos from '../components/proyectos/Popover'


const Tareas = () => {

    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;    

    //obtener el state de las tareas
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext;

    // State para mostrar el popover
    const [showPopover, setShowPopover] = useState({        
        open:false,
        event: undefined
    })

    //Funcion para enviar datos del componente hijo al padre (Popover)
    const handlePopover = (open, event) => {
        setShowPopover({open: open, event: event})
    }

    let proyectoActual = null
    //Array destructuring
    if(proyecto){
        proyectoActual = proyecto[0];
    } 

    return ( 
        <>
            {
                proyecto?
                    <IonPage>
                        <IonHeader className="ion-no-border">
                            <IonToolbar>
                                <IonButtons slot="start">
                                    <IonMenuButton></IonMenuButton>
                                </IonButtons>
                                {proyectoActual.nombre}
                                <IonButtons slot="end">
                                    <PopoverProyectos showPopover={showPopover} setShowPopover={handlePopover}/>
                                    <IonButton shape="round" onClick={(e) => setShowPopover({open: true, event: e.nativeEvent})}>
                                        <IonIcon md={settings}></IonIcon>
                                    </IonButton>
                                </IonButtons>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent className="ion-padding">
                            {
                                proyectoActual.descripcion ? 
                                    <IonCard>
                                        <IonCardHeader>
                                            <IonCardSubtitle>
                                                Descripcion del proyecto
                                            </IonCardSubtitle>
                                            <IonCardContent>
                                                {proyectoActual.descripcion}
                                            </IonCardContent>
                                        </IonCardHeader>
                                    </IonCard>
                                : 
                                    null
                            }

                            <IonTitle className="ion-text-center ion-padding-top ion-margin-bottom">Tareas</IonTitle>

                            {
                                tareasProyecto.length === 0 ? 
                                    <>
                                        <IonFab horizontal="center">
                                            <IonFabButton routerLink='/NuevaTarea'>
                                                <IonIcon md={addOutline}/>
                                            </IonFabButton>
                                        </IonFab>
                                        <IonList>
                                            <IonItem className="ion-margin-top">
                                                <IonCard className="ancho ion-text-center">
                                                    <p className="ion-margin-top ion-padding-top">Crear nueva tarea</p>
                                                </IonCard>
                                            </IonItem>
                                        </IonList>
                                    </>
                                :
                                    <>
                                        <IonFab horizontal="center">
                                            <IonFabButton routerLink='/NuevaTarea'>
                                                <IonIcon md={addOutline}/>
                                            </IonFabButton>
                                        </IonFab>
                                        <IonList>
                                            <IonItem className="ion-margin-top">
                                                <IonCard className="ancho ion-text-center">
                                                    <p className="ion-margin-top ion-padding-top">Crear nueva tarea</p>
                                                </IonCard>
                                            </IonItem>
                                        </IonList>
                                        <Listado tareasProyecto={tareasProyecto}></Listado>
                                    </>
                            }
                        </IonContent>
                    </IonPage>
                :
                    <Redirect to="/Proyectos"/>
            }
        </>
    );
}
 
export default Tareas;