import useTeam from "../../../Hooks/useTeam";


const MyTeam = () => {
    const [myTeam]=useTeam()
            return (
                        <div>
                                      
              <div className="overflow-x-auto">
<table className="table">
{/* head */}
<thead>
<tr className="text-xl">

<th>#</th>
<th>Image</th>
<th>Name</th>
<th>Member Type</th>

</tr>
</thead>
<tbody>
{
myTeam.map((item,index)=><tr key={item._id}>
<td>
              {index+1}
</td>


<td>
<div className="flex items-center gap-3">
  
<div className="avatar">
<div className="mask mask-squircle w-12 h-12">
<img src={item.image} alt="Avatar Tailwind CSS Component" />
</div>
</div>

</div>
</td>
<td>{item.name}</td>
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

export default MyTeam;