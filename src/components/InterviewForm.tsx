import { Modal } from "flowbite-react";
import { X } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { addDays } from 'date-fns';
import TextError from "./TextError";
import { addInterview, getUserConnection, pl } from "../services/api/user/apiMethods";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation, useParams } from "react-router-dom";




const validationSchema = Yup.object().shape({
    interviewDate: Yup.date()
        .min(addDays(new Date(), -1), 'Interview date cannot be before today')
        .required('Interview date is required'),
    interviewTime: Yup.string().required('Interview time is required'),
    jury: Yup.array().min(1, 'Select at least one jury member'),
});




function InterviewForm({ application, cancelscheduleInterview, setApplications }: any) {

    const { jobId } = useParams();
    const location = useLocation()
    const { pathname } = location;



    const selectUser = (state: any) => state.auth.user;

    const userData = useSelector(selectUser);

    const userId = userData._id;
    const [connections, setConnections] = useState<any>(null);


    const juryOptions = connections?.map((values: any) => ({
        value: values._id,
        label: values.profile.fullname ? values.profile?.fullname : values.companyProfile?.companyName
    }));



    useEffect(() => {
        try {


            getUserConnection({ userId })
                .then((response: any) => {
                    const connectionData = response.data.connection;
                    setConnections(connectionData.connections);


                    console.log(response.data.connection.connections);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);


    const handleSubmit = (values: any, { setSubmitting }: any) => {

        const applicationId = application._id
        const jury = values.jury
        const interviewDate = values.interviewDate
        const interviewTime = values.interviewTime




        addInterview({ applicationId, jury, interviewDate, interviewTime }).then((response: any) => {
            const applicationsData = response.data.applications


            switch (pathname) {
                case `/jobs/view-job/applications/pending/${jobId}`:
                    setApplications(applicationsData.filter((app: any) => app.applicationStatus === 'Pending'));
                    break;
                case `/jobs/view-job/applications/accepted/${jobId}`:
                    setApplications(applicationsData.filter((app: any) => app.applicationStatus === 'Accepted'));
                    break;
                case `/jobs/view-job/applications/rejected/${jobId}`:
                    setApplications(applicationsData.filter((app: any) => app.applicationStatus === 'Rejected'));
                    break;
                default:
                    setApplications(applicationsData);
                    break;
            }

            toast.success(response.data.message)
            cancelscheduleInterview()
        })
            .catch((error) => {
                console.log(error.message);
            });
        setSubmitting(false);
    };

    return (
        <>
            <Modal show={true}>
                <Modal.Body>
                    <div className='flex justify-between items-center'>
                        <p className='text-sm font-semibold'>Schedule Interview</p>
                        <button onClick={() => cancelscheduleInterview()}>
                            <X size={18} color='gray' />
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex ">
                    <Formik
                        initialValues={{
                            interviewDate: '',
                            interviewTime: '',
                            jury: [],
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="w-full">
                                <div className="flex w-full justify-between px-3">
                                    <div className="w-1/2">
                                        <label className='text-xs text-gray-600 mt-3' htmlFor="interviewDate">Interview Date</label>
                                        <Field className="text-xs  w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                                            type="date" id="interviewDate" name="interviewDate" />
                                        <ErrorMessage name="interviewDate" component={TextError} className="error-message" />
                                    </div>

                                    <div className="w-1/2 ms-3">
                                        <label className='text-xs  text-gray-600 mt-3' htmlFor="interviewTime">Interview Time</label>
                                        <Field
                                            className="text-xs  w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"

                                            type="time" id="interviewTime" name="interviewTime" />
                                        <ErrorMessage name="interviewTime" component={TextError} className="error-message" />
                                    </div>

                                </div>


                                <div className="w-full mt-4 ">
                                    <label className='text-xs text-gray-600 ms-3 mt-3' htmlFor="jury">Jury Members</label>
                                    <Select
                                        className="text-xs  text-gray-500 p-3 w-full rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                                        id="jury"
                                        name="jury"
                                        options={juryOptions}
                                        isMulti
                                        placeholder="Select jury members"
                                        onChange={(selectedOptions) => {
                                            setFieldValue('jury', selectedOptions.map((option: any) => option.value));
                                        }}
                                    />
                                    <ErrorMessage name="jury" component={TextError} className="error-message" />
                                </div>

                                <div className="buttons flex justify-end w-full mt-6">
                                    <div
                                        onClick={() => cancelscheduleInterview()}
                                        className="text-xs rounded btn border border-gray-300 px-4 py-2 cursor-pointer text-gray-500 ml-auto hover:bg-red-600 hover:text-white "
                                    >
                                        Cancel
                                    </div>
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="text-xs rounded btn border px-4 py-2 cursor-pointer text-white ml-2 bg-gray-900 hover:bg-green-600 "
                                    >
                                        Schedule Interview
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default InterviewForm;
