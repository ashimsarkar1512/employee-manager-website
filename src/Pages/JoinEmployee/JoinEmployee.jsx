import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";


const JoinEmployee = () => {
    const [success,setSuccess]=useState('')
    const {   googleLogin}=useContext(AuthContext);
    const location=useLocation();
    const navigate=useNavigate();
                
            const handleSignUp=(event)=>{
                        event.preventDefault()
                            const form=event.target;
                            const name=form.name.value;
                            const email=form.email.value;
                            const password=form.password.value;
                            const date=form.date.value;
                            
                            console.log(name,email,password,date);
                        }


                        const handleSocialLogin =socialProvider=>{
                            socialProvider()
                            .then(result=>{
                              if(result.user){
                                setSuccess(toast.success("login successfully "))
                                setTimeout(()=>{
                                  navigate(location?.state? location.state:'/')
                                },2000);
                              }
                            
                            })
                          }
            return (
                        <div>
                           <section className="max-w-5xl mt-16 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
   
    <form onSubmit={handleSignUp}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-gray-700 dark:text-gray-200" >Full Name</label>
                <input id="username" type="text" name="name" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" >Email</label>
                <input id="emailAddress" type="email" name="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                        
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" >Password</label>
                <input id="password" type="password" name="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" >Date of Birth</label>
                <input id="date" type="text" name="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            
        </div>

        <div className="flex justify-center mt-10">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Sign up</button>
        </div>
    </form>
                
</section>   
<div className="text-5xl mt-10  justify-center flex gap-10 ">
                           <button   onClick={()=>handleSocialLogin(googleLogin)} > <FcGoogle ></FcGoogle></button>
                          
                           </div>
                           <ToastContainer></ToastContainer>   
                        </div>
            );
};

export default JoinEmployee;