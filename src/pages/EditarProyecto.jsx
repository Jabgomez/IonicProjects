import React, {useContext, useEffect, useState, useCallback} from 'react';
import {NavContext} from '@ionic/react';

import { 
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonGrid,
    IonRow
} from '@ionic/react';

//Context
import proyectoContext from '../context/proyectos/proyectoContext'

//Components
import Alert from '../components/alerts/Alert'

const EditarProyecto = () => {
    const {navigate} = useContext(NavContext);

    const redirect = useCallback(
        () => navigate('/Proyectos', 'back'),
        [navigate]
    );

    //State local
    const [proyectoLocal, setProyectoLocal] = useState({
        nombre: '',
        descripcion: '',
        mensaje: '',
        id: ''
    });

    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, editarProyecto } = proyectosContext;

    const {nombre, descripcion} = proyectoLocal;

    useEffect(()=>{
        if(proyecto) {
            //Array destructuring
            const [proyectoActual] = proyecto;
            const {nombre, descripcion, _id} = proyectoActual;

            if(!descripcion) {
                setProyectoLocal({
                    ...proyectoLocal,
                    nombre: nombre,
                    _id: _id
                })
            }

            setProyectoLocal({
                ...proyectoLocal,
                nombre: nombre,
                descripcion: descripcion,
                _id: _id
            })
        } else {
            redirect();
        }
    },[]);

    //registrar cambios en el state
    const handleChange = e => {
        setProyectoLocal({
            ...proyectoLocal,
            [e.target.name] : e.target.value
        })
    }

    //Cuando el usuario hace click en enviar
    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar Proyecto
        if(nombre === '') {
            setProyectoLocal({
                ...proyectoLocal,
                mensaje: "El nombre es obligatorio"
            });

            setTimeout(() => {
                setProyectoLocal({
                    ...proyectoLocal,
                    mensaje: ""
                });
            }, 5000);

            return;
        }

        //Agregar al state
        const payload = {
            _id: proyectoLocal._id,
            nombre: proyectoLocal.nombre,
            descripcion: proyectoLocal.descripcion
        }
        console.log(proyectoLocal);

        editarProyecto(payload)

        //Reiniciar Form
        setProyectoLocal({
            ...proyectoLocal,
            nombre : '',
            descripcion: '',
            _id: ''
        })

        //Redirigir a la pagina de proyectos
        console.log("redirecting");
        //window.location = '/Proyectos';
    }

    return (         
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    Editar proyecto
                    <IonButtons slot="end">
                        {proyectoLocal.mensaje!=="" ? (<Alert msg={proyectoLocal.mensaje}/>) : null}
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
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
                        <IonButton type="submit" shape="round">Guardar cambios</IonButton>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    );
}
 
export default EditarProyecto;