import {  useEffect, useState } from "react";
import { Accordion } from "flowbite-react";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {  useFilterContext, } from '../utils/context/jobfilterData/FilterContext';
import { getFormSelectFormData } from "../services/api/user/apiMethods";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
function JobFilterForm({ onReset }: any) {
    const { filterData, setFilterData } = useFilterContext();
    const [locationOptions, setLocationOptions] = useState([])
    const [jobRoleOptions, setJobRoleOptions] = useState([])
    const [selectedJobRole, setSelectedJobRole] = useState({ value: "" });
    const [selectedLocation, setSelectedLocation] = useState({ value: "" });
    const [selectedJobType, setSelectedJobType] = useState("");
    const [selectedSalaryRange, setSelectedSalaryRange] = useState(0);
    const [selectedExperienceRange, setSelectedExperienceRange] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        getFormSelectFormData()
            .then((response: any) => {

                setLocationOptions(response.data.locations);

                setJobRoleOptions(response.data.roles);
            })
            .catch((error: any) => {
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const handleJobRoleChange = (selectedOption: any) => {
        setSelectedJobRole(selectedOption);
    };

    const handleLocationChange = (selectedOption: any) => {
        setSelectedLocation(selectedOption);
    };

    const handleJobTypeChange = (e: any) => {
        setSelectedJobType(e.target.value);
    };

    const handleSalaryRangeChange = (value: any) => {
        setSelectedSalaryRange(value);
    };

    const handleExperienceRangeChange = (value: any) => {
        setSelectedExperienceRange(value);
    };

    const handleApplyFilters = () => {

        setFilterData({
            search: null,
            jobRole: selectedJobRole?.value,
            location: selectedLocation?.value,
            jobType: selectedJobType,
            salaryRange: selectedSalaryRange.toString(),
            experienceRange: selectedExperienceRange.toString(),
        });
        navigate('/jobs/open-to-work/job-list')
    };

    const handleResetFilters = () => {

        setSelectedJobRole({ value: "" });
        setSelectedLocation({ value: "" });
        setSelectedJobType("");
        setSelectedSalaryRange(0);
        setSelectedExperienceRange(0);
        setFilterData({
            search: null,
            jobRole: null,
            location: null,
            jobType: null,
            salaryRange: null,
            experienceRange: null,
        });

        onReset();
    };



    return (
        <div className="bg-primary border border-green w-full rounded-lg">
            <Accordion>
                <Accordion.Panel>
                    <Accordion.Title className="text-xs focus:ring-0 ">Job Role</Accordion.Title>
                    <Accordion.Content>
                        <Select
                            className="text-xs"
                            value={selectedJobRole}
                            onChange={handleJobRoleChange}
                            options={jobRoleOptions?.map((value: string) => {
                                return { value: value, label: value }
                            })}
                            placeholder="Select job role..."
                        />
                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
                    <Accordion.Title className="text-xs focus:ring-0">Job Type</Accordion.Title>
                    <Accordion.Content>
                        <div className="my-2">
                            <label className="text-xs flex gap-2 dark:text-green">
                                <input
                                    className="focus:bg-green-600 focus:ring-0 "
                                    type="radio"
                                    value="Work from Office"
                                    checked={selectedJobType === "Work from Office"}
                                    onChange={handleJobTypeChange}
                                />
                                <span className={`radio-btn ${selectedJobType === "Work from Office" ? "radio-selected" : ""}`}></span> Work from Office
                            </label>
                        </div>
                        <div className="my-2">
                            <label className="text-xs flex gap-2 dark:text-green">
                                <input
                                    className="focus:bg-green-600 focus:ring-0"
                                    type="radio"
                                    value="Hybrid"
                                    checked={selectedJobType === "Hybrid"}
                                    onChange={handleJobTypeChange}
                                />
                                <span className={`radio-btn ${selectedJobType === "Hybrid" ? "radio-selected" : ""}`}></span> Hybrid
                            </label>
                        </div>
                        <div className="my-2">
                            <label className="text-xs flex gap-2 dark:text-green">
                                <input
                                    className="focus:bg-green-600 focus:ring-0"
                                    type="radio"
                                    value="Work from Home"
                                    checked={selectedJobType === "Work from Home"}
                                    onChange={handleJobTypeChange}
                                />
                                <span className={`radio-btn ${selectedJobType === "Work from Home" ? "radio-selected" : ""}`}></span> Work from Home
                            </label>
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
                    <Accordion.Title className="text-xs focus:ring-0">Job Location</Accordion.Title>
                    <Accordion.Content>
                        <Select
                            className="text-xs"

                            value={selectedLocation}
                            onChange={handleLocationChange}
                            options={locationOptions?.map((value: string) => {
                                return { value: value, label: value }
                            })}
                            placeholder="Select job location..."
                        />
                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
                    <Accordion.Title className="text-xs focus:ring-0">Salary</Accordion.Title>
                    <Accordion.Content>
                        <div className="flex justify-between">
                            <p className="text-xs text-gray-500">0</p>
                            <p className="text-xs text-gray-500">1000k</p>
                            <p className="text-xs text-gray-500">2000k</p>
                            <p className="text-xs text-gray-500">3000k</p>
                            <p className="text-xs text-gray-500">4000k</p>

                            <p className="text-xs text-gray-500">5000k</p>
                        </div>
                        <Slider
                            min={0}
                            max={5000000}
                            defaultValue={selectedSalaryRange}
                            onChange={handleSalaryRangeChange}
                        />
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title className="text-xs focus:ring-0">Experience</Accordion.Title>
                    <Accordion.Content>
                        <div className="flex justify-between">
                            <p className="text-xs text-gray-500">0</p>
                            <p className="text-xs text-gray-500">5</p>
                            <p className="text-xs text-gray-500">10</p>
                            <p className="text-xs text-gray-500">15</p>
                            <p className="text-xs text-gray-500">20</p>

                            <p className="text-xs text-gray-500">25</p>
                        </div>
                        <Slider
                            min={0}
                            max={25}
                            defaultValue={selectedExperienceRange}
                            onChange={handleExperienceRangeChange}
                        />
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>

            <div className="flex justify-end p-4  pt-16">
                <button
                    className=" bg-white hover:border duration-300 text-green-600 text-xs rounded btn border px-4 py-2 cursor-pointer  hover:text-white ml-2  hover:bg-green-600"
                    onClick={handleApplyFilters}
                >
                    Apply Filters
                </button>
                <button
                    className="  hover:bg-white hover:border duration-300 hover:text-green-600 text-xs rounded btn border  px-4 py-2 cursor-pointer text-gray-400 ml-2"
                    onClick={handleResetFilters}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default JobFilterForm;
