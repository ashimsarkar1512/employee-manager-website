
import useAsset from "../../../Hooks/useAsset";
import { FcApproval } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";




const AllRequest = () => {
        const [requestAssets]=useAsset()
            return (
                <div>

            
                <div className="overflow-x-auto">
  <table className="table">
  {/* head */}
  <thead>
  <tr>
  
  <th>#</th>
  <th>Name</th>
  <th>Type</th>
  <th>Email of requester</th>
  <th>Name of requester</th>
  <th>Requested date</th>
  <th>Additional note</th>
  <th>Status</th>
  <th>Approve </th>
  <th>Reject</th>
  </tr>
  </thead>
  <tbody>
  {
  requestAssets.map((item,index)=><tr key={item._id}>
  <td>
                {index+1}
  </td>
  
  
  
  <td>{item.asset_name}</td>
  <td>
   {item.asset_type}
  </td>
  <td>
   {item.email}
  </td>
  <td>
{item.requesterName}
  </td>
  <td>
 {item.requestDate}
  </td>
  <td>
  {item.requestNotes}
  </td>
  <td>
        {item.status}
  </td>
  <td>
 
 <button className="btn btn-circle btn-outline">
 <FcApproval className="text-2xl"></FcApproval>
</button>
  </td>
  <td>
  <button className="btn btn-circle btn-outline">
 <FcDisapprove  className="text-2xl"></FcDisapprove>
</button>
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

export default AllRequest;