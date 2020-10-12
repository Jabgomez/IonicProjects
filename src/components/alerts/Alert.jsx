import React from 'react';

import { 
	IonLabel, 
	IonChip,
	IonIcon
} from '@ionic/react';

import {
	alertCircle
} from 'ionicons/icons';

const Alert = (props) => {
    return ( 
        <IonChip>
            <IonIcon icon={alertCircle} color="danger" />
            <IonLabel>{props.msg}</IonLabel>
        </IonChip>
    );
}
 
export default Alert;