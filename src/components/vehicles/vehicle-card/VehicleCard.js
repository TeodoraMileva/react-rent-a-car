import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { getLoggedCustomer } from '../../../utils/http-utils/customer-requests';
import './VehicleCard.scss';

export function VehicleCard({ vehicle, deleteVehicle }){

    const loggedCustomer = getLoggedCustomer();
    const navigate = useNavigate();
    const redirectToDetails = () => {
        navigate(`/vehicle/${vehicle.id}`); 
    }

    const redirectToEdit = () => {
        navigate(`/vehicle/edit/${vehicle.id}`);
    }

    const redirectToRent = () => {
        navigate(`/vehicle/rent/${vehicle.id}`);
    }

    if(!vehicle){
        return <p>No vehicle found!</p>
    }

    const renderEditButton = () => {
        if(loggedCustomer.role === "admin"){
            return <Button variant="primary" onClick={redirectToEdit}>Edit</Button>;
        }
    }

    const renderDeleteButton = () => {
        if(loggedCustomer.role === "admin"){
            return <Button variant="danger" onClick={() => deleteVehicle(vehicle.id)}>Delete</Button>;
        }
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={vehicle.picture}/>
            <Card.Body>
                <Card.Title>{vehicle.brand}</Card.Title>
                <Card.Text>
                    <span className='key'>Vehicle type: </span>
                    <span className='value'>{vehicle.vehicleType}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Price per day: </span>
                    <span className='value'>{vehicle.pricePerDay} BGN</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Count of vehicles: </span>
                    <span className='value'>{vehicle.count}</span>
                </Card.Text>
                <div className='btn-holder'>
                    { renderEditButton() }
                    { renderDeleteButton() }
                    <Button variant="info" onClick={redirectToDetails}>Details</Button>
                    <Button variant="secondary" onClick={redirectToRent}>Rent</Button>
                </div>
            </Card.Body>
        </Card>
    );
}