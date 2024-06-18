import {  useContext, useRef, useState } from "react";


import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/utils";
import { AuthContext } from "../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";



const JoinEmployee = () => {
    const axiosPublic=useAxiosPublic()

    const { createUser } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const formRef = useRef(null);

    const onchangeHandler = e => {
        console.log(e);
        setStartDate(e);
    }

            const handleSignUp= async event=>{
                        event.preventDefault()
                            const form=event.target;
                            const name=form.name.value;
                            const email=form.email.value;
                            const password=form.password.value;
                            const date=startDate;
                            const image=form.image.files[0]
                            
                            try{
                                const result = await createUser(email, password);
            const image_url = await imageUpload(image);

           
            await updateProfile(result.user, {
                displayName: name,
                photoURL: image_url
            });
                                const setEmployee={
                                            name,
                                          email,
                                          password,
                                          date,
                                          image:image_url,
                                          role:'employee'
                                          
                                }
                                
                             
                           
                             
            const res = await axiosPublic.post('/users', setEmployee);
            console.log(res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sign up Employee",
                    showConfirmButton: false,
                    timer: 1500
                });
                formRef.current.reset();
                setStartDate(new Date()); 
            }
        } catch (err) {
            console.error(err);
        }
    }


                       
            return (
                        <div>
                           <section className=" mt-5 pb-6 w-3/4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                           <h2 className="text-4xl font-semibold text-center py-5 dark:text-gray-200">Sign Up for Employee</h2>
   
    <form onSubmit={handleSignUp}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 p-3 ">
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
           <label className="text-gray-700 dark:text-gray-200" >Profile picture</label>
               <input id="image" type="file" name="image" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
           </div>
            <div>

            <label className="label">
                                        <span className="label-text text-gray-700 dark:text-gray-200">Date Of Birth</span>
                                    </label>
                <DatePicker selected={startDate} onChange={onchangeHandler} className="input input-bordered w-full"></DatePicker>
            </div>

            
        </div>

        <div className="flex justify-center mt-6">
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

export default JoinEmployee;