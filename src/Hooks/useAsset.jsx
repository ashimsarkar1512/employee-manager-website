import { useQuery } from "@tanstack/react-query";

import UseAxiosSecure from "./UseAxiosSecure";


const useAsset = () => {
            const axiosSecure=UseAxiosSecure()
           
            const {data:requestAssets =[],isPending:loading,refetch}=useQuery({
                queryKey:['menu'],
                queryFn:async ()=>{
                    const res=await axiosSecure.get('/requestAsset')
                    return res.data
                }
            })
            return [requestAssets,loading,refetch]
};

export default useAsset;