import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';    
import { useState } from 'react';
import { login } from '../../../utils/http-utils/customer-requests';
import { Link, useNavigate } from 'react-router-dom';

export function Login(){

    const [customer, setCustomer] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onInputChange = (event) => {
        setCustomer((pervState) => ({
            ...pervState,
            [event.target.name]: event.target.value
        }))
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        login(customer).then(() => {
            navigate('/vehicles-list');
        }).catch(error => setError(error.message))
    }

    return(
        <div className="customer-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <h3>Login</h3>
                { error && <span className="text-danger">{error}</span> }

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={customer.email} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={customer.password} onChange={onInputChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button><br/>

                <Link to='/register'>Sign up</Link>
            </Form>
        </div>
    );
}