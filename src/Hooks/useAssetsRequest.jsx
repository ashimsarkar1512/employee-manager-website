import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
// import { useState } from "react";


const useAssetsRequest = () => {
              
            const axiosPublic=useAxiosPublic()
                         
            const {data:assetsRequest =[],isPending:loading,refetch}=useQuery({
                        queryKey:['assetsRequest'],
                        queryFn:async ()=>{
                            const res=await axiosPublic.get('/products')
                            return res.data
                        }
                    })
                    return [assetsRequest,loading,refetch]


    //         const [search, setSearch] = useState('');
    // const axiosPublic = useAxiosPublic();

    // const { data: assetsRequest = [], isLoading: loading, refetch } = useQuery(
    //     ['assetsRequest', search],
    //     async () => {
    //         const res = await axiosPublic.get(`/products?search=${search}`);
    //         return res.data;
    //     },
    //     {
    //         enabled: !!search, // Only fetch if search term is not empty
    //     }
    // );

    // return { assetsRequest, loading, refetch, setSearch };

        
};

export default useAssetsRequest;