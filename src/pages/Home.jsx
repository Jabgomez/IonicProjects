import React from 'react';

import {
    logIn,
    key
} from 'ionicons/icons'

import { 
    IonContent,
    IonPage,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon
} from '@ionic/react';

import './Home.scss';

const Home = () => {
    return (
        <IonPage>
          <IonContent className="bg-content">
            <IonText className="ion-padding">
                <h1>Bienvenido.</h1>
                <p>Inicia sesión u obtén tu <br/> nueva cuenta.</p>
            </IonText>
            <div className="bg"></div>
            <div className="svg-bg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fillOpacity="1" d="M0,256L60,261.3C120,267,240,277,360,261.3C480,245,600,203,720,165.3C840,128,960,96,1080,90.7C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            </div>
            <div className="actions">
                <IonGrid className="ion-margin">
                    <IonRow>
                        <IonCol>
                            <IonButton routerLink="/Login" expand="full" shape="round" className="btn" color="dark">
                                    <IonIcon slot="start" icon={logIn} />
                                    <p>Ingresar</p>         
                            </IonButton>  
                        </IonCol>
                        <IonCol>
                            <IonButton routerLink="/Register" expand="full" shape="round" className="btn" color="light">
                                <IonIcon slot="start" icon={key} />
                                <p>Registro</p> 
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
          </IonContent>
        </IonPage>
      );
}
 
export default Home;