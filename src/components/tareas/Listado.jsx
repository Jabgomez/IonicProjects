import React, {useState, useContext} from 'react';
import {NavContext} from '@ionic/react';

import { 
    IonList, 
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';

import ActionSheet from './ActionSheet';

import './Listado.scss';

//Context
import tareaContext from '../../context/tareas/tareaContext'
import proyectoContext from '../../context/proyectos/proyectoContext'

const Listado = ({tareasProyecto}) => {
    //obtener el context de las tareas
    const tareasContext = useContext(tareaContext);
    const { guardarTareaActual } = tareasContext;

    const [showActionSheet, setShowActionSheet] = useState(false);

    const seleccionar = (tarea) => {
        guardarTareaActual(tarea);
    }

    const handleActionSheet = (open, event) => {
        setShowActionSheet({open: open, event: event})
    }

    return (  
        <IonList className="ion-no-border">
            <ActionSheet showActionSheet={showActionSheet} setShowActionSheet={handleActionSheet}></ActionSheet>
            {
                tareasProyecto.map(tarea => {
                    const today = new Date();

                    let initDay = null;
                    let initMonth = null;
                    let initYear = null;
                    
                    let endDay = null;
                    let endMonth = null;
                    let endYear = null;

                    let msg = '';

                    if(tarea.fechaInicio && tarea.fechaFin) {
                        const initDateTime = new Date(tarea.fechaInicio); 
                        initDay = initDateTime.getDate();
                        initMonth = initDateTime.getMonth();
                        initYear = initDateTime.getFullYear();

                        const endDateTime = new Date(tarea.fechaFin); 
                        endDay = endDateTime.getDate();
                        endMonth = endDateTime.getMonth();
                        endYear = endDateTime.getFullYear();
                        
                        if(today > endDateTime){
                            msg = "Atrasado";
                        }
                    }

                    return (
                    <IonItem button key={tarea._id} onClick={() => {
                        setShowActionSheet(true);
                        seleccionar(tarea);
                    }}>
                        <IonCard className="ancho">
                            <IonCardHeader>
                                <IonCardSubtitle className="sub">Tarea: {tarea.nombre}</IonCardSubtitle>
                                {
                                    tarea.estado ? 
                                        <IonBadge color="success" className="badge">Completo</IonBadge>
                                    :
                                        <IonBadge color={msg !== '' ? "danger" : "warning"} className="badge"> {msg !== '' ? <>Atrasado</> : <>Incompleto</>} </IonBadge>
                                }                     
                            </IonCardHeader>
                            <IonCardContent>
                                {
                                    tarea.descripcion? 
                                        <IonCardSubtitle> 
                                            Descripción: {tarea.descripcion}
                                        </IonCardSubtitle>
                                    :
                                        <IonCardSubtitle> 
                                            Descripción: "No hay descripcion"
                                        </IonCardSubtitle>
                                }
                                {
                                    tarea.fechaInicio && tarea.fechaFin ? 
                                        <IonGrid className="ancho">
                                            <IonRow>
                                                <IonCol>
                                                    <p>Desde:</p>
                                                    <p>Hasta:</p>
                                                </IonCol>
                                                <IonCol>
                                                    <p>{initDay}/{initMonth}/{initYear}</p>
                                                    <p>{endDay}/{endMonth}/{endYear}</p>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    : null
                                }
                            </IonCardContent>
                        </IonCard>
                    </IonItem>
                )})
            }
        </IonList>
    );
}
 
export default Listado;