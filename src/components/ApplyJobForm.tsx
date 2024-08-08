import { Button, Modal, Spinner } from "flowbite-react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { BASE_URL } from "../constants/baseUrls";
import { updateUser } from "../utils/context/reducers/authSlice";

function ApplyJobForm({ job, cancelApplyJob }: any) {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [useCurrentResume, setUseCurrentResume] = useState(true);
  const [hasCurrentResume, setHasCurrentResume] = useState(false)
  useEffect(() => {
    if (user.profile && user.profile.resume) {
      setHasCurrentResume(true);
    }
  }, [user]);

  const validationSchema = Yup.object({
    coverLetter: Yup.string().required('Cover letter is required'),
  })

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('jobId', job._id);
      formData.append('applicantId', userId);
      formData.append('coverLetter', values.coverLetter);
      if (useCurrentResume && hasCurrentResume) {
        formData.append('useExistingResume', useCurrentResume.toString());
      } else if (!useCurrentResume && values.resume) {
        formData.append('resume', values.resume);
      } else {
        toast.error("Please select a resume to upload or use your current resume.");
        setLoading(false);
        setSubmitting(false);
        return;
      }

      const response = await axios.post(`${BASE_URL}/api/job/apply-job`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        dispatch(updateUser({ user: response.data }));
      } else {
        toast.error(response.data.message);
      }

      resetForm();
      cancelApplyJob();
    } catch (error: any) {
      console.error('Error applying for job:', error);
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred while applying for the job');
      } else if (error.request) {
        toast.error('No response received from server. Please try again.');
      } else {
        toast.error('An error occurred while applying for the job');
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  const handleUseCurrentResume = () => {
    if (hasCurrentResume) {
      setUseCurrentResume(true);
      toast.success("Using your current resume.");
    } else {
      setUseCurrentResume(false);
      toast.error("No resume found. Please add a resume in settings or choose a file.");
    }
  };

  return (
    <Modal show={true} className="bg-transparent ">
      <Modal.Body className="dark:border dark:border-green dark:border-b-0">
        <div className='flex justify-between items-center mb-3 '>
          <p className='text-sm font-semibold dark:text-white'>Apply Job</p>
          <button onClick={cancelApplyJob}>
            <X size={18} color='gray' />
          </button>
        </div>
      </Modal.Body>

      <Modal.Footer className="flex flex-col bg-secondary border dark:border-t-0 dark:border-green">
        <Formik
          initialValues={{ coverLetter: '', resume: null }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="w-full p-5">
              <div className="w-full mb-4 text-xs rounded-md">
                <div className="flex gap-2">
                  <p className="text-xs text-gray-600 dark:text-white">Applying for the position of:</p>
                  <p className="font-semibold dark:text-white">{job.jobRole}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-xs text-gray-600 dark:text-white">Applying at:</p>
                  <p className="font-semibold dark:text-white">{job.companyName}</p>
                </div>
              </div>

              <div className="mb-4 w-full flex flex-col gap-2">
                <label className="text-xs text-gray-600 dark:text-gray-400" htmlFor="coverLetter">Cover Letter:</label>
                <Field
                  name="coverLetter"
                  className="h-40 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                  as="textarea"
                />
                <ErrorMessage name="coverLetter" component="div" className="text-red-500" />
              </div>

              <div className="mb-4 w-full flex flex-col gap-2">
                <label className="text-xs text-gray-600 dark:text-gray-400">Resume:</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleUseCurrentResume}
                    className={`px-4 py-2 text-xs rounded ${useCurrentResume && hasCurrentResume ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                  >
                    Use Current Resume
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseCurrentResume(false)}
                    className={`px-4 py-2 text-xs rounded ${!useCurrentResume || !hasCurrentResume ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                  >
                    Choose File
                  </button>
                </div>
                {(!useCurrentResume || !hasCurrentResume) && (
                  <Field name="resume">
                    {({ form, field }: any) => (
                      <input
                        type="file"
                        id="resume"
                        className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                        name="resume"
                        accept=".pdf"
                        onChange={(event: any) => {
                          form.setFieldValue('resume', event.currentTarget.files[0]);
                        }}
                      />
                    )}
                  </Field>
                )}
                <ErrorMessage name="resume" component="div" className="text-red-500" />
              </div>

              <div className="buttons flex justify-end w-full">
                <div
                  onClick={cancelApplyJob}
                  className="text-xs rounded btn border border-gray-300 px-4 py-2 cursor-pointer text-gray-500 ml-auto hover:bg-red-600 hover:text-white dark:text-gray-400"
                >
                  Cancel
                </div>

                {loading ? (
                  <Button className="bg-gray-900 rounded ml-2" style={{ height: '35px' }}>
                    <Spinner aria-label="Spinner button example" />
                    <span className="pl-3 text-xs">Applying...</span>
                  </Button>
                ) : (
                  <button
                    type="submit"
                    className="text-xs rounded btn border px-4 py-2 cursor-pointer text-white ml-2 bg-gray-900 hover:bg-green-600"
                    disabled={isSubmitting}
                  >
                    Apply Job
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Footer>
    </Modal>
  );
}

export default ApplyJobForm;