import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Jobs() {
    const navigate = useNavigate();
    const userLoggedIn = useSelector(state => state.auth.user);
    const userLoggedInType = useSelector(state => state.auth.userType);

    const [jobPosts, setJobPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get/jobs');
                setJobPosts(response.data);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };
        fetchData();
    }, []);

    if (!userLoggedIn && userLoggedInType !== "employee") {
        navigate('/login', { replace: true });
        return null;
    }

    const handleSearch = () => {
        const filteredResults = jobPosts.filter(job =>
            job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Job Listings</h2>
            <Row className="justify-content-center">
                <Col md={8} className="d-flex align-items-center">
                    <Form.Control
                        type="text"
                        placeholder="Enter keyword to search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ width: '250px', marginRight: '10px' }}
                    />
                    <Button variant="primary" onClick={handleSearch}>Search</Button>
                </Col>
            </Row>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                {searchResults.map(job => (
                    <div key={job._id} style={{ width: 'calc(33.33% - 20px)', margin: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Card style={{ height: '100%' }}>
                            <Card.Body>
                                <Card.Title>{job.jobTitle}</Card.Title>
                                <Card.Text style={{color:'grey'}}><strong>{job.companyName}</strong></Card.Text>
                                <Card.Text>Salary Range: {job.salary}</Card.Text>
                                <Card.Text>{job.description}</Card.Text>
                                <Button variant="primary" href="#" target="_blank">Apply Now</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Jobs;
