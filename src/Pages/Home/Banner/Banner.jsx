import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../../assets/pexels-divinetechygirl-1181304.jpg"
import img2 from "../../../assets/pexels-august-de-richelieu-4427430.jpg"
import { Link } from "react-router-dom";

const Banner = () => {
            return (
                        <div>
                                      <Carousel>
                        <div className="relative">
                        <img src={img1} />
                        <div className="transform -translate-y-36 left-5 right-5 ">
                                   <Link to='/employee'> <button className="btn text-2xl">Join As Employee</button></Link>
                        </div>
                           
                        </div>
                        <div>
                            <img src={img2} />
                            <div className="transform -translate-y-36 left-5 right-5 ">
                                   <Link to='/manager'> <button className="btn text-2xl">Join As HR Manager</button></Link>
                           </div>
                           
                         
                        </div>
                       
                    </Carousel>    
                        </div>
            );
};

export default Banner;