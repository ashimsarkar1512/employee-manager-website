import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import useUserData from "../Hooks/useUserData";

function useDeleteAsset(refetch) {
    const axiosSecure = useAxiosSecure();
    const { userData } = useUserData();
  
    const mutation = useMutation({
      mutationFn: async (id) => {
        const config = {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        };
        const response = await axiosSecure.delete(`/assets/${id}`, config);
        return response.data;
      },
      onSuccess: () => {
        refetch();
      },
    });
  
    return mutation;
  }
  
  export default useDeleteAsset;