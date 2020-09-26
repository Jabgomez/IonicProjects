import React from 'react';

import { 
    IonBackButton,
	IonButtons,
    IonContent,
	IonHeader,
	IonPage,
	IonToolbar,
	IonInput, 
	IonButton,
	IonLabel, 
	IonItem, 
	IonItemDivider,
	IonRouterLink
} from '@ionic/react';

import './Login.scss';

const Register = () => {
    return (
      <IonPage>
			<IonHeader className="ion-no-border">
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/Home"/>
					</IonButtons>					
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div id="header">
					<img src="/assets/img/Projects-iso.svg" alt=""/>
					<h1>Registro</h1>
				</div>

				<form id="form">
					<IonItem className="no-radius">
						<IonLabel position="floating">Nombre</IonLabel>
						<IonInput shape="round" type="text"></IonInput>
					</IonItem>					
					<IonItem className="no-radius">
						<IonLabel position="floating">Email</IonLabel>
						<IonInput shape="round" type="email" ></IonInput>
					</IonItem>		
					<IonItem className="no-radius">
						<IonLabel position="floating">Constraseña</IonLabel>
						<IonInput type="password"></IonInput>
					</IonItem>
					<IonItem className="no-radius">
						<IonLabel position="floating">Confirmar constraseña</IonLabel>
						<IonInput type="password"></IonInput>
					</IonItem>
					<IonButton expand="block" shape="round">Registrarse</IonButton>
					<div className="ion-text-center">
						<IonItemDivider/>
						<p>¿Ya tienes cuenta?</p>
						<IonRouterLink routerLink="/Login" className="link">Inicia sesión</IonRouterLink>
					</div>
				</form>
			</IonContent>
        </IonPage>
      );
}
 
export default Register;