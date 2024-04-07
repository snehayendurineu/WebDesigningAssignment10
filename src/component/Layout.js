import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { logoutUser } from './action'; 

function Layout() {

    const user = useSelector(state => state.auth.user); 
    const userLoggedInType = useSelector(state => state.auth.userType)
    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        dispatch(logoutUser()); 
    };

    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/home">Job Search App</Navbar.Brand>
                    {user ? (
                        
                                <>
                                  {userLoggedInType === 'employee'?(
                                    <>
                                    <Nav.Link href="/home" style={{ color: 'white' }}>Home</Nav.Link>
                                    <Nav.Link href="/about" style={{ color: 'white' }}>About</Nav.Link>
                                    <Nav.Link href="/jobs" style={{ color: 'white' }}>Jobs</Nav.Link>
                                    <Nav.Link href="/contact" style={{ color: 'white' }}>Contact</Nav.Link>
                                    <Nav.Link href="/company" style={{ color: 'white' }}>Companies</Nav.Link>
                                    <Nav.Link href="/login" onClick={handleLogoutClick} style={{ color: 'white' }}>Logout</Nav.Link>
                                    </>
                                  ) : (
                                    <>
                                    <Nav.Link href="/employee" style={{ color: 'white' }}>Employees</Nav.Link>
                                    <Nav.Link href="/createjob" style={{ color: 'white' }}>Create Job</Nav.Link>
                                    <Nav.Link href="/login" onClick={handleLogoutClick} style={{ color: 'white' }}>Logout</Nav.Link>
                                    </>
                                  )}
                                </>
                         
                    ) : (
                        <Nav.Link href="/login" style={{ color: 'white' }}>Login</Nav.Link>
                    )}
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default Layout;
