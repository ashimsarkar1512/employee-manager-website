import { useQuery } from "@tanstack/react-query";

import UseAxiosSecure from "./UseAxiosSecure";


const useAsset = () => {
            const axiosSecure=UseAxiosSecure()
           
            const {data:assets =[],isPending:loading,refetch}=useQuery({
                queryKey:['menu'],
                queryFn:async ()=>{
                    const res=await axiosSecure.get('/assets')
                    return res.data
                }
            })
            return [assets,loading,refetch]
};

export default useAsset;