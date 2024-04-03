import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './VehicleForm.scss';
import { useEffect, useState } from 'react';
import { saveVehicle, getVehicleById, VehicleType, FuelType } from '../../../utils/http-utils/vehicle-requests';
import { useNavigate, useParams } from 'react-router-dom';

export function VehicleForm() {

    const params = useParams();
    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState({
        vehicleType: 'Economy',
        brand: '',
        model: '',
        constructionYear: '',
        fuelType: 'petrol',
        numSeats: '',
        pricePerDay: '',
        count: '',
        picture: ''
    });

    useEffect(() => {
        if(params.id){
            getVehicleById(params.id).then(response => {
                setVehicle(response.data);
            });
        }
    }, [params.id])

    const onFormSubmit = (event) => {
        event.preventDefault();
        
        saveVehicle(vehicle).then(() => {
            navigate('/vehicles-list');
        })
    }

    const onInputChange = (event) => {
        setVehicle((pervState) => {
            return {
                ...pervState,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <div className="vehicle-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <h3>{ vehicle.id ?  'Edit vehicle' : 'Create vehicle' }</h3>
                <div className="column">
                    <Form.Group className="mb-3" controlId="formBasicBrand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" placeholder="Enter brand" name="brand" value={vehicle.brand} onChange={onInputChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" placeholder="Enter model" name="model" value={vehicle.model} onChange={onInputChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicVehicleType">
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Select name="vehicleType" value={vehicle.vehicleType} onChange={onInputChange} required>
                            { Object.keys(VehicleType).map(vehicleType => <option key={vehicleType} value={VehicleType[vehicleType]} >{VehicleType[vehicleType]}</option>)}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicFuelType">
                        <Form.Label>Fuel Type</Form.Label>
                        <Form.Select name="fuelType" value={vehicle.fuelType} onChange={onInputChange} required>
                            { Object.keys(FuelType).map(fuelType => <option key={fuelType} value={FuelType[fuelType]} >{FuelType[fuelType]}</option>)}
                        </Form.Select>
                    </Form.Group>
                </div>
                
                <div className="column">
                    <Form.Group className="mb-3" controlId="formBasicConstructionYear">
                        <Form.Label>Construction Year</Form.Label>
                        <Form.Control type="number" placeholder="Enter construction year" name="constructionYear" value={vehicle.constructionYear} min="2000" max="2022" onChange={onInputChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNumSeats">
                        <Form.Label>Number of seats</Form.Label>
                        <Form.Control type="number" name="numSeats" value={vehicle.numSeats} min="2" max="7" onChange={onInputChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPricePerDay">
                        <Form.Label>Price Per Day</Form.Label>
                        <Form.Control type="number" name="pricePerDay" value={vehicle.pricePerDay} min="20" max="200" onChange={onInputChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCount">
                        <Form.Label>Count</Form.Label>
                        <Form.Control type="number" name="count" value={vehicle.count} min="0" max="10" onChange={onInputChange} required/>
                    </Form.Group>
                </div>
                
                <div className="div-picture">
                    <Form.Group className="mb-3" controlId="formBasicPicture">
                        <Form.Label>Picture</Form.Label>
                        <Form.Control type="text" placeholder="Enter picture url" name="picture" value={vehicle.picture} onChange={onInputChange} required/>
                    </Form.Group>
                </div>     

                <Button variant="primary" type="submit">
                    { vehicle.id ?  'Edit' : 'Create'}
                </Button>
            </Form>
        </div>
    );
}