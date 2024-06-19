import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";



const Profile = () => {
            const{user,}=useContext(AuthContext)
           
            return (
                        <div>
                                <div className="navbar-end">
                        { 
              
              
                 <div className=" mx-auto p-20 ">
                 <img src={user?.photoURL} alt="" />
                 <p className="text-5xl font-semibold mt-5">Name : {user?.displayName}</p>
                 </div>
               

          
             
            
           }
           
                        </div>
                        </div>
            );
};

export default Profile;