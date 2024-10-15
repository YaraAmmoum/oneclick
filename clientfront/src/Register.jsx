
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./assets/styles/style.css";
import Nav from "./Nav";
import Footer from "./Footer";
export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, password }),
            });

            if (response.ok) {
                alert('User registered successfully');
                navigate("/login");
            } else {
                const errorText = await response.text();
                alert('Failed to register user: ' + errorText);
            }
        } catch (err) {
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <>
        <Nav/>
        <div className="outer-containerReg">
            <div className="form-containerReg">
                <form onSubmit={handleSubmit}>
                    <h3 className="headForm">Register new account</h3>
                    <label className="label" htmlFor="email">User Email:</label>
                    <input className="inputReg" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email..." />
                    <label className="label" htmlFor="name">User Name:</label>
                    <input className="inputReg" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name..." />
                    <label className="label" htmlFor="password">Password:</label>
                    <input className="inputReg" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your Password..." />
                    <button className="submit-button" type="submit">Create new account</button>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
}
