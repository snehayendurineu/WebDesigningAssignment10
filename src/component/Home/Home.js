import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux'; 

function Home() {
    const navigate = useNavigate();

    const userLoggedIn = useSelector(state => state.auth.user);
    const userLoggedInType = useSelector(state => state.auth.userType)

    if (!userLoggedIn && userLoggedInType!=="employee") {
        navigate('/login', { replace: true });
        return null; 
    }
    return (
        <div className="home bg-light">
            <Container>
                <Row className="justify-content-center text-center mb-5">
                    <Col md={8}>
                        <h1 className="mb-4"><strong>Welcome to Job Search Portal</strong></h1>
                        <p>Find your dream job today!</p>
                        <Button variant="primary" size="lg" as={Link} to="/jobs">Search Jobs</Button>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6}>
                        <Card className="h-100 bg-light border-0 shadow">
                            <Card.Body>
                                <Card.Title className="text-primary"><strong>How it Works</strong></Card.Title>
                                <Card.Text>
                                    Search for jobs based on location, industry, or keywords.
                                </Card.Text>
                                <Card.Text>
                                    Explore job listings and company profiles.
                                </Card.Text>
                                <Card.Text>
                                    Apply for jobs directly through the portal.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="h-100 bg-light border-0 shadow">
                            <Card.Body>
                                <Card.Title className="text-primary"><strong>Why Choose Us</strong></Card.Title>
                                <Card.Text>
                                    We have a vast database of job listings.
                                </Card.Text>
                                <Card.Text>
                                    Easy job search and application process.
                                </Card.Text>
                                <Card.Text>
                                    Regular updates on new job openings.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default Home;
