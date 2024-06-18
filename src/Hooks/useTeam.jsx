import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTeam = () => {
          
            const axiosPublic=useAxiosPublic()
                         
            const {data:myTeam =[]}=useQuery({
                        queryKey:['myTeam'],
                        queryFn:async ()=>{
                            const res=await axiosPublic.get('/users')
                            return res.data
                        }
                    })
                    return [myTeam]
};

export default useTeam;