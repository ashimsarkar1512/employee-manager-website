
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FcApproval, FcDisapprove } from "react-icons/fc";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const AllRequest = () => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext);

    // Handle cases where user might be null or email is not available
    const [hrEmail, setHrEmail] = useState("");

    useEffect(() => {
        if (user && user.email) {
            setHrEmail(user.email);
        }
    }, [user]);

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);

    const { data: requestAssets = [], isLoading, isError } = useQuery({
        queryKey: ["allRequests"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/requestAsset");
            return data;
        }
    });

    const approveMutation = useMutation({
        mutationFn: async (id) => {
            const approvalDate = new Date();
            const { data } = await axiosSecure.put(`/requestAsset/${id}`, { status: 'approved', hrEmail, approvalDate });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["allRequests"]);
            Swal.fire({
                title: "Approval!",
                text: `Request has been approved.`,
                icon: "success",
                confirmButtonText: "Close",
            });
        }
    });

    const rejectMutation = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.put(`/requestAsset/${id}`, { status: 'rejected' });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["allRequests"]);
            Swal.fire({
                title: "Rejection!",
                text: `Request has been rejected.`,
                icon: "error",
                confirmButtonText: "Close",
            });
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    const handleItemsPerPage = (e) => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemsPerPage(val);
        setCurrentPage(0);
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < numberOfPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const currentItems = requestAssets.slice(startIndex, startIndex + itemsPerPage);
    const numberOfPages = Math.ceil(requestAssets.length / itemsPerPage);

    return (
        <div>
            <div className="mb-5 mt-3">
                <SectionTitle heading="All Request"></SectionTitle>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Email of requester</th>
                            <th>Name of requester</th>
                            <th>Requested date</th>
                            <th>Additional note</th>
                            <th>Status</th>
                            <th>Approve</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={item._id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{item.asset_name}</td>
                                <td>{item.asset_type}</td>
                                <td>{item.email}</td>
                                <td>{item.requesterName}</td>
                                <td>{item.requestDate}</td>
                                <td>{item.requestNotes}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button
                                        onClick={() => approveMutation.mutate(item._id)}
                                        className="btn btn-circle btn-outline"
                                    >
                                        <FcApproval className="text-2xl" />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => rejectMutation.mutate(item._id)}
                                        className="btn btn-circle btn-outline"
                                    >
                                        <FcDisapprove className="text-2xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <p>currentPage: {currentPage}</p>
                <button onClick={handlePrev}>Prev</button>
                {Array.from({ length: numberOfPages }, (_, page) => (
                    <button
                        className={currentPage === page ? 'selected' : ''}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >
                        {page + 1}
                    </button>
                ))}
                <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default AllRequest;
