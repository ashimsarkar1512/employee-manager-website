import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../../assets/pexels-divinetechygirl-1181304.jpg"
import img2 from "../../../assets/pexels-august-de-richelieu-4427430.jpg"

const Banner = () => {
            return (
                        <div>
                                      <Carousel>
                        <div className="relative">
                        <img src={img1} />
                        <div className="transform -translate-y-1/2 left-5 right-5">
                                    <button className="btn text-2xl">join</button>
                        </div>
                           
                        </div>
                        <div>
                            <img src={img2} />
                         
                        </div>
                       
                    </Carousel>    
                        </div>
            );
};

export default Banner;