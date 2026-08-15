import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);

    //If no logged-in user exists, rediretm to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    //Render the child routes if user is authenticated
    return <Outlet />;
};

export default ProtectedRoute;