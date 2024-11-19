import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const About = () => {
    return (
        <div>
            <SectionTitle heading="About Us"></SectionTitle>

            {/* Section 1: About Our Mission */}
            <section className="bg-gray-800 dark:bg-gray-100 text-gray-100 dark:text-gray-800 my-10">
                <div className="container flex flex-col justify-center p-6 mx-auto lg:flex-row lg:justify-between">
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img
                            src="https://i.ibb.co/VvbLcZK/pexels-karolina-grabowska-4491452.jpg"
                            alt="Efficient management"
                            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                        />
                    </div>
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h2 className="text-3xl font-bold mb-4">
                            Empowering Organizations with Seamless Management
                        </h2>
                        <p className="text-lg">
                            Our platform streamlines the asset management process, ensuring that your business operations are smooth and efficient. From small startups to established enterprises, we provide tools that enable transparent tracking and optimized workflows.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 2: What We Offer */}
            <section className="bg-gray-800 dark:bg-gray-100 text-gray-100 dark:text-gray-800 my-5">
                <div className="container flex flex-col justify-center p-6 mx-auto lg:flex-row lg:justify-between">
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h2 className="text-3xl font-bold mb-4">
                            What Sets Us Apart
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                            <li>Advanced asset allocation system for HR and employees.</li>
                            <li>Centralized management for seamless control.</li>
                            <li>Transparent tracking to ensure accountability.</li>
                            <li>User-friendly interface designed for all team sizes.</li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img
                            src="https://i.ibb.co/xmBgdW7/pexels-cottonbro-5990030.jpg"
                            alt="What we offer"
                            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                        />
                    </div>
                </div>
            </section>

            {/* Section 3: Our Vision */}
            <section className="bg-gray-800 dark:bg-gray-100 text-gray-100 dark:text-gray-800 my-10">
                <div className="container flex flex-col justify-center p-6 mx-auto lg:flex-row lg:justify-between">
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img
                            src="https://i.ibb.co/BwT5WvL/pexels-sora-shimazaki-5668842.jpg"
                            alt="Our Vision"
                            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                        />
                    </div>
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                        <p className="text-lg">
                            We envision a future where businesses can focus on growth while we handle the complexity of managing assets. Our goal is to become the most trusted partner for organizations worldwide, providing innovative and tailored solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Plans */}
            <div className="flex flex-wrap gap-5 justify-center my-10 py-6">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl mb-4">
                            Basic Plan
                        </h2>
                        <p className="text-center text-lg mb-4">
                            Suitable for teams up to 5 employees.
                        </p>
                        <p className="text-center text-2xl mb-4 font-bold">$5/month</p>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary w-full">Get Started</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl mb-4">
                            Pro Plan
                        </h2>
                        <p className="text-center text-lg mb-4">
                            Ideal for teams up to 10 employees.
                        </p>
                        <p className="text-center text-2xl mb-4 font-bold">$8/month</p>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary w-full">Get Started</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl mb-4">
                            Enterprise Plan
                        </h2>
                        <p className="text-center text-lg mb-4">
                            For teams up to 20 employees or more.
                        </p>
                        <p className="text-center text-2xl mb-4 font-bold">$15/month</p>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary w-full">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
