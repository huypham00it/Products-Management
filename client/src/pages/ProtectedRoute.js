import React from 'react';
import {Navigate} from 'react-router-dom';
import {useStateValue} from '../context/StateContext'

const ProtectedRoute = ({children}) => {

    const {user} = useStateValue();

    if(!user){
        return <Navigate to="/" />;
    }
    return <>{children}</>;
}

export default ProtectedRoute