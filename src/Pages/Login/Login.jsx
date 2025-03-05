import React, { useState, useEffect } from 'react';
import './login.css';
import imgLogin from '../../assets/login-image.png';
import { Link, useNavigate } from 'react-router-dom';
import Success from '../../Components/Success/Success';

const Login = ({ forgetPass, setForgetPass }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [rememberMe, setRememberMe] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (email === '' || password === '') {
      setMessage('Please fill the empty fields')
      setSeverity('error')
      setOpenSnackbar(true)
      return
    }

    const url = 'http://145.223.23.146:5000/api/v1/admin/auth/login';
    const loginData = { email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        const token = result.data.token;
        localStorage.setItem("authToken", token);
        navigate('/topics');
      } else {
        setMessage('You are not authorized!');
        setSeverity('error');
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="login">
      <div className="login-left">
        <div>Login now to your</div>
        <span>dashboard</span>
        <img src={imgLogin} alt="Login Illustration" />
      </div>

      <div className="login-right">
        <div className="login-right-email">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-right-pass">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-right-rememberMe">
          <input
            type="checkbox"
            id="rememberMe"
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <div className="login-right-forget">
          <Link onClick={() => { setForgetPass(true) }}>Forget password?</Link>
        </div>

        <button onClick={handleLogin}>Login</button>
      </div>

      <Success message={message} color={severity} open={openSnackbar} setOpen={setOpenSnackbar} />
    </div>
  );
};

export default Login;