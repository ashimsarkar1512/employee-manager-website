import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router-dom";


const Profile = () => {
            const{user,logOut}=useContext(AuthContext)
            const handleLogout = () => {
                        logOut()
                          .then(() => { })
                          .catch(error => console.log(error))
                      }
            return (
                        <div>
                                <div className="navbar-end">
                        { user?
               <div className="dropdown dropdown-end">
               <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                 <div className="w-10 rounded-full">
                 <img className="w-8 rounded-full" src={user?.photoURL} alt="" />
                 </div>
               </div>
               <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              
                 <li className=" text-red-500"><button onClick={handleLogout}>Logout</button></li>
               </ul>
             </div>
             :
             <Link to='/login'><button className=" px-4 py-2 rounded-md  border bg-white text-black">Login</button></Link>
            
           }
           
                        </div>
                        </div>
            );
};

export default Profile;