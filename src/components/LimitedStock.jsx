
import DataTable from "react-data-table-component";
import SectionTitle from "../components/SectionTitle2";

import useLimitedStock from './../Hooks/useLimitedStock';

function LimitedStock() {
    const { assets, isLoading } = useLimitedStock();
  
    const columns = [
      {
        name: "#",
        cell: (row, index) => <div>{index + 1}</div>,
      },
      {
        name: "Asset Name",
        selector: (row) => row.product_name,
        sortable: true,
      },
      {
        name: "Quantity",
        selector: (row) => row.product_quantity,
        sortable: true,
      },
    ];
  
    // Custom styles for the table
    const customStyles = {
      cells: {
        style: {
          fontSize: "16px",
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
      <section className="template-container py-8">
        <div className="text-center">
          <SectionTitle sectionTitle={"Limited Stock Items"} />
        </div>
        <div className="w-full lg:w-2/3 mx-auto">
          {assets?.length < 1 ? (
            <p className="text-center text-red-400 my-2">No Data Found!</p>
          ) : (
            <DataTable
              columns={columns}
              data={assets}
              pagination
              highlightOnHover
              customStyles={customStyles}
            />
          )}
        </div>
      </section>
    );
  }
  
  export default LimitedStock;