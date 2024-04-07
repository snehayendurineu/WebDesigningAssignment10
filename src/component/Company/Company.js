import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

function Company() {
    const navigate = useNavigate();
    const userLoggedIn = useSelector(state => state.auth.user);
    const userLoggedInType = useSelector(state => state.auth.userType)

    useEffect(() => {
        if (!userLoggedIn && userLoggedInType!=="employee") {
            navigate('/login', { replace: true });
            return null; 
        }
    }, [navigate, userLoggedIn, userLoggedInType]);

    const [companyData, setCompanyData] = useState([]);

    useEffect(() => {
        if (userLoggedIn) {
            fetchCompanyData();
        }
    }, [userLoggedIn]);

    const fetchCompanyData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/company/getAll');
            setCompanyData(response.data);
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };

    return (
        <Container>
            {userLoggedIn ? (
                <>
                    <h4 className="mt-5">Companies that post on our website</h4>
                    <Row className="mt-3">
                        {companyData.map((company, index) => (
                            <Col key={index} sm={4} className="mb-3">
                                <Card>
                                    <Card.Img 
                                        variant="top" 
                                        src={`http://localhost:8080/${company.companyImage}`} 
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{company.companyName}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            ) : null}
        </Container>
    );
}

export default Company;
