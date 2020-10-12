import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext'

const RedirectAuth= ({component: Component, ...props}) => {

    const authContext = useContext(AuthContext);
    const {autenticado} = authContext;

    return(
        <Route {...props} render = { props => autenticado ? (
            <Redirect to="/Proyectos"/>
        ) : (
            <Component {...props}/>
        ) } />
    );
}
 
export default RedirectAuth;