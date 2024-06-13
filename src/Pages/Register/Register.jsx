import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Providers/AuthProvider";




const Register = () => {
    const [registerError,setRegisterError]=useState('')
  const [success,setSuccess]=useState('')
  const [showPassword,setShowPassword]=useState(false);
              
    const {createUser}=useContext(AuthContext);
    const navigate=useNavigate()


    const handleRegister=(event)=>{
    event.preventDefault()
        const form=event.target;
        const name=form.name.value;
        const email=form.email.value;
        const password=form.password.value;
        const photoURL=form.photoURL.value;
        console.log(name,email,photoURL,password);

        if (password.length<6){
            setRegisterError (toast.error('password at list 6 characters'))
            return;
          }
          else if(!/[A-Z]/.test(password)){
            setRegisterError (toast.error('password should be one uppercase'))
            return;
          }
          else if(!/[a-z]/.test(password)){
            setRegisterError (toast.error('password should be one lowercase'))
            return;
          }
             
          setRegisterError('')
          setSuccess(' ')
           createUser(email,password)
           .then((result)=>{
            updateProfile(result.user,{
              displayName:name,
              photoURL:photoURL
          })
            setSuccess(toast.success('register successfully'))
            navigate('/')
           })
           .catch(error=>{
            console.error(error)
            setRegisterError (toast.error(error.message))
           })
          
    }
    
            return (
                        
        <div className='flex mb-28 flex-col lg:flex-row '>
        <div className='w-[80%] mx-auto lg:w-[50%] mt-32'>
            <h1 className="text-2xl font-bold text-center text-green-500 my-5">Register your account</h1>
            <div className='w-full lg:w-[75%] mx-auto '>
                <form onSubmit={handleRegister} className='space-y-5'>
                    <input className='block w-full rounded outline-none border-b-2 focus:border-orange-500 p-4' type="text" name="name"  placeholder='Name' required />
                    <input className='block w-full rounded outline-none border-b-2 focus:border-orange-500 p-4' type="email" name="email"  placeholder='Email' required />
                    <input className='block w-full rounded outline-none border-b-2 focus:border-orange-500 p-4' type={showPassword? "text":"password"} name="password"  placeholder='Password' required />
                    <input className='block w-full rounded outline-none border-b-2 focus:border-orange-500 p-4' type="text" name="photoURL"  placeholder='Profile Picture URL' required />
                    <button className='btn w-full text-white bg-green-500 '>Register</button>
                </form>
                </div>

                <span className="absolute lg:right-1/3 lg:top-[63%]  right-[15%] top-[143%]" onClick={()=>setShowPassword(!showPassword)}>
                {
                   showPassword? <FaEyeSlash></FaEyeSlash>:<FaEye ></FaEye>
                }
                </span>
                <h1 className="font-medium text-center mt-3">Do not have account ? <Link className="text-blue-500 font-semibold" to={'/login'}>log In</Link> </h1>
               
                
        </div>
        <ToastContainer></ToastContainer>
    </div>
            );
};

export default Register;