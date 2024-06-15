import { Link, useNavigate } from "react-router-dom";

import { useContext, } from "react";


import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";




const Register = () => {
  const axiosPublic=useAxiosPublic()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

 

  const{createUser,updateUserProfile}=useContext(AuthContext)
  const navigate=useNavigate()

  const onSubmit= (data) => {
              
              console.log(data)
              createUser(data.email,data.password)
              .then(result =>{
                          const loggedUser=result.user;
                          console.log(loggedUser);
                          updateUserProfile(data.name,data.photoURL)
                          .then(()=>{
                             const userInfo={
                              name:data.name,
                              email:data.email
                             }
                            axiosPublic.post('/users',userInfo)
                            .then(res=>{
                              if(res.data.insertedId){
                                reset()
                            Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "update successfully",
                              showConfirmButton: false,
                              timer: 1500
                            });
                            navigate('/')

                              }
                            })
                            
                          })
                          .catch(error=> console.log(error))
              })

  }
    
            return (
                        
        <div className='flex mb-28 flex-col lg:flex-row '>
        <div className='w-[80%] mx-auto lg:w-[50%] mt-32'>
            <h1 className="text-2xl font-bold text-center text-green-500 my-5">Register your account</h1>
            <div className='w-full lg:w-[75%] mx-auto '>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered"/>
                                {errors.name && <span className="text-red-700">This field is required</span>}
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })}  placeholder="Photo URL" className="input input-bordered"/>
                                {errors.photoURL && <span className="text-red-700">photoURl is required</span>}
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="email" name="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-700">This field is required</span>}
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password",{ required: true, minLength:6, maxLength: 20,
                                pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/


                                   
                                 })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type==='minLength' && <span className="text-red-700">password must be 6 characters</span>}
                                {errors.password?.type==='maxLength' && <span className="text-red-700">password less then 20 characters</span>}
                                {errors.password?.type==='pattern' && <span className="text-red-700">one uppercase ,one lowercase,</span>}
                                <label className="label">
                                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                              </div>
                    <button className='btn w-full text-white bg-green-500 '>Register</button>
                </form>
                </div>

                <h1 className="font-medium text-center mt-3">Do not have account ? <Link className="text-blue-500 font-semibold" to={'/login'}>log In</Link> </h1>
               
                
        </div>

    </div>
            );
};

export default Register;