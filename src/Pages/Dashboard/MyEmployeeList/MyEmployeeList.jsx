import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";


const MyEmployeeList = () => {
          const axiosSecure=UseAxiosSecure()
       const {data:users=[]}=useQuery({
           queryKey:['users'], 
           queryFn:async ()=>{
              const res=await axiosSecure.get('/users')
              return res.data
           }  
       })
            return (
                        <div>
                               <h2>my employee list</h2>     
                        </div>
            );
};

export default MyEmployeeList;