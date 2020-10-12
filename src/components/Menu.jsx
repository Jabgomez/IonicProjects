import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote
} from '@ionic/react';

import { 
  person,
  logOut,
  home,
  informationCircle,
  reader
} from 'ionicons/icons';


import React, {useContext} from 'react';
import { useLocation } from 'react-router-dom';

import './Menu.css';

//Components
import AuthContext from '../context/autenticacion/authContext'
import proyectoContext from '../context/proyectos/proyectoContext'
import tareaContext from '../context/tareas/tareaContext'

import Listado from './proyectos/Listado'

const appPages = [
  {
    title: 'Mi perfil',
    url: '/Perfil',
    iosIcon: person,
    mdIcon: person
  },
  {
    title: 'Acerca de Projects',
    url: '/Info',
    iosIcon: informationCircle,
    mdIcon: informationCircle
  },
  {
    title: 'Términos y condiciones',
    url: '/Terminos',
    iosIcon: reader,
    mdIcon: reader
  },
  {
    title: 'Home',
    url: '/Proyectos',
    iosIcon: home,
    mdIcon: home
  }
  
];

const Menu = () => {
  const location = useLocation();

  //Importar context
  const authContext = useContext(AuthContext);
  const { usuario, cerrarSesion } = authContext;

  const proyectosContext = useContext(proyectoContext);
  const { proyectos, resetProyecto} = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {resetTarea} = tareasContext;

  const onCerrarSesion = () => {
    resetTarea();
    resetProyecto();
    cerrarSesion();
  } 

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          {
            usuario ? 
              <>
                <IonListHeader><span>Hola, &nbsp;</span>{usuario.nombre}</IonListHeader>
                <IonNote>{usuario.email}</IonNote>
              </>
            : 
              null
          }
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}

          <IonMenuToggle autoHide={false}>
            <IonItem lines="none" detail={false} button onClick={()=>{onCerrarSesion();}}>
              <IonIcon slot="start" md={logOut}></IonIcon>
              <IonLabel>Cerrar sesión</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Mis proyectos</IonListHeader>
          {proyectos.length === 0 ? 
						<div className="ion-text-center ion-padding-top">
							<p>Sin proyectos.</p>
              <IonButton shape="round" routerLink="/NuevoProyecto">Nuevo Proyecto</IonButton>
						</div>
          :
            <div className="ion-text-center">
              <IonButton shape="round" routerLink="/NuevoProyecto">Nuevo Proyecto</IonButton>
              <Listado proyectos={proyectos}/>
            </div>
					}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
