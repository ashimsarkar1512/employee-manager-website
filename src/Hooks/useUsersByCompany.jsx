import { useQuery } from "@tanstack/react-query";

import useUserData from "./useUserData";
import UseAxiosSecure from "./UseAxiosSecure";

function useUsersByCompany() {
    const { userData } = useUserData();
    const companyName = userData?.company_name;
    const axiosSecure = UseAxiosSecure();
  
    const {
      data: usersByCompany = [],
      isLoading,
      refetch,
      isError,
      error,
    } = useQuery({
      queryKey: ["usersByCompany", companyName],
      queryFn: async () => {
        if (!companyName) return [];
        const response = await axiosSecure.get(
          `users/company/${userData?.company_name}`
        );
        return response.data;
      },
      enabled: !!companyName,
    });
  
    return { usersByCompany, isLoading, refetch, isError, error };
  }
  
  export default useUsersByCompany;