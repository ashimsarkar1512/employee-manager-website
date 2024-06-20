import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import useEmployee from "../../Hooks/useEmployee";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import SectionTitle from "../SectionTitle/SectionTitle";



const PendingRequest = () => {
  const axiosSecure = UseAxiosSecure();
      
   const {userDataEmployee,}=useEmployee()
   const {loading}=useContext(AuthContext)
   const {data:pending=[]}=useQuery({
    queryKey:['pendingRequest',userDataEmployee?.email],
    enabled:!loading && !!userDataEmployee?.email,
    queryFn:async()=>{
      const {data}=await axiosSecure.get(`/requestAsset/${userDataEmployee?.email}`);
      return data;
    }
   })

    console.log(pending);









            // // Use useQuery to fetch assets with status 'pending'
            // const { data: pending = [], isLoading, error } = useQuery({
            //   queryKey: ['pending'],
            //   queryFn: async () => {
            //     const res = await axiosSecure.get('/requestAsset/pending');
            //     return res.data;
            //   }
            // });
          
            // if (isLoading) return <div>Loading...</div>;
            // if (error) return <div>Error: {error.message}</div>;
          
            // console.log(pending);
          
            return (
                        <div>
                                <SectionTitle heading='Pending Request'></SectionTitle>

                                <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl">
              <th>#</th>
              <th>Assets name</th>
              <th>Assets type</th>
              <th>Stock status</th>
              <th>Action</th>
            </tr>
          </thead>
          <hr/>
          <tbody>
            {pending.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.asset_name}</td>
                <td>{item.asset_type}</td>
                <td>{item.requestDate}</td>
                <td>
                
                  {item.requestNotes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>      
                        </div>
            );
};

export default PendingRequest;