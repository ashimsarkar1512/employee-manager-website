import { useEffect, useState } from "react";
import UseAxiosSecure from "./UseAxiosSecure";


const useSorting = (asc) => {
            const[sort,setSort]=useState([])
            const axiosSecure=UseAxiosSecure()
            useEffect(()=>{
                        axiosSecure(`/assets?sort=${asc?'asc':'desc'}`)
                        .then(res=>setSort(res.data))
                
                       },[asc])
            return sort
};

export default useSorting;