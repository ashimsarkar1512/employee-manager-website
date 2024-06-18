
import useAssetsRequest from "../../../Hooks/useAssetsRequest";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const RequestAssets = () => {
  const [assetsRequest] = useAssetsRequest();
  const axiosSecure = useAxiosSecure();
  const {user}=useContext(AuthContext)
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [requestNotes, setRequestNotes] = useState("");

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
      requesterEmail: `${user.email}`, 
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
              <th>Stock status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assetsRequest.map((item, index) => (
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
                    {item.action}
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
    </div>
  );
};

export default RequestAssets;

