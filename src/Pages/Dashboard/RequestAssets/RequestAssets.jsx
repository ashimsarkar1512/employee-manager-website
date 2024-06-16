

const RequestAssets = () => {
            return (
                        <div>

                        <h2 className="text-3xl text-center mt-16">Add An Assets</h2>
<section className=" max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md mt-10 dark:bg-gray-800">

<form>
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
<div>
   <label className="text-gray-700 dark:text-gray-200" >Assets Name</label>
   <input id="name" type="text" name="name" className="block w-full px-4 py-3 mt-3 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
</div>

<div>
<label className="label">
 <span className="label-text text-gray-700 dark:text-gray-200">Assets Type</span>
</label>
   <select className="select  w-full max-w-xs" name="type">
 <option disabled selected>Assets Type</option>
    <option>returnable</option>
        <option>non-returnable</option>
     </select>
</div>
<div>
<label className="label">
 <span className="label-text text-gray-700 dark:text-gray-200">Availability</span>
</label>
   <select className="select  w-full max-w-xs" name="type">
 <option disabled selected>Availability</option>
    <option>Available</option>
        <option>Out of Stock</option>
     </select>
</div>




</div>

<div className="flex justify-end mt-10">
<button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Request</button>
</div>
</form>
   
</section>   
            </div>
            );
};

export default RequestAssets;