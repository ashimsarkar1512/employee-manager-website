import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAssetsRequest = () => {
              
            const axiosPublic=useAxiosPublic()
                         
            const {data:assetsRequest =[],isPending:loading,refetch}=useQuery({
                        queryKey:['menu'],
                        queryFn:async ()=>{
                            const res=await axiosPublic.get('/employee')
                            return res.data
                        }
                    })
                    return [assetsRequest,loading,refetch]
        
};

export default useAssetsRequest;