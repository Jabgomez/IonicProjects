import React, { useState, useEffect, useContext } from 'react';

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

import './Register.scss';

//Context
import AlertaContext from '../context/alertas/alertaContext';
import AuthContext from '../context/autenticacion/authContext';

import Alert from '../components/alerts/Alert';


const Register = () => {
	//Importar Context
	const alertaContext = useContext(AlertaContext);
	const {alerta, mostrarAlerta} = alertaContext;

	const authContext = useContext(AuthContext);
	const { mensaje, registrarUsuario } = authContext;

	useEffect(()=>{
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

		// eslint-disable-next-line
    },[mensaje]);

    //State
    const [user, setUser] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    //Extraer state
    const {email, password, nombre, confirmar} = user;

    const HandleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        //Validar campos vacios
        if (nombre.trim()==='' || email.trim()==='' || password.trim()==='' || confirmar.trim()==='') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //Password de 8 caracteres
        if (password.length < 8) {
            mostrarAlerta('La contraseña debe ser de al menos 8 caracteres', 'alerta-error');
            return;
        }

        //Password iguales
        if(password !== confirmar) {
            mostrarAlerta('La contraseña no coincide', 'alerta-error');
            return;
        }
        
        //Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })
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
					<h1>Registro</h1>
				</div>

				<form id="form" onSubmit={onSubmit}>
					<IonItem className="no-radius">
						<IonLabel position="floating">Nombre</IonLabel>
						<IonInput shape="round" type="text" name="nombre" id="nombre" onIonChange={HandleChange} value={nombre}></IonInput>
					</IonItem>					
					<IonItem className="no-radius">
						<IonLabel position="floating">Email</IonLabel>
						<IonInput shape="round" type="email" name="email" id="email" onIonChange={HandleChange} value={email}></IonInput>
					</IonItem>		
					<IonItem className="no-radius">
						<IonLabel position="floating">Constraseña</IonLabel>
						<IonInput type="password" name="password" id="password" onIonChange={HandleChange} value={password}></IonInput>
					</IonItem>
					<IonItem className="no-radius">
						<IonLabel position="floating">Confirmar constraseña</IonLabel>
						<IonInput type="password" name="confirmar" id="confirmar" onIonChange={HandleChange} value={confirmar}></IonInput>
					</IonItem>
					<IonButton type="submit" expand="block" shape="round">Registrarse</IonButton>
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