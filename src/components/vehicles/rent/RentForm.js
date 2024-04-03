import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLoggedCustomer } from "../../../utils/http-utils/customer-requests";
import './RentForm.scss';
import { getRentalsByCustomerId, saveRental } from '../../../utils/http-utils/rental-requests';
import { getVehicleById } from '../../../utils/http-utils/vehicle-requests';

export function RentForm(){

    const params = useParams();
    const loggedCustomer = getLoggedCustomer();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [discountMessage, setDiscountMessage] = useState('');
    const [rentals, setRentals] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [oldPrice, setOldPrice] = useState(0);
    const [newPrice, setNewPrice] = useState(0);

    const [rental, setRental] = useState({
        customerId: loggedCustomer.id,
        vehicleId: params.id,
        startDateTime: "",
        endDateTime: ""
    });

    useEffect(() => {
        if(params.id){
            getRentalsByCustomerId(params.id).then(response => {
                setRentals(response.data);
            });
        }
    }, [params.id])

    const checkForDiscount = () => {
        var start = new Date(document.getElementById("formBasicStartDateTime").value);
        var end = new Date(document.getElementById("formBasicEndDateTime").value);

        var diffTime = Math.abs(end - start);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  
        
        if(diffDays > 10){
            setDiscountMessage(diffDays + ' days - 10% discount');
            setDiscount(10);
        }
        else if(diffDays > 5){
            setDiscountMessage(diffDays + ' days - 7% discount');
            setDiscount(7);
        }
        else if(diffDays > 3){
            setDiscountMessage(diffDays + ' days - 5% discount');
            setDiscount(5);
        }

        if(checkForVipCustomer()){
            setDiscountMessage('VIP Customer - 15% discount');
            setDiscount(15);
        }

    }

    const checkForVipCustomer = () => {
        const today = new Date();

        if (rentals.length > 3){
            return rentals.filter((rental) => {
                var diffTime = Math.abs(today - new Date(rental.startDateTime));
                var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 60;
            }).length > 3
        } 

        return false;
    }

    const onInputChange = (event) => {
        setRental((pervState) => {
            return {
                ...pervState,
                [event.target.name]: event.target.value
            }
        })
        setError('');
        setDiscountMessage('');
        checkForDiscount();
        getOldPrice();
    }

    useEffect(() => {
        getNewPrice();
    }, [oldPrice, discount])

    const getOldPrice = () => {
        getVehicleById(params.id).then((response) => setOldPrice(response.data.pricePerDay));
    }

    const getNewPrice = () => {
        setNewPrice(oldPrice - (oldPrice * discount /100));
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        
        saveRental(rental).then(() => {
            navigate('/vehicles-list');
        })
        .catch(error => setError(error.message));
    }

    return(
        <div className="rent-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <h3>Rent vehicle</h3>
                { error && <span className="text-danger">{error}</span> }
                <Form.Group className="mb-3" controlId="formBasicStartDateTime">
                    <Form.Label>Start date and time</Form.Label>
                    <Form.Control type="datetime-local" name="startDateTime" min={new Date()} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEndDateTime">
                    <Form.Label>End date and time</Form.Label>
                    <Form.Control type="datetime-local" name="endDateTime" min={new Date()} onChange={onInputChange} required/>
                </Form.Group>
                { discountMessage && !error && <span className="text-danger">{discountMessage}</span> }<br></br>
                { discountMessage && <span className="text-danger">Old price: {oldPrice} BGN |</span>}
                { discountMessage && <span className="text-danger"> New price: {newPrice} BGN</span>}<br></br>
                <Button variant="primary" type="submit">
                   Rent
                </Button>
            </Form>
        </div>
    );
}