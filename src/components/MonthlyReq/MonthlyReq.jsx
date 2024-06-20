import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const MonthlyReq = () => {
    const { user } = useContext(AuthContext);
    const [monthlyRequests, setMonthlyRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchMonthlyRequests();
        }
    }, [user]);

    const fetchMonthlyRequests = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://assignment-12-category-0007-server.vercel.app/requestAsset?email=${user.email}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const currentMonth = new Date().getMonth(); 
            const currentYear = new Date().getFullYear(); 
            const filteredRequests = data.filter(request => {
                const requestDate = new Date(request.requestDate); // Adjust case to match API response
                return requestDate.getMonth() === currentMonth && requestDate.getFullYear() === currentYear;
            });
            
            const sortedRequests = filteredRequests.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
            setMonthlyRequests(sortedRequests);
        } catch (error) {
            console.error('Error fetching monthly requests:', error);
            setError('Failed to fetch monthly requests. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-4xl font-semibold text-center my-6">Monthly Requests</h2>
            <div className="overflow-x-auto ">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                        <table className="table">
                        {/* head */}
                        <thead>
                          <tr className="text-xl">
                            <th>#</th>
                            <th>Assets name</th>
                            <th>Assets type</th>
                            <th>Date</th>
                            
                          </tr>
                        </thead>
                        <hr/>
                        <tbody>
                          {monthlyRequests.map((item, index) => (
                            <tr key={item._id}>
                              <td>{index + 1}</td>
                              <td>{item.asset_name}</td>
                              <td>{item.asset_type}</td>
                              <td>{item.requestDate}</td>
                              <td>
                              
                                
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                    
                )}
            </div>
        </div>
    );
};

export default MonthlyReq;
