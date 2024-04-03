import axios from 'axios';
import { getLoggedCustomer } from './customer-requests';
import { getVehicleById, saveVehicle } from './vehicle-requests';

const apiUrl = 'http://localhost:3010/rentals';

export async function saveRental(rental){

    var start = new Date(rental.startDateTime);
    var end = new Date(rental.endDateTime); 
    
    if (start > end){
        throw new Error('End date cannot be before start date');
    }

    var today = new Date();

    if(start < today){
        throw new Error('Start date cannot be before today');
    }

    const vehicleToEdit = (await getVehicleById(rental.vehicleId)).data;

    if (vehicleToEdit.count === 0){
        throw new Error('There are no available cars of this type');
    }

    vehicleToEdit.count = vehicleToEdit.count - 1;

    saveVehicle(vehicleToEdit);

    return axios.post(`${apiUrl}`, rental);
}

export function getRentalsByCustomerId(){

    return axios.get(`${apiUrl}?customerId=${getLoggedCustomer().id}`);

}