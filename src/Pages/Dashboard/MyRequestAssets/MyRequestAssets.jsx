import { useContext, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";




const MyRequestAssets = () => {
     const axiosSecure=UseAxiosSecure()
     const { user, loading } =useContext(AuthContext)
     const [assetsStatus, setAssetsStatus] = useState({});
   
     const { data: myAssets = [],refetch } = useQuery({
       queryKey: ["myAsset", user?.email],
       enabled: !loading && !!user?.email,
       queryFn: async () => {
              console.log("Fetching data for:", user?.email);
           const { data } = await axiosSecure.get(`/requestAsset/${user?.email}`);
           return data;
       },
   });

 
  
    console.log(myAssets);

    const handleStatusChange = async (id) => {
       try {
         const response = await axiosSecure.put(`/requestAsset/${id}`, {
           status: "reject",
         });
         if (response.data.success) {
           setAssetsStatus((prevStatus) => ({
             ...prevStatus,
             [id]: "reject",
           }));
           refetch();
         } else {
           console.error('Failed to update status:', response.data.message);
         }
       } catch (error) {
         console.error('Error updating status:', error);
       }
     };
   
     if (loading) {
       return <div>Loading...</div>;
     }

       return (
              <div>

            
              <div className="overflow-x-auto">
<table className="table">
{/* head */}
<thead>
<tr className="text-xl">

<th>#</th>
<th>Assets name</th>
<th>Assets type</th>
<th>Request Date</th>
<th>Approval Date</th>
<th>Request status</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{
myAssets.map((item,index)=><tr key={item._id}>
<td>
              {index+1}
</td>


<td>
{item.asset_name}
</td>
<td>{item.asset_type}</td>
<td>
{item.requestDate}
</td>
<td>
 
</td>
<td>{assetsStatus[item._id] || item.status || "pending"}</td>
<td>
                  {assetsStatus[item._id] !== "reject" && item.status !== "reject" && (
                    <button onClick={() => handleStatusChange(item._id)}>
                      Cancel
                    </button>
                  )}
                </td>

                                                               
</tr>
)         
}


</tbody>


</table>
</div>
              
  </div>
            
       );
};

export default MyRequestAssets;