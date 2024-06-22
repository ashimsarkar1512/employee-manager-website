import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

function useRequestedAssets() {
    const axiosPublic = useAxiosPublic();
  
    const {
      data: requestedAssets = [],
      isLoading,
      refetch,
      isError,
      error,
    } = useQuery({
      queryKey: ["requestedAssets"],
      queryFn: async () => {
        const response = await axiosPublic.get("/requestAsset");
        return response.data;
      },
    });
  
    return { requestedAssets, isLoading, refetch, isError, error };
  }
  
  export default useRequestedAssets;