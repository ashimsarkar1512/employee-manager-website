import {Outlet} from 'react-router-dom'
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Pages/Footer';

const Main = () => {
            return (
                        <div className='max-w-screen-xl mx-auto'>
                                    <Navbar></Navbar>
                                     <Outlet></Outlet>  
                                     <Footer></Footer>
                                          
                        </div>
            );
};

export default Main;