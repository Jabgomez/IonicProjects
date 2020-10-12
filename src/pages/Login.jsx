import React, { useState, useContext, useEffect } from 'react';

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

//Components
import AlertaContext from '../context/alertas/alertaContext'
import AuthContext from '../context/autenticacion/authContext'

import Alert from '../components/alerts/Alert';

const Login = () => {
	//Importar Context
	const alertaContext = useContext(AlertaContext);
	const {alerta, mostrarAlerta} = alertaContext;

	const authContext = useContext(AuthContext);
	const { mensaje, iniciarSesion } = authContext;

	useEffect(()=>{
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
		}
		// eslint-disable-next-line
	},[mensaje]);
	
	//State
    const [user, setUser] = useState({
        email: '',
        password: ''
	})
	
	//Extraer state
    const {email, password} = user;

    const HandleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
	}
	
	const onSubmit = (e) => {
        e.preventDefault();

        //Validar campos vacios
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
			return;
		}

        //Pasarlo al action
        iniciarSesion({ email, password });
    }

    return (
        <IonPage>
			<IonHeader className="ion-no-border">
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/Home"/>
					</IonButtons>
					<IonButtons slot="end">
						{alerta ? (<Alert msg={alerta.msg}/>) : null}
					</IonButtons>					
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div id="header">
					<img src="/assets/img/Projects-iso.svg" alt=""/>
					<h1>Login</h1>
				</div>

				<form id="form" onSubmit={onSubmit}>
					<IonItem>
						<IonLabel position="floating">Email</IonLabel>
						<IonInput shape="round" type="email" name="email" id="email" onIonChange={HandleChange} value={email}></IonInput>
					</IonItem>
					
					<IonItem>
						<IonLabel position="floating">Constraseña</IonLabel>
						<IonInput shape="round" type="password" name="password" id="password" onIonChange={HandleChange} value={password}></IonInput>
					</IonItem>
					<IonButton type="submit" expand="block" shape="round">Iniciar sesión</IonButton>
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