import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateJobs() {
    const navigate = useNavigate();
    const userLoggedIn = useSelector(state => state.auth.user);
    const userLoggedInType = useSelector(state => state.auth.userType);

    const [formData, setFormData] = useState({
        companyName: '',
        jobTitle: '',
        description: '',
        salary: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/create/job', formData);
            toast.info("Job added successfully!")
            setFormData({
                companyName: '',
                jobTitle: '',
                description: '',
                salary: ''
            });
        } catch (error) {
            console.error('Error adding job:', error);
            alert('An error occurred while adding the job. Please try again.');
        }
    };

    if (!userLoggedIn || userLoggedInType !== "admin") {
        navigate('/login', { replace: true });
        return null;
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div>
                <Card className="p-3" style={{ width: '500px' }}>
                    <h4 className="mt-3 mb-4">Add Job</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="companyName">
                            <Form.Label>Company Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="jobTitle">
                            <Form.Label>Job Title:</Form.Label>
                            <Form.Control
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="salary">
                            <Form.Label>Salary:</Form.Label>
                            <Form.Control
                                type="text"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Card>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
        
    );
}

export default CreateJobs;
