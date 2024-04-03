import axios from 'axios';

const apiUrl = 'http://localhost:3010/customers';
const loggedCustomerKey = 'loggedCustomer';

export function getLoggedCustomer() {
    return JSON.parse(localStorage.getItem(loggedCustomerKey));
}

export async function logout(){
    localStorage.removeItem(loggedCustomerKey);
}

export function getAllCustomers(){
    return axios.get(apiUrl);
}

export function getCustomerById(id){
    return axios.get(`${apiUrl}/${id}`);
}

export function deleteCustomer(id){
    return axios.delete(`${apiUrl}/${id}`);
}

export function saveCustomer(customer){
    //edit
    if(customer.id){
        return axios.put(`${apiUrl}/${customer.id}`, customer);
    }
    //create
    return axios.post(`${apiUrl}`, customer);
}

export async function registerCustomer(customer){
    const existingCustomers = (await axios.get(`${apiUrl}?email=${customer.email}`)).data;

    if(existingCustomers.length > 0){
        throw new Error('Customer with this email already exists!');
    }
    customer.role = "user";
    return saveCustomer(customer);
}

export async function login(customer){

    const allCustomers = (await getAllCustomers()).data;

    const foundCustomer = allCustomers.find(c => c.email === customer.email && c.password === customer.password);
    if (!foundCustomer){
        throw new Error('Invalid email or password.');
    }

    localStorage.setItem(loggedCustomerKey, JSON.stringify(foundCustomer));

    return foundCustomer;
}