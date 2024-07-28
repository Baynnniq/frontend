import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user, loading } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                loading ? (
                    <div>Loading...</div>
                ) : user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
