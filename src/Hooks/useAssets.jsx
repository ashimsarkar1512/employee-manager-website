
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/UseAxiosSecure";

function useAssets() {
  const axiosSecure = useAxiosSecure();

  const {
    data: assets = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const response = await axiosSecure.get("/assets");
      return response.data;
    },
  });

  return { assets, isLoading, refetch, isError, error };
}

export default useAssets;