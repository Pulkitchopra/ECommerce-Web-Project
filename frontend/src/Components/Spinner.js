import { useState, useEffect } from 'react';
import {useNavigate, useLocation} from "react-router-dom"
function Spinner({path = 'login'}) {
  

  const [count, setCount] = useState(5)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const interval = setInterval(()=> {


      setCount((prevValue) => --prevValue)
    }, 1000);
    count === 0 && navigate('/login', {
  
      state: location.pathname
    })

    return () => clearInterval(interval)

  }, [count, navigate, location, path])
  return (
    <div className="d-flex justify-content-center align-items-center">
    <p className='Text-center'>Redirecting in {count}</p>

  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
  );
}

export default Spinner;