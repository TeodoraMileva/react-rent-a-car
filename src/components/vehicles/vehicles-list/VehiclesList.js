import { useEffect, useState } from "react";
import { deleteVehicle, getAllVehicles } from "../../../utils/http-utils/vehicle-requests";
import { VehicleCard } from "../vehicle-card/VehicleCard";
import './VehiclesList.scss';

export function VehiclesList() {

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getAllVehicles().then(response => {
            setVehicles(response.data);
        });
    }, []);

    const  deleteVehicleHandler = async (id) => {
        await deleteVehicle(id);
        setVehicles(pervState => {
            return pervState.filter(vehicle => vehicle.id !== id);
        });
    }

    return (
        <div className="vehicles-list-wrapper">
            { vehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} deleteVehicle={deleteVehicleHandler}/>) }
        </div>
    );
}