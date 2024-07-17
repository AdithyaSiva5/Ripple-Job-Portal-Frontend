
import { Formik,Form,Field ,ErrorMessage} from 'formik';
import './login.css'
import TextError from '../../../components/TextError';
import {initialValues,validationSchema} from '../../../utils/validation/loginValidation'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { Fingerprint } from "lucide-react";
import { adminPostLogin } from '../../../services/api/admin/apiMethods';
import { AdminLoginSuccess} from '../../../utils/context/reducers/adminAuthSlice';


function AdminLogin() {
  const navigate = useNavigate();
      const dispatch = useDispatch();
  const submit = (values: any) => {
  
    adminPostLogin(values).then((response:any) => {

      const data = response.data
      if(response.status === 200) {
       toast.success(data.message)
       dispatch(AdminLoginSuccess({ admin: data }));
        navigate('/admin/');
      } else {
        console.log(response.message);
        toast.error(data.message)
      }
    }).catch((error) => {
      console.log(error?.message)
      toast.error(error?.message);
    })
  };



  return (
   
   
    <div className="flex h-screen items-center justify-center  bg-gray-100">


      
        <div className='logo'>   <img src="https://i.postimg.cc/wvvhmZhZ/ripple-logo.png" alt="" /></div>
        
        <div className="max-w-md w-full p-10 rounded-xl bg-white" >
          <p className="title flex gap-2 items-center text-4xl font-black  mb-2 text-black ">Admin Login. <Fingerprint/></p>
          <h1 className="text-sm  mb-6 text-gray-500 ">only authorized persons allowed</h1>
          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
    
          </div>

          <Formik       initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}>
          <Form className="space-y-4">
          
            <div>
              
              <Field type="text" id="email" placeholder='Email' name="email" className="mt-3 text-xs p-3 w-full border  border-gray-200 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300" />
              <ErrorMessage name="email" component={TextError} />
            </div>
            <div>
          
              <Field type="password" placeholder='Password' id="password" name="password" className="mt-1 text-xs p-3 w-full border border-gray-200 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300" />
              <ErrorMessage name="password"  component={TextError}/>

            </div>
     
            <div>
              <button type="submit" className="w-full text-sm bg-green-600 text-white p-3 mt-5 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Login</button>
            </div>
          </Form>
          </Formik>
       
    
        </div>
      </div>
    
  )
}

export default AdminLogin 