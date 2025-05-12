import { Link,  NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import { MdAssignmentAdd } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";
import { IoIosListBox } from "react-icons/io";
import { IoIosPersonAdd } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiOutlineTeam } from "react-icons/ai";
import { MdPostAdd } from "react-icons/md"; 
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { CiLogout } from "react-icons/ci";
import useAnHR from "../Hooks/UseAnHR";
import useUserData from "../Hooks/useUserData";


const Dashboard = () => {
    const { logOut } = useContext(AuthContext);
    const { userData } = useUserData();
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate('/');
             })
            .catch(error => console.log(error));
    };

    const { isHR, isHRLoading } = useAnHR();

    if (isHRLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex">
            
            
            <div className="w-72 min-h-screen bg-orange-400">

           <div className="pl-10">
           {userData?.company_logo ? (
            <Link to="/">
              <img
                src={userData.company_logo}
                alt="Logo"
                className="h-12 w-12 rounded-full"
              />
            </Link>
          ) : (
            <Link to="/" className="logo">
              <h1 className="uppercase text-black text-xl">TRINet</h1>
            </Link>
          )}
           </div>
                <ul className="menu">
                    {
                        isHR ? <>
                            {/* Adjust companyLogo if available in the data */}
                            {/* <img className="w-10 rounded-full" src={isHR.companyLogo} alt="" /> */}
                            <li className="text-xl">
                                <NavLink to='/dashboard/home'><IoMdHome />HR Home</NavLink>
                            </li>
                            <li className="text-xl">
                                <NavLink to='/dashboard/assetList'><FaTableList /> Assets List</NavLink>
                            </li>
                            <li className="text-xl">
                                <NavLink to='/dashboard/addAsset'><MdAssignmentAdd /> Add An Assets</NavLink>
                            </li>
                            <li className="text-xl">
                                <NavLink to='/dashboard/request'><VscRequestChanges /> All Requests</NavLink>
                            </li>
                            <li className="text-xl">
                                <NavLink to='/dashboard/myEmployeeList'><IoIosListBox /> My Employee List</NavLink>
                            </li>
                            <li className="text-xl">
                                <NavLink to='/dashboard/addEmployee'><IoIosPersonAdd /> Add An Employee</NavLink>
                            </li>
                        </> : <>
                            <li className="text-xl">
                                <NavLink to='/dashboard/employeeHome'><IoMdHome />Employee Home</NavLink>
                            </li>
                            <li className="text-xl">
                                <NavLink to='/dashboard/myAssets'><MdPostAdd /> My Request Assets</NavLink>
                            </li>
                            <li className="text-xl">
                                <NavLink to='/dashboard/myTeam'><AiOutlineTeam /> My Team</NavLink>
                            </li>
                            <li className="text-xl">
                                <NavLink to='/dashboard/requestAssets'><VscRequestChanges /> Request for Assets</NavLink>
                            </li>
                        </>
                    }
                    <div className="text-xl">
                        <div className="divider"></div>
                        <li><NavLink to='/'><FaHome /> Home</NavLink></li>
                        <li><NavLink to='/dashboard/profile'><CgProfile /> Profile</NavLink></li>
                        <button className="flex items-center text-xl btn btn-ghost font-medium my-2" onClick={handleLogout}><CiLogout /> LogOut</button>
                    </div>
                </ul>
            </div>
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
