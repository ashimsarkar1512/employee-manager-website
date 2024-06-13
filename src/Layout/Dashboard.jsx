import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
            return (
                        <div className="flex p-3">
                                <div className="w-64 min-h-screen bg-slate-500 ">

                                    <ul className="menu">
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/home'>HR Home</NavLink>
                                                </li>
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/assetList'>Assets List</NavLink>
                                                </li>
                                                <li className="text-xl">
                                           <NavLink to='/dashboard/addAsset'>Add An Assets</NavLink>
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