import { useContext, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";


const Login = () => {


  const navigate=useNavigate()
  


            const [showPassword,setShowPassword]=useState(false);
          
              const {  signInUser}=useContext(AuthContext);
          
          
              const handleLogin=(event)=>{
              event.preventDefault()
                  const form=event.target;
                  
                  const email=form.email.value;
                  const password=form.password.value;
                  console.log(email,password);
          
                  signInUser(email,password)
                  .then(result=>{
                              const user=result.user;
                              console.log(user);
                              Swal.fire({
                                title: "user login successfully",
                                showClass: {
                                  popup: `
                                    animate__animated
                                    animate__fadeInUp
                                    animate__faster
                                  `
                                },
                                hideClass: {
                                  popup: `
                                    animate__animated
                                    animate__fadeOutDown
                                    animate__faster
                                  `
                                }
                              });
                              navigate('/');
                            
                  })
                  
                    
              }
              
            
            return (
                        <div>
                                    <div className='flex mb-52 flex-col lg:flex-row '>
                        <div className='w-[80%] mx-auto lg:w-[50%] mt-32 '>
                            <h1 className="text-2xl font-bold text-center text-green-500 my-5">Log in to your account</h1>
                            <div className='w-full lg:w-[75%] mx-auto '>
                                <form onSubmit={handleLogin}  className='space-y-10'>
                                    <input className='block w-full rounded outline-none border-b-2 focus:border-orange-500 p-4' type="email" name="email" id="" placeholder='Email' required />
                                    <input className='block w-full rounded outline-none border-b-2 focus:border-orange-500 p-4' type="password" name="password" id="" placeholder='Password' required />
                                    <button className='btn w-full text-white text-xl  bg-green-600 '>Log in</button>
                                </form>
                                < hr className='mt-5' />
                                <span className="absolute lg:right-1/3 lg:top-[63%]  right-[15%] top-[143%]" onClick={()=>setShowPassword(!showPassword)}>
                {
                   showPassword? <FaEyeSlash></FaEyeSlash>:<FaEye ></FaEye>
                }
                </span>
            
                            </div>
                           <div className="text-5xl flex ml-28 lg:ml-64 md:ml-64">
                          <SocialLogin></SocialLogin>
                          
                           </div>
                    <h1 className="font-medium text-center mt-5">Do not have account ? <Link className="text-blue-500 font-semibold" to={'/register'}>Register</Link> </h1>
                      
                        </div>
                      
                    </div>      
                        </div>
            );
};

export default Login;