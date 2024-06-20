import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";



const Profile = () => {
            const{user,}=useContext(AuthContext)
           
            return (
                        <div>
                                
                        { 
              
              
                //  <div className=" mx-auto p-20 ">
                //  <img src={user?.photoURL} alt="" />
                //  <p className="text-5xl font-semibold mt-5">Name : {user?.displayName}</p>
                //  </div>


                <div className="w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <img className="object-cover w-full h-64" src={user.photoURL} alt="avatar" />
                <div className="py-5 text-center">
                 
                  <span className="text-sm text-gray-700 dark:text-gray-200">{user.displayName}</span>
                 <div> 
                         <span className="text-sm text-gray-700 my-10 dark:text-gray-200">{user.email}</span>
                 </div>
                </div>


                

              </div>
            
          
             
            
                  }
           
                        </div>
                      
            );
};

export default Profile;