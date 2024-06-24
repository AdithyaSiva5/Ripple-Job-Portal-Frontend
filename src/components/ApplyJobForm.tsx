import { Button, Modal, Spinner } from "flowbite-react";
import { X } from "lucide-react";
import {  useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

function ApplyJobForm({ job, cancelApplyJob }: any) {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    resume: Yup.mixed().required('Resume is required').test('fileSize', 'File too large', (value:any) => value && value.size <= 5000000).test('fileType', 'Invalid file type', (value:any) => value && value.type === 'application/pdf'),
    coverLetter: Yup.string().required('Cover letter is required'),
  });

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    setLoading(true);

    try {
      const formData = new FormData() as any;

      formData.append('jobId', job._id);
formData.append('applicantId', userId);
formData.append('coverLetter',values.coverLetter);
formData.append('resume',  values.resume); 
   

 
console.log(formData.userId);
const response = await axios.post(' http://localhost:3000/api/job/apply-job', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});



if(response.status==201){
  toast.success(response.data.message)
}else{
  toast.error(response.data.message)
}

resetForm();
cancelApplyJob()
} catch (error) {
console.error('Error uploading file:', error);
} finally {
setLoading(false);
setSubmitting(false);
}
};
  return (
    <Modal show={true}  className="bg-transparent">
      <Modal.Body>
        <div className='flex  justify-between items-center mb-3'>
          <p className='text-sm font-semibold'>Apply Job</p>
          <button onClick={() => cancelApplyJob()}>
            <X size={18} color='gray' />
          </button>
        </div>
      </Modal.Body>

      <Modal.Footer className="flex flex-col">
      
        <Formik 
          initialValues={{ resume: null, coverLetter: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="w-full p-5">
                <div className="w-full mb-4  text-xs  rounded-md">
                  <div className="flex gap-2">
                  <p className="text-xs text-gray-600 ">Applying for the postion of :</p><p className="font-semibold">{job.jobRole}</p>

                  </div>
                  <div className="flex gap-2">
                  <p className="text-xs text-gray-600 ">Applying at :</p> <p className="font-semibold">{job.companyName}</p>

                  </div>
                
                 


</div>
               
              <div className="mb-4 w-full flex flex-col gap-2">
                <label className="text-xs text-gray-600 " htmlFor="coverLetter">Cover Letter:</label>
                <Field name="coverLetter"  className="h-40 text-xs p-3 w-full border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
            as="textarea"/>
                <ErrorMessage name="coverLetter" component="div" className="text-red-500" />
              </div>
              <div className="mb-4 w-full flex flex-col gap-2">
  <label className="text-xs text-gray-600" htmlFor="resume">Resume (PDF only):</label>
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
  <ErrorMessage name="resume" component="div" className="text-red-500" />
</div>


              <div className="buttons flex justify-end w-full">
                <div
                  onClick={() => cancelApplyJob()}
                  className="text-xs rounded btn border border-gray-300 px-4 py-2 cursor-pointer text-gray-500 ml-auto hover:bg-red-600 hover:text-white "
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
                    className="text-xs rounded btn border px-4 py-2 cursor-pointer text-white ml-2 bg-gray-900 hover:bg-green-600 "
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
