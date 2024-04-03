import { useEffect, useState } from "react";
import { deleteCustomer, getAllCustomers } from "../../../utils/http-utils/customer-requests";
import { CustomerCard } from "../customer-card/CustomerCard";
import './CustomersList.scss';

export function CustomersList() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getAllCustomers().then(response => {
            setCustomers(response.data);
        });
    }, []);

    const deleteCustomerHandler = async (id) => {
        await deleteCustomer(id);
        setCustomers(pervState => {
            return pervState.filter(user => user.id !== id);
        });
    }

    return (
        <div className="customers-list-wrapper">
            { customers.map(customer => <CustomerCard key={customer.id} customer={customer} deleteCustomer={deleteCustomerHandler}/>) }
        </div>
    );
}