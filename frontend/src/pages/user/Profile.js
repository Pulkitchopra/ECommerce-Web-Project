import React, {useState, useEffect} from 'react'
import Template from '../../Components/Template/Template'
import UserMenu from '../../Components/UserMenu'

import axios from 'axios';
import { useAuth } from '../../context/auth';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Profile = () => {
  const [auth, setAuth] = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const [address, setAddress] = useState('')



  useEffect(() => {
    const {email, name, phone, address} = auth?.user;
    setEmail(email)
    setName(name)
    setPhone(phone)
    setAddress(address)

  }, [auth?.user])
  const handleSubmit =  async (e) => {
    e.preventDefault()
    
    try{
      const {data} = await axios.put('/api/v1/auth/profile',
      {name,email,password,phone,address});
      if(data?.error){
        console.log(data?.error)
      }else{
        setAuth({...auth, user:data?.updatedUser })

        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls))
        console.log("Updated ")
      }

    }catch(error){
      console.log(error)
    }
  }


  return (
    <Template>
    <div className='container m-3 p-3'>
    <div className='row'> 
        <div className='col-md-3'>
        <UserMenu/>
        </div>
        <div className='col-md-9'>
        <div className='profile container'>

        
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} disabled  />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" placeholder="Enter your number" value={phone} onChange={(e) => setPhone(e.target.value)}  />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)}  />
 
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

        </div>
        

        </div>    
        </div>    
    </div>


    </Template>
  )
}


export default Profile
