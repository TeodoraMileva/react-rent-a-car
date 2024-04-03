import axios from 'axios';

export const VehicleType = {
    ECONOMY: 'Economy',
    ESTATE: 'Estate',
    LUXURY: 'Luxury',
    SUV: 'SUV',
    CARGO: 'Cargo'
}

export const FuelType = {
    PETROL: 'petrol',
    DIESEL: 'diesel',
    HYBRID: 'hybrid',
    ELECTRIC: 'electric'
}

const apiUrl = 'http://localhost:3010/vehicles';

export function getAllVehicles(){
    return axios.get(apiUrl);
}

export function getVehicleById(id){
    return axios.get(`${apiUrl}/${id}`);
}

export function deleteVehicle(id){
    return axios.delete(`${apiUrl}/${id}`);
}

export function saveVehicle(vehicle){
    //edit
    if(vehicle.id){
        return axios.put(`${apiUrl}/${vehicle.id}`, vehicle);
    }
    //create
    return axios.post(`${apiUrl}`, vehicle);
}