import React, {useState} from 'react';

import { 
    IonPopover, 
    IonContent,
    IonList,
    IonItem,
    IonLabel, IonIcon
} from '@ionic/react';

import {
    pencil,
    trash
} from 'ionicons/icons'


//Components
import EliminarAlert from './EliminarAlert'

const PopoverProyectos = (props) => {
    const {showPopover, setShowPopover} = props;   

    //State del popover
    const [showAlert, setShowAlert] = useState(false);

    const handleAlert = (bool) => {
        setShowAlert(bool);
    }

    return (  
        <>
            <IonPopover
                isOpen={showPopover.open}
                onDidDismiss={()=>{setShowPopover(false, undefined)}}
                animated={true}
                event={showPopover.event}
                backdropDismiss={true}
            >
                <IonContent> 
                    <IonList>
                        <IonItem button routerLink="/EditarProyecto" onClick={()=>{setShowPopover(false, undefined)}}>
                            <IonIcon slot="start" md={pencil}></IonIcon>
                            <IonLabel>Editar proyecto</IonLabel>
                        </IonItem>
                        <EliminarAlert showAlert={showAlert} setShowAlert={handleAlert}/>
                        <IonItem button onClick={() => setShowAlert(true)}>
                            <IonIcon slot="start" md={trash}></IonIcon>
                            <IonLabel>Eliminar proyecto</IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonPopover>
        </>
    );
}
 
export default PopoverProyectos;