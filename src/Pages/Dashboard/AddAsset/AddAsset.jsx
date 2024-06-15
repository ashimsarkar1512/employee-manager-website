import { useContext } from "react";
import { imageUpload } from "../../../api/utils";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";





const AddAsset = () => {
            const {user}=useContext(AuthContext)
            const axiosSecure=UseAxiosSecure()

           
             const handleSubmit=async e=>{
                        e.preventDefault();
                        const form=e.target;
                        const name=form.name.value;
                        const type=form.type.value;
                        const quantity=form.quantity.value;
                        const image=form.image.files[0]
                        const manager={
                                    name:user?.displayName,
                                    image:user?.photoURL,
                                    email:user?.email

                        }


                        try{
                                    const image_url=await imageUpload(image)
                                    const addAsset={
                                                name,
                                                type,
                                                quantity,
                                                manager,
                                                image:image_url
                                    }
                                    
                                 
                                    console.table(addAsset);
                                    // await mutateAsync(addAsset)
                                    axiosSecure.post('/assets',addAsset)
                                    .then(res=>{
                                                console.log(res.data);
                                                if(res.data.insertedId){
                                                          
                                                            Swal.fire({
                                                                        position: "top-end",
                                                                        icon: "success",
                                                                        title: " asset is added",
                                                                        showConfirmButton: false,
                                                                        timer: 1500
                                                                      });
                                                }
                                    })
                        }catch(err){
                                    console.log(err);
                        }
                        


                        
             }


            return (
                        <div>

                                    <h2 className="text-3xl text-center mt-16">Add An Assets</h2>
 <section className=" max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md mt-10 dark:bg-gray-800">
   
   <form onSubmit={handleSubmit}>
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
           <div>
               <label className="text-gray-700 dark:text-gray-200" >Product Name</label>
               <input id="name" type="text" name="name" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
           </div>

           <div>
               <label className="text-gray-700 dark:text-gray-200" >Product Type</label>
               <select className="select  w-full max-w-xs" name="type">
             <option disabled selected>Product Type</option>
                <option>returnable</option>
                    <option>non-returnable</option>
                 </select>
           </div>

           <div>
               <label className="text-gray-700 dark:text-gray-200" >Product Quantity</label>
               <input id="quantity" type="text" name="quantity" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
           </div>
           <div>
           <label className="text-gray-700 dark:text-gray-200" >Product image</label>
               <input id="image" type="file" name="image" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
           </div>

           
       </div>

       <div className="flex justify-end mt-10">
           <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Add</button>
       </div>
   </form>
               
</section>   
                        </div>
            );
};

export default AddAsset;