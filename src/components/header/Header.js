import './Header.scss';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/http-utils/customer-requests';

export function Header() {

    const navigate = useNavigate();

    const logoutHandler = () => {
        logout().then(() => {
            navigate('/login');
        });
    }

    return (
        <div className="header">
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="">Rent a Car</Navbar.Brand>
                <Nav className="me-auto">
                    <Link className="nav-link" to="/customers-list">Customers</Link>
                    <Link className="nav-link" to="/customer/create">Create Customer</Link>
                    <Link className="nav-link" to="/vehicles-list">Vehicles</Link>
                    <Link className="nav-link" to="/vehicle/create">Create Vehicle</Link>
                </Nav>
                <span className='nav-link logout-btn' onClick={logoutHandler}>Logout</span>
                </Container>
            </Navbar>
        </div>
    );

}