import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useHr = () => {
            const{user,loading}=useContext(AuthContext);
            const axiosSecure=UseAxiosSecure();
            const {data:isHr, isPending:isHrLoading}=useQuery({
             queryKey:[user?.email,'hr'],
             enabled:!loading,
             queryFn:async()=>{
                         const res=await axiosSecure.get(`/users/hr/${user.email}`)
                         return res.data?.hr
             }
            })
            return[isHr,isHrLoading]
};

export default useHr;