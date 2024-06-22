import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";



const LogOut = () => {
            const {logOut}=useContext(AuthContext)
            
            const handleLogout = () => {
                        logOut()
                          .then(() => { })
                          .catch(error => console.log(error))
                          

                      }
            return (
                        <div>
                           <button onClick={handleLogout}>Logout</button>         
                        </div>
            );
};

export default LogOut;