import { NavLink, Outlet } from "react-router-dom";

import { IoMdHome } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import { MdAssignmentAdd } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";
import { MdDashboardCustomize } from "react-icons/md";
import { IoIosListBox } from "react-icons/io";
import { IoIosPersonAdd } from "react-icons/io";
const Dashboard = () => {
            return (
                        <div className="flex p-3">
                                <div className="w-64 min-h-screen bg-gray-600 ">

                                    <ul className="menu">
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/home'> <IoMdHome></IoMdHome>HR Home</NavLink>
                                                </li>
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/assetList'> <FaTableList></FaTableList> Assets List</NavLink>
                                                </li>
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/addAsset'><MdAssignmentAdd></MdAssignmentAdd> Add An Assets</NavLink>
                                                </li>
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/request'> <VscRequestChanges></VscRequestChanges> All Requests</NavLink>
                                                </li>
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/customRequest'> <MdDashboardCustomize></MdDashboardCustomize> Custom Request list</NavLink>
                                                </li>
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/myEmployeeList'><IoIosListBox></IoIosListBox> My Employee List</NavLink>
                                                </li>
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/addEmployee'> <IoIosPersonAdd></IoIosPersonAdd> Add An Employee</NavLink>
                                                </li>

                                    </ul>
                                    
                                 </div> 

                                 <div className="flex-1 p-6">
                                    <Outlet></Outlet>
                                     
                                 </div>   
                        </div>
            );
};

export default Dashboard;