
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import { editJob, getJobDetails } from '../services/api/user/apiMethods';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
const EditJob = () => {


  const selectUser = (state: any) => state.auth.user || ''; 
  const user = useSelector(selectUser) || '';
  const userId = user._id || '';
  const { jobId } = useParams();
  const[job,setJob]=useState<any>({})
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getJobDetails({ jobId: jobId })
      .then((response: any) => {
       
        setJob(response.data.job);
      })
      .catch((error: any) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);




  

  const initialValues = {
    companyName: job.companyName || '',
    jobRole: job.jobRole || '',
    experience: job.experience || '',
    salary: job.salary || '',
    jobType: job.jobType || '',
    jobLocation: job.jobLocation || '',
    lastDateToApply: job.lastDateToApply?new Date(job.lastDateToApply).toISOString().slice(0, 10):'',
    requiredSkills: job.requiredSkills || '',
    jobDescription: job.jobDescription || '',
    qualification: job.qualification || '',
  };

  const validationSchema = Yup.object({
    companyName: Yup.string()
      .trim()
      .required('Company name is required'),
    jobRole: Yup.string()
      .trim()
      .required('Job role is required')
      .matches(/^[^\d]+$/, 'Job role cannot contain numbers'),
    experience: Yup.number()
      .typeError('Experience must be a number')
      .required('Experience is required')
      .min(0, 'Experience cannot be less than 0'),
      salary: Yup.number()
      .typeError('Salary must be a number')
      .required('Salary is required')
      .min(0, 'Salary cannot be less than 0'),
  
    jobType: Yup.string()
      .trim()
      .required('Job type is required'),
    jobLocation: Yup.string()
      .trim()
      .required('Job location is required')
      .matches(/^[^\d]+$/, 'Job Location cannot contain numbers'),
    lastDateToApply: Yup.date()
      .required('Last date to apply is required')
      .min(new Date(), 'Last date to apply must be a future date'),
    requiredSkills: Yup.string()
      .trim()
      .required('Required skills are required')
      .matches(/^[^\d]+$/, 'skills  cannot contain numbers'),
    jobDescription: Yup.string()
      .trim()
      .required('Job description is required'),
    qualification: Yup.string()
      .trim()
      .required('Qualification is required')
      .matches(/^[^\d]+$/, 'Qualification cannot contain numbers')
      , 
  });

  const handleSubmit = (values:any, { setSubmitting }:any) => {
   

    
    const data = { ...values, jobId:jobId }
    editJob(data).then((response: any) => {
      const data = response.data;
      if (response.status === 200) {
        toast.success(data.message);
       
      } else {
        console.log(response.message);
        toast.error(data.message);
      }
    })
    .catch((error:any) => {
      toast.error(error?.message);
      console.log(error?.message);
    })





    setSubmitting(false);
  
    

  };

  return (

    <div>

      {!loading&&(
            <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className='px-10 pb-10 py-5 text-sm  bg-white ms-5 mt-5 rounded-md'>
                <p className='mb-4'>Edit Job</p>
                <hr className='mb-4' />
          
              <div className='flex w-full gap-3'>
              <div className='w-full'>
                  <label className='text-xs text-gray-600 mt-3'  htmlFor="companyName">Company Name:</label>
                  <Field 
                  className="text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                    type="text" id="companyName" name="companyName" />
                  <ErrorMessage name="companyName"  component={TextError} />
                </div>
      
                <div className='w-full'>
                  <label className='text-xs text-gray-600 mt-3'  htmlFor="jobRole">Job Role:</label>
                  <Field
                  className="text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                  type="text" id="jobRole" name="jobRole" />
                  <ErrorMessage name="jobRole"  component={TextError} />
                </div>
      
                 <div className='w-full'>
                  <label className='text-xs text-gray-600 mt-3'  htmlFor="experience">Experience:</label>
                  <Field 
                  className=" text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"            type="text" id="experience" name="experience" />
                  <ErrorMessage name="experience"  component={TextError} />
                </div>
      
              </div>
              <div className='flex w-full gap-3 mt-6'>
                
              <div className='w-full'>
                  <label className='text-xs text-gray-600 mt-3'  htmlFor="salary">Salary:</label>
                  <Field 
                  className=" text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                  type="text" id="salary" name="salary" />
                  <ErrorMessage name="salary"  component={TextError} />
                </div>
      
                <div className='w-2/3'>
                  <label className='text-xs text-gray-600 mt-3' htmlFor="jobType">Job Type:</label>
                  <Field
                    as="select"
                    className="text-xs text-gray-500 p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                    id="jobType"
                    name="jobType"
                  >
                    <option value="">Select Job Type</option>
                    <option value="Work from Office">Work from Office</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Work from Home">Work from Home</option>
                  </Field>
                  <ErrorMessage name="jobType" component={TextError} />
                </div>
      
                <div className='w-full'>
                  <label className='text-xs text-gray-600 mt-3'  htmlFor="jobLocation">Job Location:</label>
                  <Field
                  className=" text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                  type="text" id="jobLocation" name="jobLocation" />
                  <ErrorMessage name="jobLocation"  component={TextError} />
                </div>
      
              </div >
              <div className='flex w-full gap-3 mt-6'>
                
              <div className='w-1/3'>
                  <label className='text-xs text-gray-600 mt-3'  htmlFor="lastDateToApply">Last Date to Apply:</label>
                  <Field
                  className="text-xs text-gray-400 p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                  type="date" id="lastDateToApply" name="lastDateToApply" />
                  <ErrorMessage name="lastDateToApply"  component={TextError} />
                </div>
      
                <div className='w-full'>
                  <label className='text-xs text-gray-600 mt-3'  htmlFor="requiredSkills">Required Skills:</label>
                  <Field 
                  className=" text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                  type="text" id="requiredSkills" name="requiredSkills" />
                  <ErrorMessage name="requiredSkills"  component={TextError} />
                </div>
      
      
                <div className='w-full'>
                  <label className='text-xs text-gray-600 mt-3'  htmlFor="qualification">Qualification:</label>
                  <Field 
                  className="text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                  type="text" id="qualification" name="qualification" />
                  <ErrorMessage name="qualification"  component={TextError} />
                </div>
      
              </div>
              
      
      
                
                <div className='mt-6'>
                  <label className='text-xs text-gray-600 mt-3'  htmlFor="jobDescription">Job Description:</label>
                  <Field
                  className=" text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
                  as="textarea" id="jobDescription" name="jobDescription" />
                  <ErrorMessage name="jobDescription"  component={TextError} />
                </div>
      
      
                <div className="w-full flex justify-end mt-10">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className=" text-xs rounded btn border w-24 px-4 py-2 cursor-pointer text-white ml-2 bg-gray-900  hover:bg-green-600"
                            >
                              Edit Job
                            </button>
                          </div>
              </Form>
            )}
          </Formik>
      )}

    </div>

  );
};

export default EditJob;
