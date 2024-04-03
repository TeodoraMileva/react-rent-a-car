import { Navigate } from "react-router-dom";
import { getLoggedCustomer } from "../http-utils/customer-requests";

export function NonAuthenticatedGuard({ children }){
    const customer = getLoggedCustomer();

    if (customer){
        return <Navigate to="/vehicles-list"/>;
    }

    return children;
}