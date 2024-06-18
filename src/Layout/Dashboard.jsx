import { NavLink, Outlet } from "react-router-dom";

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
import useHr from "../Hooks/useHr";
// import { VscRequestChanges } from "react-icons/vsc";
const Dashboard = () => {
     const [isHr]=useHr()
     // const isHr=true
            return (
                        <div className="flex ">
                                <div className="w-64 min-h-screen bg-orange-400 ">

                                    <ul className="menu">

                                        {
                                             isHr?<>
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
                                           <NavLink to='/dashboard/myEmployeeList'><IoIosListBox></IoIosListBox> My Employee List</NavLink>
                                                </li>
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/addEmployee'> <IoIosPersonAdd></IoIosPersonAdd> Add An Employee</NavLink>
                                                </li>
                                             </>
                                             :
                                             <>
                                              <li className="text-xl">
                                           <NavLink to='/dashboard/employeeHome'> <IoMdHome></IoMdHome>Employee Home</NavLink>
                                                </li>
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/myAssets'> <MdPostAdd></MdPostAdd> My Request Assets</NavLink>
                                                </li>
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/myTeam'> <AiOutlineTeam></AiOutlineTeam> My Team</NavLink>
                                                </li>
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/requestAssets'> <VscRequestChanges></VscRequestChanges> Request for Assets</NavLink>
                                                </li>

                                             </>
                                        }
                                          

                                             <div className="text-xl">
                                             <div className="divider"></div>
                                                <li><NavLink to='/'><FaHome></FaHome> Home</NavLink></li>
                                                <li><NavLink to='/dashboard/profile'><CgProfile></CgProfile> profile</NavLink></li>
                                             </div>
                                                

                                    </ul>
                                   
                                 </div> 

                                 <div className="flex-1 p-6">
                                    <Outlet></Outlet>
                                     
                                 </div>   
                        </div>
            );
};

export default Dashboard;