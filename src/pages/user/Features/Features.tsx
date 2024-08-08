import Header2 from "../../../components/Header2";


const Features = () => {
    return (
        <>
            <Header2 />
            <section className="py-20 bg-white dark:bg-fill">
                <div className="flex flex-col px-8 mx-auto space-y-12 max-w-7xl xl:px-12">
                    <div className="relative">
                        <h2 className="w-full title   text-black text-4xl font-bold text-center dark:text-white">
                            Enhance Your Career with Circle Up
                        </h2>
                        <p className="w-full py-8 mx-auto -mt-2 text-xs text-center text-gray-700 dark:text-gray-300 intro sm:max-w-3xl">
                            Discover new opportunities, connect with professionals, and take your career to the next level with our comprehensive job portal.
                        </p>
                    </div>
                    <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
                        <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
                            <img
                                className="rounded-lg  border"
                                src="https://i.postimg.cc/2ScFSmwy/homepage.png"
                                alt="Share Insights"
                            />
                        </div>
                        <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
                            <p className="mb-2 text-xs font-semibold leading-none text-left text-green-600 uppercase">
                                Share and Connect
                            </p>
                            <h3 className="mt-2  text-2xl sm:text-left font-bold dark:text-white">
                                Share Insights and Milestones
                            </h3>
                            <p className="mt-5 text-xs text-gray-700 text md:text-left dark:text-gray-300">
                                Share your professional insights, posts, and milestones with your network to stay connected and engaged.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
                        <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12">
                            <img
                                className="rounded-lg  border"
                                src="https://i.postimg.cc/13fVMFGR/profile.png"
                                alt="Professional Portfolio"
                            />
                        </div>
                        <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pl-16">
                            <p className="mb-2 text-xs font-semibold leading-none text-left text-green-600 uppercase">
                                Build Your Network
                            </p>
                            <h3 className="mt-2 text-2xl sm:text-left font-bold dark:text-white">
                                Create a Professional Portfolio
                            </h3>
                            <p className="mt-5 text-xs text-gray-700 text md:text-left dark:text-gray-300">
                                Create a professional portfolio and connect with HR professionals, companies, and other experts in your field.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
                        <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
                            <img
                                className="rounded-lg  border"
                                src="https://i.postimg.cc/G21BcSZ9/job.png"
                                alt="Job Openings"
                            />
                        </div>
                        <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
                            <p className="mb-2 text-xs font-semibold leading-none text-left text-green-600 uppercase">
                                Explore Opportunities
                            </p>
                            <h3 className="mt-2 text-2xl sm:text-left font-bold dark:text-white">
                                Post and Apply for Jobs
                            </h3>
                            <p className="mt-5 text-xs text-gray-700 text md:text-left dark:text-white">
                                Post job openings, search, filter, and apply for jobs that match your skills and career aspirations.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
                        <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12">
                            <img
                                className="rounded-lg  border"
                                src="https://i.postimg.cc/Ss6Gjv23/home7.png"
                                alt="Video Calls"
                            />
                        </div>
                        <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pl-16">
                            <p className="mb-2 text-xs font-semibold leading-none text-left text-green-600 uppercase">
                                Seamless Communication
                            </p>
                            <h3 className="mt-2 text-2xl sm:text-left font-bold dark:text-white">
                                Conduct Video Interviews
                            </h3>
                            <p className="mt-5 text-xs text-gray-700 text md:text-left dark:text-gray-300">
                                Conduct interviews through video calls to connect with potential employers or candidates without geographical barriers.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
                        <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
                            <img
                                className="rounded-lg shadow-xl"
                                src="https://i.postimg.cc/hP5tQPBW/home6.png"
                                alt="Real-Time Chat"
                            />
                        </div>
                        <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
                            <p className="mb-2 text-xs font-semibold leading-none text-left text-green-600 uppercase">
                                Stay Connected
                            </p>
                            <h3 className="mt-2 text-2xl sm:text-left font-bold dark:text-white">
                                Real-Time Chatting
                            </h3>
                            <p className="mt-5 text-xs text-gray-700 text md:text-left dark:text-gray-300">
                                Connect and chat in real-time with professionals and recruiters to explore job opportunities and network effectively.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;
