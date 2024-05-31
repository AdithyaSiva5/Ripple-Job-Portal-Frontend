import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AdminRouter from './routes/AdminRouter';
import UserRouter from './routes/UserRouter';
import { Toaster } from "sonner";

function App() {

  return (
    <>
       
    <Router>
    <Toaster
  toastOptions={{
    unstyled: true,
    classNames: {
      error: 'text-red-600 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
      success: 'text-green-600 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
      warning: 'text-gray-300 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md', 
      info: 'text-black text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
    },
  }}
/>
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/*" element={<UserRouter />} />
      </Routes>
    </Router>
  </>
  )
}

export default App
