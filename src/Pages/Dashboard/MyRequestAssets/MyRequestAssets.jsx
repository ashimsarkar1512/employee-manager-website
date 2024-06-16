import useAssetsRequest from "../../../Hooks/useAssetsRequest";



const MyRequestAssets = () => {
       const[assetsRequest]=useAssetsRequest();
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
assetsRequest.map((item,index)=><tr key={item._id}>
<td>
              {index+1}
</td>


<td>
{item.name}
</td>
<td>{item.type}</td>
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