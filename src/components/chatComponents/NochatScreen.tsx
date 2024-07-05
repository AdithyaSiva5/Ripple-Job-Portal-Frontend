import { ChevronLeft} from "lucide-react"
import {useLocation,useNavigate} from 'react-router-dom';

function NochatScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    
    <div className="relative flex flex-col flex-1  items-center justify-center">
            <button onClick={()=>{navigate(location.state?.from || "/home")}}  className=" fixed top-3 right-1 text-xs bg-white flex self-center p-2 mx-2 text-gray-500 rounded-md border focus:outline-none hover:text-gray-600 hover:bg-gray-300">
      <ChevronLeft size={18}/> Back
      </button> 
     
        <div  className="flex flex-col items-center"  >
            <img className="w-60" src="https://i.postimg.cc/wvvhmZhZ/ripple-logo.png" alt="" />
            <p className="mt-5 font-medium">Ripple Messages</p>
            <p className="text-xs text-gray-600">Connect with professionals, start a conversation, and connect up your connections!</p>
            <p></p>

        </div>
        </div>
  )
}

export default NochatScreen