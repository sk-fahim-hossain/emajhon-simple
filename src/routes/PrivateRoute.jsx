import React, { useContext } from 'react';
import { AuthContext } from '../components/Providers/AuthProviders';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation()

    console.log(location)
    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{from:location}} replace></Navigate>;
};

export default PrivateRoute;