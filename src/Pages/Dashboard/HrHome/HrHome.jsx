import HRChart from "../../../components/HRChart";
import LimitedStock from "../../../components/LimitedStock";
import PendingRequestsInHome from "../../../components/PendingRequestsInHome";
import TopRequestedItems from "../../../components/TopRequestedItems";

const HrHome = () => {
            return (
                        <div>
                             
                             <PendingRequestsInHome></PendingRequestsInHome> 
                             <HRChart></HRChart>  
                             <LimitedStock></LimitedStock>
                             <TopRequestedItems></TopRequestedItems>  
                        </div>
            );
};

export default HrHome;