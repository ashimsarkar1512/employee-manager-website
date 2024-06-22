import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { MdGroupRemove } from "react-icons/md";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";





const MyEmployeeList = () => {
          const axiosSecure=UseAxiosSecure()
          
          const [itemsPerPage,setItemPerPage]=useState(5)
          const [currentPage,setCurrentPage]=useState(0)
        
          
         

       const {data:users=[],refetch}=useQuery({
           queryKey:['users'], 
           queryFn:async ()=>{
              const res=await axiosSecure.get('/users')
              return res.data
           }  
       })

       const  numberOfPages=Math.ceil(users.length/itemsPerPage)
        
       const pages=[...Array(numberOfPages).keys()]

    

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


        const handleItemsPerPage=e=>{
          const val=parseInt(e.target.value)
          console.log(val);
          setItemPerPage(val)
          setCurrentPage(0)
        }
           
         const handlePrev=()=>{
          if(currentPage>0){
            setCurrentPage(currentPage-1)
          }
         }
         const handleNext=()=>{
          if(currentPage<pages.length-1){
            setCurrentPage(currentPage+1)
          }
         }
         const startIndex = currentPage * itemsPerPage;
         const currentItems = users.slice(startIndex, startIndex + itemsPerPage);

            return (
                        <div>
                                  <div>

                                    <div className="my-8">
                                      <SectionTitle heading="My Employee"></SectionTitle>
                                    </div>
                                      
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
                        currentItems.map((user,index)=><tr key={user._id}>
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
                            <button >
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


                                                <div className="pagination ">
        <p>currentPage:{currentPage}</p>
        <button onClick={handlePrev}>prev</button>
        {
          pages.map(page=><button className={currentPage===page && 'selected'}
            onClick={()=>setCurrentPage(page)}
            key={page}>{page}</button>)
        }
        <select value={itemsPerPage} onChange={handleItemsPerPage}  name="" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <button onClick={handleNext}>Next</button>
      </div>
                        </div>
            );
};

export default MyEmployeeList;