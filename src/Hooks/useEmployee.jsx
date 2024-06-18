import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useEmployee = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } =useContext(AuthContext)

    const { data: userDataEmployee = [], isLoading, refetch: refetchEmployee } = useQuery({
        queryKey: ["userDataEmployee"],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`);
            return data;
        },

    });

 
    return { userDataEmployee, isLoading, refetchEmployee }
};

export default useEmployee