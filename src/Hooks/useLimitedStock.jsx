
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUserData from "./useUserData";

function useLimitedStock() {
    const { userData } = useUserData();
    const axiosPublic = useAxiosPublic();
  
    const {
      data: assets = [],
      isLoading,
      refetch,
      isError,
      error,
    } = useQuery({
      queryKey: ["limited-stock", userData?.company_name],
      queryFn: async () => {
        const response = await axiosPublic.get(
          `/assets/limited-stock/${userData?.company_name}`
        );
        return response.data;
      },
      enabled: !!userData?.company_name,
    });
  
    return { assets, isLoading, refetch, isError, error };
  }
  
  export default useLimitedStock;