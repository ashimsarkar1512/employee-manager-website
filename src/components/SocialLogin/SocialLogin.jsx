import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const SocialLogin = () => {

            const {googleLogin}=useContext(AuthContext)
            const axiosPublic=useAxiosPublic();
            const navigate=useNavigate()
            const handleGoogleLogin=()=>{
                        googleLogin()
                        .then(result=>{
                                    console.log(result.user);
                                    const userInfo={
                                      email:result.user?.email,
                                      name:result.user?.displayName
                                    }

                                    axiosPublic.post('/users',userInfo)
                                    .then(res=>{
                                      console.log(res.data);
                                      navigate('/')
                                    })
                        })

            }
            return (
                        <div className="p-6">
                        
               <button onClick={handleGoogleLogin} className="btn">
                 <FaGoogle></FaGoogle> 
                 Google          
               </button>   
            </div>
            );
};

export default SocialLogin;