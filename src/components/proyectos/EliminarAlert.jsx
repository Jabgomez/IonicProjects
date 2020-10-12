import React, {useContext, useCallback} from 'react';
import {NavContext} from '@ionic/react';
import { IonAlert } from '@ionic/react';

//Context
import proyectoContext from '../../context/proyectos/proyectoContext'


const EliminarAlert = (props) => {
	const {navigate} = useContext(NavContext);

    const redirect = useCallback(
        () => navigate('/Proyectos', 'back'),
        [navigate]
      );

    const {showAlert, setShowAlert} = props;

    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext; 

    //Array destructuring
    const [proyectoActual] = proyecto;

    return (  
        <IonAlert
			isOpen={showAlert}
			onDidDismiss={() => setShowAlert(false)}
			cssClass='my-custom-class'
			header={'Eliminar proyecto'}
			message={'¿Está seguro que desea eliminar este proyecto? Esta acción no puede deshacerse'}
			buttons={[
				'Cancelar',
				{
					text: 'Eliminar',
					cssClass: 'danger',
					handler: () => {
						eliminarProyecto(proyectoActual._id);
						redirect();
					}
				}
        	]}
        />
    );
}
 
export default EliminarAlert;