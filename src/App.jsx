import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

//Global CSS
import './theme/css/style.scss';

// Components
import Menu from './components/Menu';
import Login from './pages/Login';
import Home from './pages/Home';
import Proyectos from './pages/Proyectos';
import Register from './pages/Register';
import Tareas from './pages/Tareas';
import NuevoProyecto from './pages/NuevoProyecto';
import EditarProyecto from './pages/EditarProyecto';
import NuevaTarea from './pages/NuevaTarea';
import EditarTarea from './pages/EditarTarea';
import Perfil from './pages/Perfil';
import EditarUsuario from './pages/EditarUsuario';

import HideRoute from './components/hinder/HideRoute';
import RedirectAuth from './components/hinder/RedirectAuth';

//Context
import AuthState from './context/autenticacion/authState'
import AlertaState from './context/alertas/alertaState'
import ProyectoState from './context/proyectos/proyectoState'
import TareaState from './context/tareas/tareaState'
import UsuarioState from './context/usuarios/usuarioState'



const App = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <AlertaState>
          <AuthState>
            <UsuarioState>
              <ProyectoState>
                <TareaState>
                  <IonSplitPane contentId="main">
                    <Menu/>
                    <IonRouterOutlet id="main">
                      <RedirectAuth path="/Login" component={Login} exact />
                      <RedirectAuth path="/Home" component={Home} exact />
                      <RedirectAuth path="/Register" component={Register} exact />
                      <HideRoute path="/Proyectos" component={Proyectos} exact />
                      <HideRoute path="/Tareas" component={Tareas} exact />
                      <HideRoute path="/NuevoProyecto" component={NuevoProyecto} exact />
                      <HideRoute path="/EditarProyecto" component={EditarProyecto} exact />
                      <HideRoute path="/NuevaTarea" component={NuevaTarea} exact />
                      <HideRoute path="/EditarTarea" component={EditarTarea} exact />
                      <HideRoute path="/Perfil" component={Perfil} exact />
                      <HideRoute path="/EditarUsuario" component={EditarUsuario} exact />

                      <Redirect from="/" to="/Home" exact />
                    </IonRouterOutlet>
                  </IonSplitPane>
                </TareaState>
              </ProyectoState>
            </UsuarioState>
          </AuthState>
        </AlertaState>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
