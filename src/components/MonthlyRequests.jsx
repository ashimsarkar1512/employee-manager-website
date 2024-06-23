
import DataTable from "react-data-table-component";
import useFilteredRequestedAssets from "../Hooks/useFilteredRequestedAssets";
import SectionTitle from "../components/SectionTitle2";


function MonthlyRequests() {
    const { requestedAssets, isLoading } = useFilteredRequestedAssets();
  
    const isCurrentMonth = (date) => {
      const now = new Date();
      const requestDate = new Date(date);
      return (
        requestDate.getMonth() === now.getMonth() &&
        requestDate.getFullYear() === now.getFullYear()
      );
    };
  
    const monthlyRequestedAssets =
      requestedAssets
        ?.filter((asset) => isCurrentMonth(asset.request_date))
        ?.sort((a, b) => new Date(b.request_date) - new Date(a.request_date)) ||
      [];
  
    const columns = [
      {
        name: "#",
        cell: (row, index) => <div>{index + 1}</div>,
      },
      {
        name: "Asset Name",
        selector: (row) => row?.asset_name,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row?.status,
        sortable: true,
      },
      {
        name: "Requested Data",
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
      <section className="container mx-auto pb-8">
        <div className="text-center">
          <SectionTitle sectionTitle={"My Monthly Requests"} />
        </div>
        <div className="">
          {monthlyRequestedAssets.length === 0 ? (
            <div className="text-center">
              <p className="text-red-600">No Requests Made This Month.</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={monthlyRequestedAssets}
              pagination
              highlightOnHover
              customStyles={customStyles}
            />
          )}
        </div>
      </section>
    );
  }
  
  export default MonthlyRequests;