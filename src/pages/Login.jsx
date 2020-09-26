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

const Login = () => {
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
					<h1>Login</h1>
				</div>

				<form id="form">
					<IonItem>
						<IonLabel position="floating">Email</IonLabel>
						<IonInput shape="round" type="email" ></IonInput>
					</IonItem>
					
					<IonItem>
						<IonLabel position="floating">Constraseña</IonLabel>
						<IonInput type="password"></IonInput>
					</IonItem>
					<IonButton expand="block" shape="round">Iniciar sesión</IonButton>
					<div className="ion-text-center">
						<IonItemDivider/>
						<p>¿Aún no tienes cuenta?</p>
						<IonRouterLink routerLink="/Register" className="link">Registrate aquí</IonRouterLink>
					</div>
				</form>
			</IonContent>
        </IonPage>
      );
}
 
export default Login;