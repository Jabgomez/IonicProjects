import React, { useState, useCallback, useContext } from 'react';
import {NavContext} from '@ionic/react';

import {

} from 'ionicons/icons'

//components
import proyectoContext from '../context/proyectos/proyectoContext'
import Alert from '../components/alerts/Alert'

import { 
	IonButtons,
    IonCol,
    IonRow,
    IonContent,
    IonGrid,
	IonHeader,
    IonInput,
    IonLabel,
    IonPage, 
    IonToolbar, 
    IonItem, 
    IonTextarea,
    IonButton, IonBackButton
} from '@ionic/react';

import './NuevoProyecto.scss';

const NuevoProyecto = () => {
    const {navigate} = useContext(NavContext);

    const redirect = useCallback(
        () => navigate('/Proyectos', 'back'),
        [navigate]
      );

    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {crearProyectos} = proyectosContext;

    //State proyecto
    const [proyecto, setProyecto] = useState({
        nombre: '',
        descripcion: ''
    });

    const [mensaje, setMensaje] = useState("")

    //Extraer nombre
    const { nombre, descripcion} = proyecto; 

    //registrar cambios en el state
    const handleChange = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }
    
    //Cuando el usuario hace click en enviar
    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar Proyecto
        if(nombre === '') {
            setMensaje ('El nombre es obligatorio');

            setTimeout(() => {
                setMensaje ('');
            }, 5000);

            return;
        }

        //Agregar al state
        crearProyectos(proyecto)

        //Reiniciar Form
        setProyecto({
            nombre : '',
            descripcion: ''
        })

        //Redirigir a la pagina de proyectos
        console.log("redirecting");
        redirect();
    }

    return (
        <IonPage>
			<IonHeader className="ion-no-border">
				<IonToolbar>
					<IonButtons slot="start">
                        <IonBackButton defaultHref="/Proyectos"></IonBackButton>
					</IonButtons>
					Nuevo proyecto
                    <IonButtons slot="end">
						{mensaje!=="" ? (<Alert msg={mensaje}/>) : null}
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<form onSubmit={onSubmitProyecto}>
                    <IonGrid>
                        <IonRow>
                            <IonCol sizeXs="12">
                                <IonItem>
                                    <IonLabel position="floating">Nombre</IonLabel>
                                    <IonInput type="text" name="nombre" value={nombre}  onIonChange={handleChange}></IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXs="12">
                                <IonItem>
                                    <IonLabel position="floating">Descripción</IonLabel>
                                    <IonTextarea maxlength="200" autoGrow="true" name="descripcion" value={descripcion}  onIonChange={handleChange}></IonTextarea>
                                </IonItem>
                            </IonCol>
                        </IonRow>    
                    </IonGrid>
                    <div className="ion-text-center">
                        <IonButton type="submit" shape="round">Crear proyecto</IonButton>
                    </div>
                </form>
			</IonContent>
		</IonPage>
      );
}
 
export default NuevoProyecto;