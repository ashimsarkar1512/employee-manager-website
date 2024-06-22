// import { useContext } from "react";
// import { AuthContext } from "../../Providers/AuthProvider";
// import { Navigate, useLocation } from "react-router-dom";


// const PrivateRoutes = ({children}) => {
//             const {user,loading}=useContext(AuthContext)
//             const location=useLocation()
//             if(loading){
//                         return <progress className="progress w-56"></progress>
//             }
//             if(user){
//                         return children
//             }
//             return <Navigate to='/login' state={{from:location}} replace></Navigate>
// };

// export default PrivateRoutes;

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import PropTypes from "prop-types";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if(loading){
                                   return <progress className="progress w-56"></progress>
                      }
  
  if (!user) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
