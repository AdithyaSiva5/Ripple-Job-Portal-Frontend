import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Protect({children:any}) {

    const navigate = useNavigate()
    const isValid = useSelector((state)=> state?.user?.validUser);
    const user = useSelector((state)=> state?.user?.userData);

    if(user && isValid){
      return children
    } else {
      navigate("/login")
    }

  
}

export default Protect