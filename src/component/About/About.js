import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

function About() {
    const navigate = useNavigate();
    const userLoggedIn = useSelector(state => state.auth.user);
    const userLoggedInType = useSelector(state => state.auth.userType)

    if (!userLoggedIn && userLoggedInType!=="employee") {
        navigate('/login', { replace: true });
        return null; 
    }
    
    return (
        <div className="about">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <br/><br/><br/>
                        <Card className="mb-4 shadow">
                            <Card.Body>
                                <Card.Title className="text-primary" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>About Us</Card.Title>
                                <Card.Text>
                                     Our mission is to facilitate job seekers in finding their dream positions while aiding employers in discovering the perfect talent for their organizations. Through our platform, we strive to bridge the gap between individuals and opportunities, fostering meaningful career advancements.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="mb-4 shadow">
                            <Card.Body>
                                <Card.Title className="text-primary" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Our Team</Card.Title>
                                <Card.Text>
                                Our dedicated team brings together passionate individuals from varied backgrounds with expertise in technology, human resources, and recruitment. Committed to excellence, we strive to deliver an exceptional experience for both job seekers and employers alike. Leveraging our diverse skills and knowledge, we aim to facilitate seamless connections and empower individuals to achieve their career goals.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title className="text-primary" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Our Values</Card.Title>
                                <ul>
                                    <li>Integrity: We operate with honesty and transparency in all our interactions.</li>
                                    <li>Empowerment: We empower individuals to take control of their careers.</li>
                                    <li>Innovation: We continuously strive to innovate and improve our platform to better serve our users.</li>
                                    <li>Collaboration: We believe in the power of collaboration and partnerships to achieve success.</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default About;
