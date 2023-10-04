import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import Template from '../Components/Template/Template'
import axios from 'axios';

import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
const Register = () => {
    const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [question, setQuestion] = useState('')
  const navigate = useNavigate();

  const handleSubmit =  async (e) => {
    e.preventDefault()
    
    try{
      const res = await axios.post('/api/v1/auth/register',
      {name,email,password,phone,address,question});
      if(res.data.success){
        
        navigate('/login');
       
      }else{
        
      }

    }catch(error){
      
    }
  }


  return (
    <Template>



    <div>
    <div className='register-container pb-0 shadow p-3 mb-5 rounded'>
    <h1 className='text-center m-3'>Register</h1>




    <Form onSubmit={handleSubmit}>
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
     
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>





      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" placeholder="Enter your number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicQuestion">
        <Form.Label>Question</Form.Label>
        <Form.Control type="text" placeholder="Enter your question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
      </Form.Group>


      <div className='m-3'>  
      <Button variant="primary" type="submit">
        Submit

      </Button>
      </div>
      <Link to={'/login'} >
        <p className='text-center'>Already Have An Account? Login</p>
      </Link>


      
    </Form>
    </div>
    </div>
    </Template>
  )
}

export default Register
