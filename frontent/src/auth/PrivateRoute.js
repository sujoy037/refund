import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './index';

const PrivateRoute = ({ element: Element, ...rest }) => {
    return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
