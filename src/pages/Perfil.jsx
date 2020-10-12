import React, {useContext, useCallback, useState} from 'react';
import { NavContext} from '@ionic/react';

import { 
    IonHeader, 
    IonPage, 
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonAvatar,
    IonButton,
    IonIcon
} from '@ionic/react';

import {
    settings
} from 'ionicons/icons';


import './Perfil.scss';

//Context
import AuthContext from '../context/autenticacion/authContext'

//Components
import PopoverUsuarios from '../components/usuarios/PopoverUsuarios'

const Perfil = () => {
    const {navigate} = useContext(NavContext);

    const redirect = useCallback(
        () => navigate('/Proyectos', 'back'),
        [navigate]
    );

    //Importar context
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;

    // State para mostrar el popover
    const [showPopover, setShowPopover] = useState({        
        open:false,
        event: undefined
    })

    //Funcion para enviar datos del componente hijo al padre (Popover)
    const handlePopover = (open, event) => {
        setShowPopover({open: open, event: event})
    }

    if(!usuario){
        redirect();
        return null;
    }

    let Rday = null;
    let Rmonth = null;
    let Ryear = null;

    let Bday = null;
    let Bmonth = null;
    let Byear = null;

    const fechaRegistro = new Date(usuario.registro);
    Rday = fechaRegistro.getDate().toString();
    Rmonth = fechaRegistro.getMonth().toString();
    Ryear = fechaRegistro.getFullYear().toString();
    console.log(Ryear);

    if(usuario.fechaNac){
        const fechaNacimiento = new Date(usuario.fechaNac);
        Bday = fechaNacimiento.getDate().toString();
        Bmonth = fechaNacimiento.getMonth().toString();
        Byear = fechaNacimiento.getFullYear().toString();
    }

    return (  
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
						<IonMenuButton></IonMenuButton>
					</IonButtons>
                    Mi perfil
                    <IonButtons slot="end">
                        <PopoverUsuarios showPopover={showPopover} setShowPopover={handlePopover}/>
                        <IonButton shape="round" onClick={(e) => setShowPopover({open: true, event: e.nativeEvent})}>
							<IonIcon md={settings}></IonIcon>
						</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader className="ion-text-center avatar">
                        <div className="contenedor">
                            <IonAvatar>
                                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                            </IonAvatar>
                        </div> 
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonLabel>Nombre:</IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonLabel>{usuario.nombre}</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonLabel>Email:</IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonLabel>{usuario.email}</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonLabel>Registro:</IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonLabel>{Rday}/{Rmonth}/{Ryear}</IonLabel>
                                </IonCol>
                            </IonRow>
                            {
                                usuario.cargo ? 
                                    <IonRow>
                                        <IonCol>
                                            <IonLabel>Cargo:</IonLabel>
                                        </IonCol>
                                        <IonCol>
                                            <IonLabel>{usuario.cargo}</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                : null
                            }

                            {
                                usuario.descripcion ? 
                                    <IonRow>
                                        <IonCol>
                                            <IonLabel>Descripcion:</IonLabel>
                                        </IonCol>
                                        <IonCol>
                                            <IonLabel>{usuario.descripcion}</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                : null
                            }

                            {
                                usuario.fechaNac ? 
                                    <IonRow>
                                        <IonCol>
                                            <IonLabel>Fecha nacimiento:</IonLabel>
                                        </IonCol>
                                        <IonCol>
                                            <IonLabel>{Bday}/{Bmonth}/{Byear}</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                : null
                            }
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}
 
export default Perfil;