import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../../assets/pexels-divinetechygirl-1181304.jpg";
import img2 from "../../../assets/pexels-august-de-richelieu-4427430.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="w-full max-w-[1920px] mx-auto">
            <Carousel
                autoPlay
                infiniteLoop
                interval={5000}
                showThumbs={false}
                showStatus={false}
                className="rounded-lg overflow-hidden shadow-lg"
            >
                {/* Slide 1 */}
                <div className="relative">
                    <img
                        src={img1}
                        alt="Employee Banner"
                        className="w-full h-[calc(100vh-50px)] object-cover sm:h-[85vh] md:h-[95vh]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-transparent to-black/30">
                        <div className="text-center">
                            <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
                                Join Our Team
                            </h2>
                            <Link to="/employee">
                                <button className="text-lg md:text-xl px-6 py-3 bg-blue-600 text-white hover:bg-blue-800 transition duration-300 rounded-full shadow-lg">
                                    Join as Employee
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="relative">
                    <img
                        src={img2}
                        alt="Manager Banner"
                        className="w-full h-[calc(100vh-50px)] object-cover sm:h-[85vh] md:h-[95vh]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-transparent to-black/30">
                        <div className="text-center">
                            <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
                                Shape the Future
                            </h2>
                            <Link to="/manager">
                                <button className="text-lg md:text-xl px-6 py-3 bg-green-600 text-white hover:bg-green-800 transition duration-300 rounded-full shadow-lg">
                                    Join as HR Manager
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
