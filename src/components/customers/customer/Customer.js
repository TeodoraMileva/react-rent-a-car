import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerById } from "../../../utils/http-utils/customer-requests";
import { CustomerCard } from "../customer-card/CustomerCard";

export function Customer(props){
    const params = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        getCustomerById(params.id).then(response => setCustomer(response.data));
    }, [params.id])

    return (
        <div className="customer">
            <CustomerCard customer={customer}/>
        </div>
    );
}