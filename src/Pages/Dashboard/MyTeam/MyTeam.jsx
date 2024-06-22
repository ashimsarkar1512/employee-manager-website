
import SectionTitle from "../../../components/SectionTitle2";
import PageTitle from "../../../components/PageTitle";

import useUsersByCompany from "../../../Hooks/useUsersByCompany";
import DataTable from "react-data-table-component";

function MyTeam() {
    const { usersByCompany, isLoading } = useUsersByCompany();
  
    if (isLoading) {
      return (
        <div className="flex justify-center mt-5">
       
        </div>
      );
    }
  
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
                row?.profile_image
                  ? row.profile_image
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
          return <p className="capitalize">{row.role}</p>;
        },
        sortable: true,
      },
    ];
  
    return (
      <section className="py-8">
        <PageTitle title={"My Team"} />
        <div className="container mx-auto">
          <div className="text-center">
            <SectionTitle sectionTitle={"My Team"} />
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
      </section>
    );
  }
  
  export default MyTeam;