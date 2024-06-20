
import useAssetsRequest from "../../../Hooks/useAssetsRequest";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import './request.css';

const RequestAssets = () => {
  const [assetsRequest,] = useAssetsRequest();
  const axiosSecure = UseAxiosSecure();
  const {user} = useContext(AuthContext);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [requestNotes, setRequestNotes] = useState("");
  const [itemsPerPage,setItemPerPage]=useState(10)
  const [currentPage,setCurrentPage]=useState(0)

  
  const  numberOfPages=Math.ceil(assetsRequest.length/itemsPerPage)

  const pages=[...Array(numberOfPages).keys()]
 
  const handleRequestClick = (asset) => {
    setSelectedAsset(asset);
    setRequestNotes(""); 
    setTimeout(() => document.getElementById('my_modal_5').showModal(), 100);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAsset) return;

    const requestData = {
      ...selectedAsset,   
      requestNotes,
      status: "pending",
      requestDate: new Date(),
      email: `${user.email}`, 
      requesterName: `${user.displayName}`
    };

    try {
      await axiosSecure.post('/requestAsset', requestData);
      toast.success('Request submitted successfully');
      document.getElementById('my_modal_5').close();
    } catch (error) {
      console.error('Error submitting request', error);
      toast.error('Failed to submit request');
    }
  };
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
   const currentItems = assetsRequest.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <SectionTitle heading='Request for an Asset'></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl"> 
              <th>#</th>
              <th>Assets name</th>
              <th>Assets type</th>
              <th>Stock status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.asset_name}</td>
                <td>{item.asset_type}</td>
                <td>{item.stock_status}</td>
                <td>
                <button
                    className="btn"
                    onClick={() => handleRequestClick(item)}
                    disabled={item.stock_status === 'out_of_stock'}
                  >
                    Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleFormSubmit}>
            <textarea
              className="border-2 p-2 w-full"
              placeholder="Enter your request notes here"
              value={requestNotes}
              onChange={(e) => setRequestNotes(e.target.value)}
            ></textarea>
            <div className="modal-action">
              <button type="submit" className="btn">
                Request
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById('my_modal_5').close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>

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

export default RequestAssets;


