import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";


const Navbar = () => {
            const{user,logOut}=useContext(AuthContext)
            const handleLogout = () => {
                        logOut()
                          .then(() => { })
                          .catch(error => console.log(error))
                      }
            
            const navLinks=<>
             <li ><NavLink  className={({ isActive }) => (isActive ? 'text-xl text-orange-500 font-medium' : 'text-xl')} to='/'>Home</NavLink></li>
             <li ><NavLink  className={({ isActive }) => (isActive ? 'text-xl text-orange-500 font-medium' : 'text-xl')} to='/employee'>Join Us Employee</NavLink></li>
             <li ><NavLink  className={({ isActive }) => (isActive ? 'text-xl text-orange-500 font-medium' : 'text-xl')} to='/manager'>Join Us HR Manager</NavLink></li>
             <li ><NavLink  className={({ isActive }) => (isActive ? 'text-xl text-orange-500 font-medium' : 'text-xl')} to='dashboard'>Navbar</NavLink></li>

             
            </>
            return (
                        <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl ">
                        <div className="navbar-start">
                          <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                             navLinks
                               }
                            </ul>
                          </div>
                          <a className="btn btn-ghost text-xl">daisyUI</a>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                          <ul className="menu menu-horizontal px-1">
                          {
                              navLinks
                              }
                          </ul>
                        </div>
                        <div className="navbar-end">
                        { user?
               <div className="dropdown dropdown-end">
               <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                 <div className="w-10 rounded-full">
                 <img className="w-8 rounded-full" src={user?.photoURL} alt="" />
                 </div>
               </div>
               <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              
                 <li ><button onClick={handleLogout}>Logout</button></li>
               </ul>
             </div>
             :
             <Link to='/login'><button className=" px-4 py-2 rounded-md  border bg-white text-black">Login</button></Link>
            
           }
           
                        </div>
                      </div>
            );
};

export default Navbar;