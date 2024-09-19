import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/login', { username, password })
            .then(response => {
                console.log(response.data);  // Fixed typo (response.date to response.data)
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('Error logging in!', error);
            });
    };

    return (
        <form onSubmit={handleLogin}>  {/* Fixed handler */}
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;