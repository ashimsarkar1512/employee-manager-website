
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import SectionTitle from "../components/SectionTitle2";

import useRequestedAssets from "../Hooks/useRequestedAssets";
import useUserData from "../Hooks/useUserData";

function HRChart() {
    const { userData } = useUserData();
    const { requestedAssets, isLoading } = useRequestedAssets();
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
        
        </div>
      );
    }
  
    const filteredRequestedAssets = requestedAssets.filter(
      (asset) => asset.requester_company === userData?.company_name
    );
  
    const hasAssetTypeField = filteredRequestedAssets.every(
      (asset) => "asset_type" in asset
    );
  
    if (!hasAssetTypeField) {
      return <p>You Do Not Have Any Request Item</p>;
    }
  
    const assetTypeCount = filteredRequestedAssets.reduce(
      (acc, asset) => {
        if (asset.asset_type === "Returnable") {
          acc.returnable += 1;
        } else if (asset.asset_type === "Non-Returnable") {
          acc.nonReturnable += 1;
        }
        return acc;
      },
      { returnable: 0, nonReturnable: 0 }
    );
  
    const data = [
      { name: "Returnable", value: assetTypeCount.returnable },
      { name: "Non-Returnable", value: assetTypeCount.nonReturnable },
    ];
  
    const COLORS = ["#0088FE", "#FF8042"];
  
    return (
      <div className="text-center">
        <SectionTitle sectionTitle={"Pie Chart"} />
        {filteredRequestedAssets?.length < 1 ? (
          <p className="text-center text-red-500">No Requested Items Found</p>
        ) : (
          <div className="flex justify-center overflow-x-scroll">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}
      </div>
    );
  }
  
  export default HRChart;