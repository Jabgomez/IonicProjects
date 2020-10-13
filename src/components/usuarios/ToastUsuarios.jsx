import React from 'react';

import {
    IonToast
} from "@ionic/react"

const ToastUsuarios = (props) => {

    const {showToast, setShowToast} = props;

    return ( 
        <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Cambios guardados. Vuelva a iniciar sesión."
            duration={2000}
        />
     );
}
 
export default ToastUsuarios;