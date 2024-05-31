import './changePassword.css'
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../../../components/TextError";
import {
  validationSchema,
  FormValues,
  initialValues,
} from "../../../utils/validation/changePasswordValidation";
import { useNavigate } from "react-router-dom";
import { renewPassword } from "../../../services/api/user/apiMethods";


function ChangePassword() {
  const navigate = useNavigate();

  const submit =(values:FormValues)=>{
    renewPassword(values).then((response:any)=>{
      const data = response.data;
      toast.success(data.message);
      navigate('/login')
    }).catch((error)=>{
      toast.error(error.message);
    })
  }



  return (
     
   
    <div className="flex h-screen">
      <div id='login' className="hidden login lg:flex items-center justify-center flex-1 bg-white text-black" >


      </div>

      <div className="w-full  lg:w-1/2 flex items-center justify-center">
        <div className='logo'>   <img src="https://i.postimg.cc/wvvhmZhZ/ripple-logo.png" alt="" /></div>
        
        <div className="max-w-md w-full p-6" >
          <p className="title text-4xl font-black  mb-2 text-black ">Set new password.</p>
          <h1 className="text-sm  mb-6 text-gray-500 ">Please use a strong password</h1>
           <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
            >
          <Form >
          
            <div>
              
              <Field type="password"  placeholder='Password' name="password" className="mt-5 text-xs p-3 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300" />
              <ErrorMessage name="password" component={TextError} />
            </div>
            <div className='mt-5'> 
          
              <Field type="password" placeholder='Confirm Password' name="confirmPassword" className="mt-1 text-xs p-3 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300" />
              <ErrorMessage name="confirmPassword" component={TextError} />
            </div>

            <div>
              <button type="submit" className="w-full text-sm bg-green-600 text-white p-3 mt-8 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Reset Password</button>
            </div>
          </Form>
          </Formik>
  
        </div>
      </div>
    </div>
  )
}

export default ChangePassword