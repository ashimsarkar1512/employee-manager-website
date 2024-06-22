
import { Link } from "react-router-dom";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import {  useEffect, useState } from "react";
import useAsset from "../../../Hooks/useAsset"
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const AssetList = () => {
       const [refetch]=useAsset()
       const [services, setServices] = useState([]);
       const[asc,setAsc]=useState(true)
       const [search,setSearch]=useState('')
       const [filter, setFilter] = useState('');
       console.log(filter);
       const [itemsPerPage,setItemPerPage]=useState(5)
  const [currentPage,setCurrentPage]=useState(0)

  
  const  numberOfPages=Math.ceil(services.length/itemsPerPage)

  const pages=[...Array(numberOfPages).keys()]
 
      
      

       const axiosSecure=UseAxiosSecure()

       useEffect(() => {

            axiosSecure(`/assets?sort=${asc?'asc':'desc'}&search=${search}&filter=${filter}`)
            .then(res=>setServices(res.data))
    }, [asc,search,filter])


      
        

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

  const handleSearch=e=>{
    e.preventDefault();
    const search=e.target.search.value;
    console.log(search);
    setSearch(search)
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
 const currentItems = services.slice(startIndex, startIndex + itemsPerPage);




            return (
              <div>
                 <SectionTitle heading='Asset List'></SectionTitle>
                <div className="flex gap-5 justify-center my-8">
                 
                  <form onSubmit={handleSearch}>
                    <input className="py-2 border-2" type="text" name="search" />
                    <input type="submit" value="search"className="btn" />
                  </form>
                  <button className="btn btn-secondary"
                  onClick={()=>setAsc(!asc)}
                  >
                    {asc?'Quantity:High to Low':'Quantity:Low to High'}
                  </button>

                  <select onChange={e => {
          setFilter(e.target.value)
        }}
          value={filter}

          className="select select-bordered " placeholder="type"
          name="type" id="" >

          <option disabled selected>Product type</option>
          
          <option >returnable</option>
          <option >non-returnable</option>

        </select>
                </div>

            
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
currentItems.map((item,index)=><tr key={item._id}>
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

export default AssetList;