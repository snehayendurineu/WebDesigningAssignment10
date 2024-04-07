import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { loginUser } from './action'; 


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const validateEmail = () => {
        if (!email) {
            setEmailError('Email is required');
        } else if (!/^[a-zA-Z0-9._-]+@northeastern\.edu$/.test(email)) {
            setEmailError('Please use Northeastern email');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    const submitLogin = async (e) => {
        e.preventDefault();

        validateEmail();
        validatePassword();

        if (!emailError && !passwordError) {
            try {
                const response = await axios.post('http://localhost:8080/login', {
                    email,
                    password
                });
                if (response.status === 200) {
                    const userData = response.data.user;
                    dispatch(loginUser({ user: email, userType: userData.type })); 
                    if(userData.type === 'employee') {
                        navigate('/home', { replace: true });
                    }else if(userData.type === 'admin'){
                        navigate('/employee', { replace: true });
                    }
                } else {
                    toast.error('Incorrect email or password. Please try again.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                toast.error('Error during login. Please try again.');
            }
        }
    };

    return (
        <div>
            <br />
            <div className="container">
                <form noValidate id="login-form" onSubmit={submitLogin}>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-4">
                            <h4>Login Form</h4>
                            <hr />
                            <br />
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className={`form-control ${emailError ? 'is-invalid' : ''}`} id="emailInput" name="email"
                                    value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} />
                                <div id="email-error" className="invalid-feedback">{emailError}</div>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className={`form-control ${passwordError ? 'is-invalid' : ''}`} name="password"
                                    value={password} onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword} />
                                <div id="password-error" className="invalid-feedback">{passwordError}</div>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary" id="btnSubmit">Submit</button>
                        </div>
                    </div>
                </form>
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
        </div>
    );
}

export default Login;
