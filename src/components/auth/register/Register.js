import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Register.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerCustomer } from '../../../utils/http-utils/customer-requests';

export function Register() {

    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');

    const onInputChange = (event) => {
        setCustomer((pervState) => {
            return{
                ...pervState,
                [event.target.name]: event.target.value
            }
        });
        setError('');
    }

    const onFormSubmit = (event) => { 
        event.preventDefault();

        registerCustomer(customer).then(() => {
            navigate('/customers-list');
        })
        .catch(error => setError(error.message));
    }

    return (
        <div className="customer-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <h3>Register</h3>
                { error && <span className="text-danger">{error}</span> }
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" value={customer.name} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={customer.email} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone" name="phone" value={customer.phone} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={customer.password} onChange={onInputChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button><br/>

                <Link to='/login'>Already have an account?</Link>
            </Form>
        </div>
    );
}