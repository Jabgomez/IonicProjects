//State proyecto
const [proyectoLocal, setProyectoLocal] = useState({
    nombre: '',
    descripcion: '',
});

//obtener el state del formulario
const proyectosContext = useContext(proyectoContext);
const {proyecto, editarProyecto} = proyectosContext;

if(!proyecto) {
    window.location = '/Proyectos'
}

const [proyectoActual] = proyecto;

if(proyectoActual.descripcion) {
    setProyectoLocal({
        ...proyectoLocal,
        descripcion: proyectoActual.descripcion
    })
}

setProyectoLocal({
    ...proyectoLocal,
    nombre: proyectoActual.nombre
})

const [mensaje, setMensaje] = useState("")

//Extraer nombre
const { nombre, descripcion} = proyectoLocal; 

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
        setMensaje ('El nombre es obligatorio');

        setTimeout(() => {
            setMensaje ('');
        }, 5000);

        return;
    }

    //Agregar al state
    editarProyecto(proyecto)

    //Reiniciar Form
    setProyectoLocal({
        nombre : '',
        descripcion: ''
    })

    //Redirigir a la pagina de proyectos
    console.log("redirecting");
    window.location = '/Proyectos';
}
return(
    <IonPage>
        <IonHeader className="ion-no-border">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/Proyectos"></IonBackButton>
                </IonButtons>
                Editar proyecto
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
                    <IonButton type="submit" shape="round">Guardar cambios</IonButton>
                </div>
            </form>
        </IonContent>
    </IonPage>
)