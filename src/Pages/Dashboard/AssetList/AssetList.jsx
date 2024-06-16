
import { Link } from "react-router-dom";
import useAsset from "../../../Hooks/useAsset";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AssetList = () => {
       const [assets,refetch]=useAsset()

       const axiosSecure=UseAxiosSecure()
        

       const handleDeleteItem=id=>{
              Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!"
                        }).then(async (result) => {
                          if (result.isConfirmed) {
                                      const res=await axiosSecure.delete(`/assets/${id}`)
                                      // console.log(res.data);
                                      if(res.data.deletedCount>0){
                                                 refetch()
                                                  Swal.fire({
                                                              position: "top-end",
                                                              icon: "success",
                                                              title:"hjdsfs",
                                                              showConfirmButton: false,
                                                              timer: 1500
                                                            });
                                      }
                          
                          }
                        });

  }






            return (
              <div>

            
              <div className="overflow-x-auto">
<table className="table">
{/* head */}
<thead>
<tr className="text-xl">

<th>#</th>
<th>Name</th>
<th>Type</th>
<th> quantity</th>
<th>Date</th>
<th>Update</th>
<th>Delete</th>
</tr>
</thead>
<tbody>
{
assets.map((item,index)=><tr key={item._id}>
<td>
              {index+1}
</td>



<td>{item.name}</td>
<td>
 {item.type}
</td>
<td>
 {item.quantity}
</td>
<td>
 {item.date}
</td>
<td>
<Link to={`/dashboard/updateAssets/${item._id}`}>
<button
                                                     
className="btn btn-ghost btn-lg bg-orange-500">
<FaEdit className="text-white "></FaEdit>
</button>
</Link>
</td>

<button
                                                     onClick={()=>handleDeleteItem(item._id)}
                                                     className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                                                                           
</tr>
)         
}


</tbody>


</table>
</div>
              
  </div>
            );
};

export default AssetList;