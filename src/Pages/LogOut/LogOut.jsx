import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";




const LogOut = () => {
            const {logOut}=useContext(AuthContext)
            const navigate = useNavigate(); 
            
            const handleLogout = () => {
                        logOut()
                          .then(() => { navigate('/')})
                          .catch(error => console.log(error))
                          

                      }
            return (
                        <div>
                           <button onClick={handleLogout}>Logout</button>         
                        </div>
            );
};

export default LogOut;