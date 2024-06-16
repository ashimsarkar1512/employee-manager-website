import {  useState } from "react";


import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { imageUpload } from "../../api/utils";
import Swal from "sweetalert2";

const JoinManager = () => {

    const axiosSecure=UseAxiosSecure()


      const[startDate,setStartDate]=useState(new Date())
                

      const onchangeHandler=e=>{
          console.log(e);
          setStartDate(e)
      }
  
              const handleHrSignUp= async event=>{
                          event.preventDefault()
                              const form=event.target;
                              const name=form.name.value;
                              const email=form.email.value;
                              const password=form.password.value;
                              const logo=form.logo.files[0]
                              const image=form.image.files[0]
                          
                              const date=startDate;

                               
                              
                              try{
                                const logo_url=await imageUpload(logo)
                                const image_url=await imageUpload(image)
                                const setManager={
                                            name,
                                            email,
                                            password,
                                            logo:logo_url,
                                            image:image_url,
                                            date

                                            
                                          
                                }
                                
                                console.log(setManager)
                             
                           
                                axiosSecure.post('/users',setManager)
                                .then(res=>{
                                            console.log(res.data);
                                            if(res.data.insertedId){
                                                      
                                                        Swal.fire({
                                                                    position: "top-end",
                                                                    icon: "success",
                                                                    title: " asset is added",
                                                                    showConfirmButton: false,
                                                                    timer: 1500
                                                                  });
                                            }
                                })
                    }catch(err){
                                console.log(err);
                    }
                    
                          }
  

            return (
                       <div>
                           <section className=" mt-6 pb-3 w-3/4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                           <h2 className="text-4xl font-semibold text-center py-5 dark:text-gray-200">Sign Up for HR Manager</h2>
   
    <form onSubmit={handleHrSignUp}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 p-3 ">
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
                <label className="text-gray-700 dark:text-gray-200" >company Name</label>
                <input id="username" type="text" name="companyName" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
            <div>
           <label className="text-gray-700 dark:text-gray-200" >company logo</label>
               <input id="image" type="file" name="logo" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
           </div>
            <div>
           <label className="text-gray-700 dark:text-gray-200" >profile picture</label>
               <input id="image" type="file" name="image" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
           </div>
           <div>
           <label className="label">
                                        <span className="label-text text-gray-700 dark:text-gray-200">Packages</span>
                                    </label>
                <select className="select  w-full max-w-xs" name="type">
             <option disabled selected>Packages</option>
                <option> 5 Members for $5</option>
                    <option> 10 Members for $8</option>
                    <option> 20 Members for $15</option>
                 </select>
            </div>
         
            <div>
            <label className="label">
                                        <span className="label-text text-gray-700 dark:text-gray-200">Date Of Birth</span>
                                    </label>
                <DatePicker selected={startDate} onChange={onchangeHandler} className="input input-bordered w-full"></DatePicker>
            </div>

            
        </div>

        <div className="flex justify-center mt-10 mb-5">
            <button className="px-8 py-3 w-full leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Sign up</button>
        </div>
    </form>
                
</section>   
<div className="text-5xl  justify-center flex ">
                          <SocialLogin></SocialLogin>
                          
                           </div>
                          
                        </div>
            );
};

export default JoinManager;