import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import Template from '../Components/Template/Template'
import axios from 'axios';

import { useNavigate, useLocation } from 'react-router-dom'
import {useAuth} from '../context/auth'
import {Link} from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useAuth("");

  const navigate = useNavigate();
  
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/v1/auth/login',
        { email, password });


      if (res.data.success) {
       



        
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate(location.state || '/');

      } else {
        



      }

    } catch (error) {
      
    }
  }

  return (
    <Template>

    


    
    <div className='container'>


          <div className='login-container pb-0 shadow p-3 mb-5 rounded'>
    <h1 className='text-center m-3'>Login</h1>
          
            <Form onSubmit={handleSubmit}>
              
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>
              <Link to={'/forgot-password'} >
                <p>Forgot Password?</p>
              </Link>
              <div className='m-3'>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              </div>


              <Link to={'/register'} >

                <p className='text-center'>Not Registered? Create an Account</p>
              </Link>
            </Form>
            
          </div>



    

    </div>
    </Template>
  )
}

export default Login
