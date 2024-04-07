import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container,Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

function Employee() {
    const navigate = useNavigate();
    const userLoggedIn = useSelector(state => state.auth.user);
    const userLoggedInType = useSelector(state => state.auth.userType)

    useEffect(() => {
        if (!userLoggedIn && userLoggedInType!=="admin") {
            navigate('/login', { replace: true });
            return null; 
        }
    }, [navigate, userLoggedIn, userLoggedInType]);

    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        if (userLoggedIn) {
            fetchEmployeeData();
        }
    }, [userLoggedIn]);

    const fetchEmployeeData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/user/getAll');
            setEmployeeData(response.data);
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };

    return (
        <Container>
                <>
                <h4 className="mt-5">Employees in our website</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData.map(employee => {
                          
                                return (
                                    <tr key={employee._id}>
                                        <td>{employee.fullName}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.type}</td>
                                    </tr>
                                );
                            
                        })}
                    </tbody>
                </Table>
            </>
        </Container>
    );
}

export default Employee;
