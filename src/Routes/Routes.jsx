import { createBrowserRouter, } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";


import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import AddAsset from "../Pages/Dashboard/AddAsset/AddAsset";


import MyEmployeeList from "../Pages/Dashboard/MyEmployeeList/MyEmployeeList";

import HrHome from "../Pages/Dashboard/HrHome/HrHome";
import AssetList from "../Pages/Dashboard/AssetList/AssetList";

import AddEmployee from "../Pages/Dashboard/AddEmployee/AddEmployee";
import RequestAssets from "../Pages/Dashboard/RequestAssets/RequestAssets";

import MyRequestAssets from "../Pages/Dashboard/MyRequestAssets/MyRequestAssets";
import MyTeam from "../Pages/Dashboard/MyTeam/MyTeam";
import Profile from "../Pages/Profile/Profile";
import EmployeeHome from "../Pages/Dashboard/EmployeeHome/EmployeeHome";
import Payment from "../Pages/Dashboard/Payment/Payment";
import AllRequests from "../Pages/Dashboard/AllRequest/AllRequests";
import JoinAsHR from "../Pages/JoinAsHR/JoinAsHR";
import JoinAsEmployee from "../Pages/JoinAsEmployee/JoinAsEmployee";
import IncreaseLimit from "../Pages/IncreaseLimit/IncreaseLimit";


 export const router = createBrowserRouter([
            {
              path: "/",
              element: <Main></Main>,
            children:[
                        {
                                    path:'/',
                                    element:<Home></Home>
                        },
                       
                        {
                          path:'/login',
                          element:<Login></Login>
                         },
                        {
                          path:'/register',
                          element:<Register></Register>
                         },
                         {
                          path:'/employee',
                          element:<JoinAsEmployee></JoinAsEmployee>
                         },
                         {
                          path:'/manager',
                          element:<JoinAsHR></JoinAsHR>
                         },
                         {
                            path:"/payment",
                            element:<Payment></Payment>
                         },
                        
              ]
            },
            {
              path:'dashboard',
              element:<Dashboard></Dashboard>,
              children:[
                {
                  path:'home',
                  element: <HrHome></HrHome>  
                },
                {
                  path:'assetList',
                  element: <AssetList></AssetList>  
                },
                {
                  path:'addAsset',
                  element: <AddAsset></AddAsset>  
                },
                {
                  path:'request',
                  element:<AllRequests></AllRequests>
                },
              
                {
                  path:'myEmployeeList',
                  element: <MyEmployeeList></MyEmployeeList>  
                },
                {
                  path:'addEmployee',
                  element:<AddEmployee></AddEmployee>  
                },
               
                {
                  path:"employeeHome",
                  element:<EmployeeHome></EmployeeHome>
                },
                {
                  path:"requestAssets",
                  element:<RequestAssets></RequestAssets>
                },
                {
                  path:"myAssets",
                  element:<MyRequestAssets></MyRequestAssets>
                },
                {
                  path:"myTeam",
                  element:<MyTeam></MyTeam>
                },
                {
                  path:"profile",
                  element:<Profile></Profile>
                },
                {
                  path:"increaseLimit",
                  element:<IncreaseLimit></IncreaseLimit>
                 }
              
              ]
            }
          
          ]);