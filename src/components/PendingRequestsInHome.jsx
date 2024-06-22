
import SectionTitle from "../components/SectionTitle2";

import useRequestedAssets from './../Hooks/useRequestedAssets';
import useUserData from "../Hooks/useUserData";
import DataTable from "react-data-table-component";

function PendingRequestsInHome() {
    const { userData } = useUserData();
    const { requestedAssets, isLoading } = useRequestedAssets();
  
    const filteredRequestedAssets = requestedAssets.filter(
      (asset) =>
        asset.requester_company === userData?.company_name &&
        asset.status === "Pending"
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
        name: "Request Date",
        selector: (row) => new Date(row.request_date).toLocaleDateString(),
        sortable: true,
      },
      {
        name: "Request Name",
        selector: (row) => row?.requester_name,
        sortable: true,
      },
      {
        name: "Request Email",
        selector: (row) => row?.requester_email,
        sortable: true,
      },
    ];
  
    // Custom styles for the table
    const customStyles = {
      cells: {
        style: {
          fontSize: "16px", // Increase the font size for table cells
        },
      },
    };
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          {/* <Spinner /> */}
        </div>
      );
    }
  
    return (
      <section className="template-container py-8">
        <div className="text-center">
          <SectionTitle sectionTitle={"Pending Requests"} />
        </div>
        <div className="w-full lg:w-2/3 mx-auto">
          {filteredRequestedAssets?.length < 1 ? (
            <p className="text-center text-red-400 my-2">
              You Have {filteredRequestedAssets?.length} Pending Request.
            </p>
          ) : (
            <DataTable
              columns={columns}
              data={filteredRequestedAssets.slice(0, 5)}
              pagination={filteredRequestedAssets.length > 5}
              highlightOnHover
              customStyles={customStyles}
            />
          )}
        </div>
      </section>
    );
  }
  
  export default PendingRequestsInHome;