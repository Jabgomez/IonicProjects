import React, {useContext, useEffect, useState} from 'react';

import { 
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButtons,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonGrid,
    IonRow,
    IonDatetime,
    IonBackButton,
    IonSelect,
    IonSelectOption
} from '@ionic/react';

//Context
import AuthContext from '../context/autenticacion/authContext';
import UsuarioContext from '../context/usuarios/usuarioContext';


//Components
import Alert from '../components/alerts/Alert';
import ToastUsuarios from '../components/usuarios/ToastUsuarios';

const EditarUsuario = () => {

    //Importar context
    const authContext = useContext(AuthContext);
    const { usuario, cerrarSesion } = authContext;
    
    const usuarioContext = useContext(UsuarioContext);
    const { editarUsuario } = usuarioContext;

    //State local
    const [usuarioLocal, setUsuarioLocal] = useState({
        nombre: '',
        descripcion: '',
        cargo: '',
        avatar: '',
        fechaNac: ''
    });

    const avatarList = [
        "african-man.png",
        "african-woman",
        "arab-woman",
        "arab",
        "batman",
        "black-panther",
        "black-suit",
        "chaplin",
        "dalai-lama",
        "developer",
        "gandhi",
        "girl",
        "indian-woman",
        "indian",
        "japanese-man",
        "japanese-woman",
        "luis-suarez",
        "man",
        "native-woman",
        "native",
        "neymar",
        "nikola-tesla",
        "obama",
        "punk-woman",
        "punk",
        "robot-01",
        "robot-02",
        "robot-03",
        "ronaldo",
        "worker"
    ];

    //state del formulario y del toast notification
    const [mensaje, setMensaje] = useState("");
    const [disable, setDisable] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(()=>{
        if(usuario){
            setUsuarioLocal(usuario);
        }

    },[usuario])

    const {nombre, descripcion, cargo, avatar, fechaNac} = usuarioLocal;

    //registrar cambios en el state
    const handleChange = e => {
        setUsuarioLocal({
            ...usuarioLocal,
            [e.target.name] : e.target.value
        })
    }

    //Funcion para manipular el toast
    const handleToast = (bool) => {
        setShowToast(bool);
    }

    const onSubmitEditar = e => {
        e.preventDefault();

        //Validar
        if(nombre.trim() === '') {
            setMensaje ('El nombre es obligatorio');

            setTimeout(() => {
                setMensaje ('');
            }, 5000);
            return;
        }
        
        //Eliminamos el email del json a enviar
        delete usuarioLocal.email;

        editarUsuario(usuarioLocal);

        //Reiniciar el form
        setUsuarioLocal({
            nombre: '',
            descripcion: '',
            cargo: '',
            avatar: '',
            fechaNac: ''
        })

        setShowToast(true);
        setDisable(true);

        setTimeout(() => {
            setDisable(false);
            cerrarSesion();
        }, 2000);
    }

    return (         
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/Proyectos"></IonBackButton>
                    </IonButtons>
                    Editar perfil
                    <IonButtons slot="end">
                        {mensaje!=="" ? (<Alert msg={mensaje}/>) : null}
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <form onSubmit={onSubmitEditar}>
                    <IonGrid>
                        <IonRow>
                            <IonCol sizeXs="12">
                                <IonItem>
                                    <IonLabel position="floating">Nombre</IonLabel>
                                    <IonInput type="text" disabled={disable} name="nombre" value={nombre} onIonChange={handleChange}></IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXs="12">
                                <IonItem>
                                    <IonLabel position="floating">Descripción</IonLabel>
                                    <IonTextarea maxlength="200" autoGrow="true" disabled={disable} name="descripcion" value={descripcion} onIonChange={handleChange}></IonTextarea>
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXs="12">
                                <IonItem>
                                    <IonLabel position="floating">Cargo</IonLabel>
                                    <IonInput type="text" name="cargo" disabled={disable} value={cargo} onIonChange={handleChange}></IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXs="12">
                                <IonItem>
                                    <IonLabel position="floating">Avatar</IonLabel>
                                    <IonSelect disabled={disable} interface="popover" name="avatar" value={avatar} placeholder="Seleccione avatar" onIonChange={handleChange}>
                                        {
                                            avatarList.map((avatarItem, index)=>(
                                                <IonSelectOption value={avatarItem} key={index}>{avatarItem}</IonSelectOption>
                                            ))
                                        }
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXs="12">
                                <IonItem>
                                    <IonLabel position="floating">Fecha da nacimiento</IonLabel>
                                    <IonDatetime max="2005" disabled={disable} name="fechaNac" value={fechaNac} onIonChange={handleChange}></IonDatetime>
                                </IonItem>
                            </IonCol>
                        </IonRow>    
                    </IonGrid>
                    <div className="ion-text-center">
                        <IonButton type="submit" disabled={disable} shape="round">Guardar cambios</IonButton>
                        <ToastUsuarios showToast={showToast} setShowToast={handleToast}/>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    );
}
 
export default EditarUsuario;