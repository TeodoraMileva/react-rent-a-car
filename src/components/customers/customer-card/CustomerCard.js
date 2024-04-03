import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { getLoggedCustomer } from '../../../utils/http-utils/customer-requests';
import './CustomerCard.scss';

export function CustomerCard({ customer, deleteCustomer}) {

    const loggedCustomer = getLoggedCustomer();
    const navigate = useNavigate();
    const redirectToDetails = () => {
        navigate(`/customer/${customer.id}`);
    }

    const redirectToEdit = () => {
        navigate(`/customer/edit/${customer.id}`);
    }

    if (!customer) {
        return <p>No customer!</p>
    }

    const renderEditButton = () => {
        if(loggedCustomer.role === "admin"){
            return <Button variant="primary" onClick={redirectToEdit}>Edit</Button>;
        }
    }

    const renderDeleteButton = () => {
        if(loggedCustomer.role === "admin"){
            return <Button variant="danger" onClick={() => deleteCustomer(customer.id)}>Delete</Button>;
        }
    }

    return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ customer.picture } />
            <Card.Body>
                <Card.Title>{ customer.name }</Card.Title>
                <Card.Text>
                    <span className='key'>Email: </span>
                    <span className='value'>{ customer.email }</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Phone: </span>
                    <span className='value'>{ customer.phone }</span>
                </Card.Text>
                <div className='btn-holder'>
                    { renderEditButton() }
                    { renderDeleteButton() }
                    <Button variant="info" onClick={redirectToDetails}>Details</Button>
                </div>
                
            </Card.Body>
        </Card>
    );

}