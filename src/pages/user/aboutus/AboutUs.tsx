import { Briefcase, MessageCircle, Share } from "lucide-react";
import Header2 from '../../../components/Header2';

const AboutUs = () => {
    return (
        <>
            <Header2 />
            <section className="relative mt-10">
                <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                    <div className="absolute top-0 w-full h-full bg-center bg-cover">
                    </div>
                    <div className="container relative mx-auto text-center">
                        <div className="w-full lg:w-8/12 px-4 mx-auto">
                            <div className="pr-12">
                                <h1 className="title text-black font-semibold text-4xl dark:text-white">
                                    Ripple - Your Professional Social Platform
                                </h1>
                                <p className="mt-4 text-sm dark:text-gray-300">
                                    Combine the power of social media and job hunting. Engage with professionals, showcase your skills, and find your next career opportunity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-10 bg-blueGray-200 ">
                <div className="container mx-auto px-4 ">
                    <div className="flex flex-wrap justify-center ">
                        <div className="box w-full sm:w-5/12 md:w-3/12 px-4 text-center ">
                            <div className="relative flex flex-col min-w-0 break-words bg-secondary w-full mb-8 border rounded-lg hover:shadow-lg duration-300 square-box">
                                <div className="px-4 py-5 flex-auto">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-600">
                                        <Share />
                                    </div>
                                    <h6 className="text-xl font-semibold dark:text-white ">Share Insights</h6>
                                    <p className="mt-2 mb-4 text-xs dark:text-gray-300">
                                        Share your professional insights, posts, and milestones with your network.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="box w-full sm:w-5/12 md:w-3/12 px-4 text-center">
                            <div className="relative flex flex-col min-w-0 break-words bg-secondary w-full mb-8 border rounded-lg hover:shadow-lg duration-300 square-box">
                                <div className="px-4 py-5 flex-auto">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-600">
                                        <Briefcase />
                                    </div>
                                    <h6 className="text-xl font-semibold dark:text-white">Job Opportunities</h6>
                                    <p className="mt-2 mb-4 text-xs dark:text-gray-300">
                                        Post job openings, search, filter, and apply for jobs with ease.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="box w-full sm:w-5/12 md:w-3/12 px-4 text-center">
                            <div className="relative flex flex-col min-w-0 break-words bg-secondary w-full mb-8 border rounded-lg hover:shadow-lg duration-300 square-box">
                                <div className="px-4 py-5 flex-auto">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-600">
                                        <MessageCircle />
                                    </div>
                                    <h6 className="text-xl font-semibold dark:text-white">Connect & Chat</h6>
                                    <p className="mt-2 mb-4 text-xs dark:text-gray-300">
                                        Engage in real-time chat and conduct video interviews to stay connected.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
