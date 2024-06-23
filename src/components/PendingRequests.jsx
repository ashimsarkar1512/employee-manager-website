
import DataTable from "react-data-table-component";
import SectionTitle from "../components/SectionTitle2";
import useFilteredRequestedAssets from "../Hooks/useFilteredRequestedAssets";


function PendingRequests() {
    const { requestedAssets, isLoading } = useFilteredRequestedAssets();
    const myPendingRequestedAssets = requestedAssets.filter(
      (asset) => asset.status === "Pending"
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
         
        </div>
      );
    }
  
    return (
      <section className="container mx-auto py-8">
        <div className="text-center">
          <SectionTitle sectionTitle={"My Pending Requests"} />
        </div>
        <div className="">
          {myPendingRequestedAssets?.length < 1 ? (
            <p className="text-center text-red-400 my-2">
              Your Pending Request {myPendingRequestedAssets?.length}
            </p>
          ) : (
            <DataTable
              columns={columns}
              data={myPendingRequestedAssets}
              pagination
              highlightOnHover
              customStyles={customStyles}
            />
          )}
        </div>
      </section>
    );
  }
  
  export default PendingRequests;