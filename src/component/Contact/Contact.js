import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

function Contact() {
    const navigate = useNavigate();
    const userLoggedIn = useSelector(state => state.auth.user);
    const userLoggedInType = useSelector(state => state.auth.userType)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    if (!userLoggedIn && userLoggedInType!=="employee") {
        navigate('/login', { replace: true });
        return null; 
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div>
                <Card className="p-3" style={{ width: '500px' }}>
                    <h4 className="mt-3 mb-4">Contact Us</h4>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="subject">
                            <Form.Label>Subject:</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="message">
                            <Form.Label>Message:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Card>

                <Card className="p-3 mt-4" style={{ width: '500px' }}>
                    <h4 className="mt-3 mb-4">Contact Details:</h4>
                    <p><strong>Email:</strong> <a href='mailto:info@jobsearch.com' target='_blank' rel='noreferrer'>info@jobsearch.com</a></p>
                    <p><strong>Phone:</strong> <a href='tel:+1234567890' target='_blank' rel='noreferrer'>+1234567890</a></p>
                </Card>
            </div>
        </Container>
    );
}

export default Contact;
