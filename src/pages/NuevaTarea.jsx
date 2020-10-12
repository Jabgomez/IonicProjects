import React, { useState, useCallback, useContext} from 'react';
import {NavContext} from '@ionic/react';

import {

} from 'ionicons/icons'

//Context
import proyectoContext from '../context/proyectos/proyectoContext'
import tareaContext from '../context/tareas/tareaContext'
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
    IonButton, 
    IonBackButton,
    IonDatetime
} from '@ionic/react';

import './NuevoProyecto.scss';
import { Redirect } from 'react-router';

const NuevaTarea = () => {
    const {navigate} = useContext(NavContext);

    //obtener el context de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //obtener el context de las tareas
    const tareasContext = useContext(tareaContext);
    const { agregarTarea, validarTarea, obtenerTareas } = tareasContext;

    //state del formulario
    const [mensaje, setMensaje] = useState("")
    const [tarea, setTarea] = useState({
        nombre: '',
        descripcion: '',
        fechaInicio: null,
        fechaFin: null
    });

    const {nombre, descripcion, fechaInicio, fechaFin} = tarea;

    const redirect = useCallback(
        () => navigate('/Proyectos', 'back'),
        [navigate]
    );

    //Si no hay proyecto seleccionado
    if(!proyecto){
        return(
            <Redirect to="/Proyectos"></Redirect>
        )
    };
   
    //Array destructuring
    const [proyectoActual] = proyecto;

    //Leer valores del form
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const agregar = e => {
        e.preventDefault();

        //Validar
        if(nombre.trim() === '') {
            validarTarea();
            setMensaje ('El nombre es obligatorio');

            setTimeout(() => {
                setMensaje ('');
            }, 5000);
            return;
        }
        
        tarea.proyecto = proyectoActual._id;
        agregarTarea(tarea);
        
        //Actualizar las tareas
        obtenerTareas(proyectoActual._id);

        //Reiniciar el form
        setTarea({
            nombre: '',
            descripcion: '',
            fechaInicio: null,
            fechaFin: null
        })

        redirect();

    }

    const fechaActual = new Date();
    let Maxyear = fechaActual.getFullYear() + 10;

    return (
        <IonPage>
			<IonHeader className="ion-no-border">
				<IonToolbar>
					<IonButtons slot="start">
                        <IonBackButton defaultHref="/Proyectos"></IonBackButton>
					</IonButtons>
					Nueva tarea
                    <IonButtons slot="end">
						{mensaje!=="" ? (<Alert msg={mensaje}/>) : null}
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<form onSubmit={agregar}>
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
                            <IonCol sizeXs="12">
                                <IonItem>
                                    <IonLabel position="floating">Fecha Inicio</IonLabel>
                                    <IonDatetime cancelText="Cancelar" doneText="Hecho" max={Maxyear.toString()} name="fechaInicio" value={fechaInicio} onIonChange={handleChange}></IonDatetime>
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXs="12">
                                <IonItem>
                                    <IonLabel position="floating">Fecha fin</IonLabel>
                                    <IonDatetime cancelText="Cancelar" doneText="Hecho" max={Maxyear.toString()} name="fechaFin" value={fechaFin} onIonChange={handleChange}></IonDatetime>
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
 
export default NuevaTarea;