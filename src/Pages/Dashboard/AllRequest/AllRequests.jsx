import DataTable from "react-data-table-component";
import SectionTitle from "../../../components/SectionTitle2";
import PrimaryButton from "../../../components/PrimaryButton";
import PageTitle from "../../../components/PageTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useRequestedAssets from "../../../Hooks/useRequestedAssets";
import { useState } from "react";
import useUserData from "../../../Hooks/useUserData";
import { Link } from "react-router-dom";

function AllRequests() {
    const { userData } = useUserData();
    const [searchTerm, setSearchTerm] = useState("");
    const { requestedAssets, refetch, isLoading } = useRequestedAssets();
    const axiosSecure = useAxiosSecure();

    let filtered = requestedAssets.filter((requestedAsset) => {
        const requesterName = requestedAsset.requester_name?.toLowerCase() || "";
        const requesterEmail = requestedAsset.requester_email?.toLowerCase() || "";
        return requesterName.includes(searchTerm.toLowerCase()) || requesterEmail.includes(searchTerm.toLowerCase());
    });

    if (userData?.company_name) {
        filtered = filtered.filter(
            (requestedAsset) => requestedAsset.requester_company === userData.company_name
        );
    }

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const handleAction = async (row, status) => {
        try {
            const updateData = { status };
            if (status === "Approved") {
                updateData.approval_date = new Date();
            }

            const response = await axiosSecure.put(
                `/requestAssets/${row._id}`,
                updateData
            );
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: `Request ${status}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
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
            selector: (row) => row?.asset_name,
            sortable: true,
        },
        {
            name: "Asset Type",
            selector: (row) => row?.asset_type,
            sortable: true,
        },
        {
            name: "Email of Requester",
            selector: (row) => row?.requester_email,
            sortable: true,
        },
        {
            name: "Name of Requester",
            selector: (row) => row?.requester_name,
            sortable: true,
        },
        {
            name: "Request Date",
            selector: (row) => formatDate(row?.request_date),
            sortable: true,
        },
        {
            name: "Additional Note",
            selector: (row) => row?.note,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="py-2 flex justify-center items-center gap-2 flex-wrap">
                    {row.status !== "Approved" &&
                        row.status !== "Rejected" &&
                        row.status !== "Cancelled" &&
                        row.status !== "Returned" && (
                            <>
                                <button
                                    type="button"
                                    className="p-1 rounded-md bg-green-700 text-white text-base"
                                    onClick={() => handleAction(row, "Approved")}
                                >
                                    Approve
                                </button>
                                <button
                                    type="button"
                                    className="p-1 rounded-md bg-red-700 text-white text-base"
                                    onClick={() => handleAction(row, "Rejected")}
                                >
                                    Reject
                                </button>
                            </>
                        )}
                </div>
            ),
        },
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center mt-5">
                {/* Loading Spinner */}
            </div>
        );
    }

    return (
        <section className="py-8">
            <PageTitle title={"All Requests"} />
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
                        <SectionTitle sectionTitle={"All Requests"} />
                    </div>
                    <div className="w-full max-w-[320px] relative">
                        <input
                            type="text"
                            className="p-2 rounded-md border border-green-700 w-full"
                            placeholder="Search By Name/Email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Data Table */}
                    <div className="mt-8">
                        <DataTable
                            columns={columns}
                            data={filtered}
                            pagination
                            highlightOnHover
                        />
                    </div>
                </div>
            )}
        </section>
    );
}

export default AllRequests;
