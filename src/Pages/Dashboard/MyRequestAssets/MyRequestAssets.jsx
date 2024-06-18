import { useContext } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";




const MyRequestAssets = () => {
     const axiosSecure=UseAxiosSecure()
     const { user, loading } =useContext(AuthContext)

     const { data: myAssets = [] } = useQuery({
       queryKey: ["myAssets", user?.email],
       enabled: !loading && !!user?.email,
       queryFn: async () => {
              console.log("Fetching data for:", user?.email);
           const { data } = await axiosSecure.get(`/requestAsset/${user?.email}`);
           return data;
       },
   });

 
  
    console.log(myAssets);

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

</td>
<td>

</td>
<td>

</td>
<td>

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