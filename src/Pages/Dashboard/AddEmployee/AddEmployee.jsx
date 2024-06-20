import { useContext } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const AddEmployee = () => {

     const axiosSecure = UseAxiosSecure();
      const{loading,user}=useContext(AuthContext)
      console.log(user);
   
   const { data: addEmployee = []} = useQuery({
     queryKey: ['employees'],
     enabled: !loading,
     queryFn: async () => {
       const { data } = await axiosSecure.get('/users');
       return data;
     }
   });

    console.log(addEmployee);
            return (
                        <div>
                               
                           <h2>{addEmployee.length}</h2>

                           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>

        </th>
        <th>Member Image</th>
        <th>Member Name</th>
        <th>Add Team</th>
       
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
   { addEmployee.map(item=><tr key={item._id}>
       <th>
         <label>
           <input type="checkbox" className="checkbox" />
         </label>
       </th>
       <td>
         <div className="flex items-center gap-3">
           <div className="avatar">
             <div className="mask mask-squircle w-12 h-12">
               <img src={item.image} alt="" />
             </div>
           </div>
           
         </div>
       </td>
       <td>
         {item.name}
       </td>

       <th>
         <button className="btn btn-ghost btn-xs">Add Team</button>
       </th>
     </tr> )
       
   }
     
     

    </tbody>
    {/* foot */}

    
  </table>
</div>
                             
                                  
                        </div>
            );
};

export default AddEmployee;