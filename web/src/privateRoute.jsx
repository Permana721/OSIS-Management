import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Harap login terlebih dahulu");
        return <Navigate to="/admin/login" />;
    }

    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;