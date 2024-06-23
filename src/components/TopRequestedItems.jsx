
import DataTable from "react-data-table-component";
import SectionTitle from "../components/SectionTitle2";

import useRequestedAssets from "../Hooks/useRequestedAssets";
import useUserData from "../Hooks/useUserData";

function TopRequestedItems() {
    const { userData } = useUserData();
    const { requestedAssets, isLoading } = useRequestedAssets();
  
    const filteredRequestedAssets = requestedAssets.filter(
      (asset) => asset.requester_company === userData?.company_name
    );
  
    const assetCounts = filteredRequestedAssets.reduce((counts, asset) => {
      counts[asset.asset_name] = (counts[asset.asset_name] || 0) + 1;
      return counts;
    }, {});
  
    const sortedAssetCounts = Object.entries(assetCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  
    const columns = [
      {
        name: "#",
        cell: (row, index) => <div>{index + 1}</div>,
      },
      {
        name: "Asset Name",
        selector: (row) => row[0],
        sortable: true,
      },
      {
        name: "Request Count",
        selector: (row) => row[1],
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
          <SectionTitle sectionTitle={"Top Most Requested Items"} />
        </div>
        <div className="w-full lg:w-2/3 mx-auto">
          {sortedAssetCounts.length < 1 ? (
            <p className="text-center text-red-400 my-2">
              No Requested Items Found
            </p>
          ) : (
            <DataTable
              columns={columns}
              data={sortedAssetCounts}
              pagination={false}
              highlightOnHover
              customStyles={customStyles}
            />
          )}
        </div>
      </section>
    );
  }
  
  export default TopRequestedItems;