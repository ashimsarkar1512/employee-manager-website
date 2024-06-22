
import "react-responsive-modal/styles.css";
import PrimaryButton from "../../../components/PrimaryButton";
import DataTable from "react-data-table-component";
import SectionTitle from "../../../components/SectionTitle2";
import PageTitle from "../../../components/PageTitle";

import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useUserData from "../../../Hooks/useUserData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Modal from "react-responsive-modal";

function RequestAsset() {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
  
    const [open, setOpen] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTerm, setFilterTerm] = useState("");
    // const [assets, setAssets] = useState([]);
    const { userData, isLoading: userDataLoading } = useUserData();
  
    const onOpenModal = (row) => {
      setCurrentRow(row);
      setOpen(true);
    };
  
    const onCloseModal = () => setOpen(false);
  
    // useEffect(() => {
    //   const fetchAssets = async () => {
    //     try {
    //       const response = await axiosSecure.get("/assets", {
    //         params: {
    //           search: searchTerm,
    //           filter: filterTerm,
    //         },
    //       });
    //       setAssets(response.data);
    //     } catch (error) {
    //       console.error("Error fetching assets:", error);
    //     }
    //   };
  
    //   fetchAssets();
    // }, [axiosSecure, searchTerm, filterTerm]);
  
    const {
      data: assets = [],
      isLoading: assetsLoading,
      refetch,
    } = useQuery({
      queryKey: ["assets", searchTerm, filterTerm],
      queryFn: async () => {
        const response = await axiosSecure.get("/assets", {
          params: {
            search: searchTerm,
            filter: filterTerm,
          },
        });
        return response.data;
      },
    });
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleFilterChange = (e) => {
      setFilterTerm(e.target.value);
    };
  
    const handleRequest = async (e) => {
      e.preventDefault();
      const form = e.target;
      const note = form.note.value;
      const status = "Pending";
      const request_date = new Date().toISOString();
      const asset_id = currentRow._id;
      const asset_name = currentRow.product_name;
      const asset_type = currentRow.product_type;
      const asset_quantity = currentRow.product_quantity;
      const requester_name = userData.name;
      const requester_email = userData.email;
      const requester_company = userData.company_name;
      const requestAssetInfo = {
        note,
        status,
        request_date,
        asset_id,
        asset_name,
        asset_type,
        asset_quantity,
        requester_name,
        requester_email,
        requester_company,
      };
  
      try {
        const response = await axiosSecure.post(
          "/requestAssets",
          requestAssetInfo
        );
        if (response.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Requested!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          navigate("/my-assets");
        }
      } catch (error) {
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: `${errorMessage}`,
        });
      }
    };
  
    const columns = [
      {
        name: "#",
        cell: (row, index) => <div>{index + 1}</div>,
      },
      {
        name: "Asset Name",
        selector: (row) => row?.name,
        sortable: true,
      },
      {
        name: "Asset Type",
        selector: (row) => row?.type,
        sortable: true,
      },
      {
        name: "Availability",
        selector: (row) =>
          parseInt(row?.product_quantity) > 0 ? "Available" : "Out Of Stock",
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => {
          const isAvailable = parseInt(row?.product_quantity) > 0;
          if (isAvailable) {
            return (
              <>
                <span onClick={() => onOpenModal(row)}>
                  <PrimaryButton
                    buttonName="Request"
                    buttonTextColor="text-white"
                    buttonBGColor="bg-green-700"
                  />
                </span>
              </>
            );
          } else {
            return (
              <button
                type="button"
                className="px-5 py-2 text-lg rounded-md cursor-not-allowed disabled opacity-50 bg-red-400 text-white"
              >
                Request
              </button>
            );
          }
        },
      },
    ];
  
    if (userDataLoading || assetsLoading) {
      return (
        <div className="flex justify-center mt-5">
         
        </div>
      );
    }
  
    return (
      <>
        <PageTitle title={"Request For An Asset"} />
        <section className="py-8">
          <div className="container mx-auto">
            <div className="text-center">
              <SectionTitle sectionTitle={"Request For An Asset"} />
            </div>
            <div className="flex flex-wrap gap-6 items-start mt-12">
              <div className="w-full max-w-[320px]">
                <input
                  type="text"
                  placeholder="Search Item By Asset Name"
                  className="p-2 rounded-md border border-green-700 w-full"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="w-full max-w-[320px]">
                <select
                  className="w-[200px] p-2 rounded-md bg-gray-200 text-green-700 font-normal text-lg"
                  value={filterTerm}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter Assets</option>
                  <option value="Available">Available</option>
                  <option value="Out Of Stock">Out Of Stock</option>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-Returnable">Non-Returnable</option>
                </select>
              </div>
            </div>
            {/* Data Table */}
            <div className="mt-8">
              <DataTable
                columns={columns}
                data={assets}
                pagination
                highlightOnHover
              />
            </div>
          </div>
        </section>
        <Modal
          open={open}
          onClose={onCloseModal}
          center
          styles={{
            modal: {
              maxWidth: "800px",
              width: "100%",
            },
          }}
        >
          {currentRow && (
            <div>
              <form onSubmit={handleRequest}>
                <div className="mt-4">
                  <label htmlFor="notes" className="block mb-2">
                    Additional Notes:
                  </label>
                  <textarea
                    required
                    name="note"
                    id="notes"
                    className="w-full p-2 border rounded-md border-green-500"
                    placeholder="Write Notes"
                    rows="4"
                  ></textarea>
                </div>
                <div className="mt-4 text-center">
                  <span>
                    <PrimaryButton
                      buttonName="Submit Request"
                      buttonTextColor="text-white"
                      buttonBGColor="bg-green-700"
                    />
                  </span>
                </div>
              </form>
            </div>
          )}
        </Modal>
      </>
    );
  }
  
  export default RequestAsset;
