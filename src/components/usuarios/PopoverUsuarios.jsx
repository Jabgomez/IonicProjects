import React from 'react';

import { 
    IonPopover, 
    IonContent,
    IonList,
    IonItem,
    IonLabel, 
    IonIcon
} from '@ionic/react';

import {
    pencil
} from 'ionicons/icons'

const PopoverUsuarios = (props) => {
    const {showPopover, setShowPopover} = props;   

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
                        <IonItem button routerLink="/EditarUsuario" onClick={()=>{setShowPopover(false, undefined)}}>
                            <IonIcon slot="start" md={pencil}></IonIcon>
                            <IonLabel>Editar perfil</IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonPopover>
        </>
    );
}
 
export default PopoverUsuarios;