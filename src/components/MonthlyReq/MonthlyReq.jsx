import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const MonthlyReq = () => {
    const { user } = useContext(AuthContext);
    const [monthlyRequests, setMonthlyRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [itemsPerPage,setItemPerPage]=useState(5)
  const [currentPage,setCurrentPage]=useState(0)

  
  const  numberOfPages=Math.ceil(monthlyRequests.length/itemsPerPage)

  const pages=[...Array(numberOfPages).keys()]

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
                const requestDate = new Date(request.requestDate);
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

    const handleItemsPerPage=e=>{
        const val=parseInt(e.target.value)
        console.log(val);
        setItemPerPage(val)
        setCurrentPage(0)
      }
         
       const handlePrev=()=>{
        if(currentPage>0){
          setCurrentPage(currentPage-1)
        }
       }
       const handleNext=()=>{
        if(currentPage<pages.length-1){
          setCurrentPage(currentPage+1)
        }
       }
       const startIndex = currentPage * itemsPerPage;
       const currentItems = monthlyRequests.slice(startIndex, startIndex + itemsPerPage);
    

    return (
        <div>
            <h2 className="text-4xl font-semibold text-center my-6">Monthly Requests</h2>
            <div className="overflow-x-auto">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr className="text-xl">
                                <th>#</th>
                                <th>Assets name</th>
                                <th>Assets type</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.asset_name}</td>
                                    <td>{item.asset_type}</td>
                                    <td>{new Date(item.requestDate).toLocaleDateString() || "not found"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="pagination ">
        <p>currentPage:{currentPage}</p>
        <button onClick={handlePrev}>prev</button>
        {
          pages.map(page=><button className={currentPage===page && 'selected'}
            onClick={()=>setCurrentPage(page)}
            key={page}>{page}</button>)
        }
        <select value={itemsPerPage} onChange={handleItemsPerPage}  name="" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <button onClick={handleNext}>Next</button>
      </div>
        </div>
    );
};

export default MonthlyReq;
