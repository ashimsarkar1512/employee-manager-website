import { createBrowserRouter, } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import JoinEmployee from "../Pages/JoinEmployee/JoinEmployee";

import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import AddAsset from "../Pages/Dashboard/AddAsset/AddAsset";


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
                          element:<JoinEmployee></JoinEmployee>
                         }
              ]
            },
            {
              path:'dashboard',
              element:<Dashboard></Dashboard>,
              children:[
                {
                  path:'home',
                  element: <AddAsset></AddAsset>  
                },
                {
                  path:'assetList',
                  element: <AddAsset></AddAsset>  
                },
                {
                  path:'addAsset',
                  element: <AddAsset></AddAsset>  
                }
              ]
            }
          
          ]);