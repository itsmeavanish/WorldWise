import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Lock, Mail, Rotate3D } from 'lucide-react';
import './auth.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useAuth} from '../contexts/useAuth'
const Login = () => {
  const navigate=useNavigate();
  const {login}=useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''   
   });
   const [loading,setloading]=useState(false);
   const [error, setError] = useState('');
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      setloading(true);
      const response = await axios.post(`https://worldwisebackend.vercel.app/api/auth/login`, formData);
      console.log("response",response);
      if (response){
        localStorage.setItem('token', response.data.token);
        login(formData)
        navigate("/");
        toast.success("Succesfully Logged In");
        login();
      }
    }
    catch(e){
      setError(e.response?.data?.message || 'An error occurred');
      toast.error(error);
    }
    finally{
      setloading(false);
     
    }
    
  };

  return (
    <div className="auth-container">
      <div className="background-overlay">
        <motion.div
          className="background-image"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')"
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <motion.div
        className="auth-form-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="logo-container">
          <motion.div
            className="logo"
            whileHover={{rotate:265}}
            transition={{ duration: 0.5 }}   
          >
            <Compass size={52} />
          </motion.div>
        </div>

        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <div className="input-container">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                value={formData.email}
                name='email'
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={20} />
              <input
              name='password'
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </form>

        <p className="auth-link">
          Don't have an account?{' '}
          <Link to="/signup">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;