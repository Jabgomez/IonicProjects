import React, {useContext, useEffect} from 'react';

import { 
	IonButtons,
    IonContent,
	IonHeader,
	IonMenuButton,
    IonPage, 
	IonToolbar,
	IonButton, 
	IonIcon, 
	IonFab,
	IonFabButton
} from '@ionic/react';

import {
	informationCircleOutline,
	addOutline
} from 'ionicons/icons'

import './Proyectos.scss';

//Components
import proyectoContext from '../context/proyectos/proyectoContext'
import AlertaContext from '../context/alertas/alertaContext' 

import Listado from '../components/proyectos/Listado'

const Proyectos = () => {

	const proyectosContext = useContext(proyectoContext);
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { mostrarAlerta } = alertaContext;
	
	//Obtener proyectos cuando carga el componente
    useEffect(()=>{
        //Si hay un error
        if(mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}

		console.log("Obteniendo proyectos desde Proyectos");
		obtenerProyectos();
		
		//eslint-disable-next-line
    }, [mensaje])
	
	return (
		<IonPage>
			<IonHeader className="ion-no-border">
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton></IonMenuButton>
					</IonButtons>
					Dashboard
					<IonButtons slot="end">
						<IonButton shape="round">
							<IonIcon md={informationCircleOutline}></IonIcon>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="img-container">
					<img src="/assets/img/Dashboard.png" alt="Banner"/>
				</div>
					{proyectos.length === 0 ? 
						<div className="ion-text-center ion-padding">
							<h1>Parece que no hay nada aquí.</h1>
							<p>¡Inicie creando su primer proyecto!</p>
							<IonFab horizontal="center">
								<IonFabButton routerLink='/NuevoProyecto'>
									<IonIcon md={addOutline}/>
								</IonFabButton>
							</IonFab>			
						</div>
					:
						<div className="ion-text-center ion-padding">
							<h1>Seleccione un proyecto para continuar.</h1>
							<Listado proyectos={proyectos}/>
						</div>
					}
				

			</IonContent>
		</IonPage>
		);
}
 
export default Proyectos;