// Example: useAnHR.jsx

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

function useAnHR() {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { data: isHR, isLoading: isHRLoading, error: isHRError } = useQuery({
        queryKey: [user?.email, "hr"],
        enabled: !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const token = localStorage.getItem("access-token");
            const res = await axiosPublic.get(`/users/hr/${user?.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return res.data?.hr;
        }
    });

    if (isHRError) {
        console.error("Error fetching HR status:", isHRError);
    }

    return { isHR, isHRLoading };
}

export default useAnHR;
