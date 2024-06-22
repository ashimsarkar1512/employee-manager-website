
import Print from "../../../components/Print";

import SectionTitle from "../../../components/SectionTitle2";
import PageTitle from "../../../components/PageTitle";


import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useFilteredRequestedAssets from "../../../Hooks/useFilteredRequestedAssets";
import DataTable from "react-data-table-component";
import Modal from "react-responsive-modal";
import { useState } from "react";

function MyRequestAssets() {
    const { requestedAssets, isLoading, refetch } = useFilteredRequestedAssets();
    const axiosSecure = useAxiosSecure();
    const [updatingId, setUpdatingId] = useState(null);
    const [printItem, setPrintItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    console.log(requestedAssets);
  
    const handleCancel = async (id) => {
      setUpdatingId(id);
      try {
        await axiosSecure.put(`/requestAssets/${id}/cancel`);
        refetch();
      } catch (error) {
        console.error("Error cancelling request:", error);
      } finally {
        setUpdatingId(null);
      }
    };
  
    const handleReturn = async (id) => {
      setUpdatingId(id);
      try {
        await axiosSecure.put(`/requestAssets/${id}/return`);
        refetch();
      } catch (error) {
        console.error("Error returning asset:", error);
      } finally {
        setUpdatingId(null);
      }
    };
  
    const handlePrint = (item) => {
      setPrintItem(item);
    };
  
    const closeModal = () => {
      setPrintItem(null);
    };
  
    // eslint-disable-next-line react/prop-types
    const CustomCloseButton = ({ onClick }) => (
      <button
        onClick={onClick}
        style={{
          position: "absolute",
          top: 0,
          right: 120,
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    );
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleFilterChange = (e) => {
      setFilterStatus(e.target.value);
    };
  
    const filteredAssets = requestedAssets.filter(
      (asset) =>
        asset.asset_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterStatus === "Pending" || filterStatus === "Approved"
          ? asset.status === filterStatus
          : filterStatus === "Returnable" || filterStatus === "Non-Returnable"
          ? asset.asset_type === filterStatus
          : true)
    );
  
    const columns = [
      {
        name: "#",
        cell: (row, index) => <div>{index + 1}</div>,
      },
      {
        name: "Asset Name",
        selector: (row) => row.asset_name,
        sortable: true,
      },
      {
        name: "Asset Type",
        selector: (row) => row.asset_type,
        sortable: true,
      },
      {
        name: "Request Date",
        selector: (row) => new Date(row.request_date).toLocaleDateString(),
        sortable: true,
      },
      {
        name: "Approval Date",
        selector: (row) => {
          if (row.status === "Cancelled") {
            return "";
          } else if (row.status === "Rejected") {
            return "";
          } else {
            return row.approval_date
              ? new Date(row.approval_date).toLocaleDateString()
              : "Pending";
          }
        },
        sortable: true,
      },
      {
        name: "Request Status",
        selector: (row) => row.status,
        sortable: true,
        conditionalCellStyles: [
          {
            when: (row) => row.status === "Pending",
            style: {
              backgroundColor: "rgba(255, 193, 7, 0.2)",
              color: "goldenrod",
            },
          },
          {
            when: (row) => row.status === "Approved",
            style: {
              backgroundColor: "rgba(46, 204, 113, 0.2)",
              color: "green",
            },
          },
          {
            when: (row) => row.status === "Rejected",
            style: {
              backgroundColor: "rgba(231, 76, 60, 0.2)",
              color: "red",
            },
          },
        ],
      },
      {
        name: "Action",
        cell: (row) => {
          if (row.status === "Pending") {
            return (
              <button
                type="button"
                className="p-2 text-base rounded-md bg-red-400 text-white"
                onClick={() => handleCancel(row._id)}
                disabled={updatingId === row._id}
              >
                {updatingId === row._id ? "Cancelling..." : "Cancel"}
              </button>
            );
          } else if (row.status === "Approved") {
            return (
              <>
                <button
                  onClick={() => handlePrint(row)}
                  type="button"
                  className="p-2 text-base rounded-md bg-light-blue-400 text-white"
                >
                  Print
                </button>
                {row.asset_type === "Returnable" && (
                  <button
                    className={`ml-2 p-2 text-base rounded-md bg-green-400 text-white ${
                      row.status === "Returned"
                        ? "cursor-not-allowed disabled opacity-50"
                        : ""
                    }`}
                    onClick={() => handleReturn(row._id)}
                    disabled={row.status === "Returned" || updatingId === row._id}
                  >
                    {row.status === "Returned"
                      ? "Returned"
                      : updatingId === row._id
                      ? "Returning..."
                      : "Return"}
                  </button>
                )}
              </>
            );
          } else if (row.status === "Returned") {
            return (
              <>
                {row.asset_type === "Returnable" && (
                  <button
                    className={`ml-2 p-2 text-base rounded-md bg-red-400 text-white cursor-not-allowed disabled opacity-50`}
                  >
                    Return
                  </button>
                )}
              </>
            );
          }
          return null;
        },
      },
    ];
  
    if (isLoading) {
      return (
        <div className="flex justify-center mt-5">
          
        </div>
      );
    }
  
    return (
      <>
        <PageTitle title={"My Requested Assets"} />
        <section className="py-8">
          <div className="container mx-auto">
            <div className="text-center">
              <SectionTitle sectionTitle={"My Requested Assets"} />
            </div>
            <div className="flex flex-wrap gap-6 items-start mt-12">
              <div className="w-full max-w-[320px] relative">
                <input
                  type="text"
                  placeholder="Search Item By Asset Name"
                  className="w-full p-2 border border-green-700 rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="w-full max-w-[320px]">
                <select
                  className="w-[200px] p-2 rounded-md bg-gray-200 text-green-700 font-normal text-lg"
                  value={filterStatus}
                  onChange={handleFilterChange}
                >
                  <option value="" selected disabled>
                    Filter Assets
                  </option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-Returnable">Non-Returnable</option>
                </select>
              </div>
            </div>
            {/* Data Table */}
            <div className="mt-8">
              <DataTable
                columns={columns}
                data={filteredAssets}
                pagination
                highlightOnHover
              />
            </div>
            {/* Render Print Component in Modal */}
            <Modal
              open={!!printItem}
              onClose={closeModal}
              center
              styles={{
                modal: {
                  width: "100%",
                  maxWidth: "none",
                  padding: 0,
                },
                overlay: {
                  background: "rgba(0, 0, 0, 0.7)",
                },
              }}
              closeIcon={<CustomCloseButton onClick={closeModal} />}
            >
              {printItem && <Print item={printItem} />}
            </Modal>
          </div>
        </section>
      </>
    );
  }
  
  export default MyRequestAssets;