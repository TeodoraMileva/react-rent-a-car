import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CustomerForm.scss';
import { useEffect, useState } from 'react';
import { saveCustomer, getCustomerById, getLoggedCustomer} from '../../../utils/http-utils/customer-requests';
import { useNavigate, useParams } from 'react-router-dom';

export function CustomerForm() {

    const params = useParams();
    const navigate = useNavigate();
    const loggedCustomer = getLoggedCustomer();

    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if(params.id){
            getCustomerById(params.id).then(response => {
                setCustomer(response.data);
            });
        }
    }, [params.id])

    const onFormSubmit = (event) => {
        event.preventDefault();
        
        saveCustomer(customer).then(() => {
            navigate('/customers-list');
        })
    }

    const onInputChange = (event) => {
        setCustomer((pervState) => {
            return {
                ...pervState,
                [event.target.name]: event.target.value
            }
        })
    }

    const getRoleSelect = () => {
        if (loggedCustomer.role === "admin"){
            return (
                <Form.Group className="mb-3" controlId="formBasicRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Select name="role" value={customer.role} onChange={onInputChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </Form.Select>
                </Form.Group>
            );
        }
    }

    return (
        <div className="customer-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <h3>{ customer.id ?  'Edit customer' : 'Create customer'}</h3>
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

                { getRoleSelect() }

                <Button variant="primary" type="submit">
                   { customer.id ?  'Edit' : 'Create'}
                </Button>
            </Form>
        </div>
    );
}