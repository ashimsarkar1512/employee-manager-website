
import SectionTitle from "../../../components/PrimaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import PageTitle from "../../../components/PageTitle";


import useUserData from "../../../Hooks/useUserData";

import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useUsersByCompany from "../../../Hooks/useUsersByCompany";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

function MyEmployeeList() {
    const { usersByCompany, isLoading, refetch } = useUsersByCompany();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const { userData } = useUserData();
  
    const handleRemoveUser = async (userId) => {
      try {
        setLoading(true);
        await axiosSecure.patch(`/users/${userId}`);
        Swal.fire({
          icon: "success",
          title: "Employee Removed!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch(); // Refresh the user list
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        setLoading(false);
      }
    };
  
   
    const columns = [
      {
        name: "#", // Column header for serial number
        cell: (row, index) => <div>{index + 1}</div>, // Render serial number based on row index
      },
      {
        name: "Member Image",
        selector: (row) => {
          return (
            <img
              src={
                row?.image
                  ? row.image
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/2048px-Missing_avatar.svg.png"
              }
              alt="Image"
              className="h-[100px] w-[100px] object-cover rounded my-2"
            />
          );
        },
        sortable: true,
      },
      {
        name: "Member Name",
        selector: (row) => row?.name,
        sortable: true,
      },
      {
        name: "Member Type",
        selector: (row) => {
          return <p className="uppercase">{row.role}</p>;
        },
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => {
          if (row.role === "hr") {
            return "";
          } else {
            return (
              <div className="py-2 flex justify-center">
                <button
                  onClick={() => handleRemoveUser(row._id)}
                  type="button"
                  className="p-1 rounded-md bg-red-700 text-white text-base"
                >
                  Remove
                </button>
              </div>
            );
          }
        },
      },
    ];
  
    return (
      <section className="py-8">
        <PageTitle title={"Employee List"} />
        {!userData?.payment_status ? (
          <div className="text-center">
            <p className="text-red-700 font-bold text-xl mb-4">
              You Have To Pay First
            </p>
            <Link to="/payment">
              <PrimaryButton
                buttonName={"Go For Payment"}
                buttonBGColor={"bg-primary"}
                buttonTextColor={"text-white"}
              />
            </Link>
          </div>
        ) : (
          <div className="template-container">
            <div className="text-center">
              <SectionTitle sectionTitle={"My Employee List"} />
              {/* Data Table */}
              <div className="mt-2">
                <DataTable
                  columns={columns}
                  data={usersByCompany}
                  pagination
                  highlightOnHover
                />
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
  
  export default MyEmployeeList;