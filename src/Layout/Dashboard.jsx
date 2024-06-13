import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
            return (
                        <div className="flex p-5">
                                <div className="w-64 min-h-full bg-orange-400">

                                    <ul className="menu">
                                                <li>
                                           <NavLink to='/dashboard/home'>Add an asset</NavLink>
                                                </li>
                                                <li>
                                           <NavLink to='/dashboard/assetList'></NavLink>
                                                </li>
                                                <li>
                                           <NavLink to='/dashboard/addAsset'>Add an asset</NavLink>
                                                </li>

                                    </ul>
                                    
                                 </div> 

                                 <div className="flex-1">
                                    <Outlet></Outlet>
                                     
                                 </div>   
                        </div>
            );
};

export default Dashboard;