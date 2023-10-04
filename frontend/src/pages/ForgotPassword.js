import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import Template from '../Components/Template/Template'
import axios from 'axios';

import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {



    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [question, setQuestion] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('/api/v1/auth/forgot-password',
                { email, newPassword, question });
            if (res.data.success) {
                

                navigate('/login');

            } else {
                
            }

        } catch (error) {
            
        }
    }
    return (
        <Template>
            <div>


                <div className='login-container pb-0 shadow p-3 mb-5 rounded'>
                <h1 className='text-center m-3'>Login</h1>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicQuestion">
                            <Form.Label>Question</Form.Label>
                            <Form.Control type="text" placeholder="Enter answer" value={question} onChange={(e) => setQuestion(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </Template>
    )
}

export default ForgotPassword
