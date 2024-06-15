import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAsset = () => {
            const axiosPublic=useAxiosPublic()
           
            const {data:assets =[],isPending:loading,refetch}=useQuery({
                queryKey:['menu'],
                queryFn:async ()=>{
                    const res=await axiosPublic.get('/assets')
                    return res.data
                }
            })
            return [assets,loading,refetch]
};

export default useAsset;