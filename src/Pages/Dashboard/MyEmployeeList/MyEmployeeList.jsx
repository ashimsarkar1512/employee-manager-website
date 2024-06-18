import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { MdGroupRemove } from "react-icons/md";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";



const MyEmployeeList = () => {
          const axiosSecure=UseAxiosSecure()
       const {data:users=[],refetch}=useQuery({
           queryKey:['users'], 
           queryFn:async ()=>{
              const res=await axiosSecure.get('/users')
              return res.data
           }  
       })


       const handleMakeHr=user=>{
              axiosSecure.patch(`users/hr/${user._id}`)
              .then(res=>{
                          console.log(res.data);
                          if(res.data.modifiedCount>0){
                                      refetch()
                                      Swal.fire({
                                                  position: "top-end",
                                                  icon: "success",
                                                  title: `${user.name} is an HR now`,
                                                  showConfirmButton: false,
                                                  timer: 1500
                                                });
                          }
              })
       }

        const handleRemoveUser=user=>{
              Swal.fire({
                     title: "Are you sure?",
                     text: "You won't be able to revert this!",
                     icon: "warning",
                     showCancelButton: true,
                     confirmButtonColor: "#3085d6",
                     cancelButtonColor: "#d33",
                     confirmButtonText: "Yes, delete it!"
                   }).then((result) => {
                     if (result.isConfirmed) {
                 
                     axiosSecure.delete(`/users/${user._id}`)
                     .then(res=>{
                                 if(res.data.deletedCount>0){
                                             refetch ();
                                              Swal.fire({
                                       title: "Deleted!",
                                       text: "Your file has been deleted.",
                                       icon: "success"
                                     });
                                   }
                     })
                     }
                   });
        }


            return (
                        <div>
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
                        <th>Remove</th>
                        
                        </tr>
                        </thead>
                        <tbody>
                        {
                        users.map((user,index)=><tr key={user._id}>
                        <td>
                                      {index+1}
                        </td>
                        
                        
                        <td>
                        <div className="flex items-center gap-3">
                          
                        <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                        <img src={user.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                        </div>
                        
                        </div>
                        </td>
                        <td>{user.name}</td>
                        <td>
                           {user.role==='hr'?<GrUserAdmin className="text-2xl"></GrUserAdmin>:
                            <button onClick={()=>handleMakeHr(user)}>
                            <FaUser className="text-2xl "></FaUser>
                           </button>}
                        </td>
                        <td>
                          <button onClick={()=>handleRemoveUser(user)} className="btn btn-circle">
                            <MdGroupRemove className="text-2xl text-red-600"></MdGroupRemove>
                          </button>
                        </td>
                                                                                                  
                        </tr>
                        )         
                        }
                        
                        
                        </tbody>
                        
                        
                        </table>
                        </div>        
                                                </div>   
                        </div>
            );
};

export default MyEmployeeList;