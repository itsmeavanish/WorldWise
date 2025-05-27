import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Compass, Lock, Mail, User } from 'lucide-react';
import './auth.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/useAuth';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    profilePhoto: null,
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0], // Store file object
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('profilePhoto', formData.profilePhoto);

    try {
      const response = await axios.post(
        'https://worldwisebackend.vercel.app/api/auth/register',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data) {
        toast.success('Successfully Signed Up');
        localStorage.setItem('token', response.data.token);
        console.log(response.data);
        login(formData);
        navigate('/');
      }
    } catch (e) {
      const errorMessage = e.response?.data?.message || 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="background-overlay">
        <motion.div
          className="background-image"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')",
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
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Compass size={48} />
          </motion.div>
        </div>

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <div className="input-container">
              <User className="input-icon" size={20} />
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-container">
              <Mail className="input-icon" size={20} />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={20} />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Choose a password"
                required
              />
            </div>
          </div>

          <div className="inputgroup">
            <label htmlFor="file-input" className="profilebox">
              <Camera className="inputIcon" />
              <span className="inputText">Upload Your Profile Photo</span>
            </label>
            <input
              id="file-input"
              type="file"
              name="profilePhoto"
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </motion.button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
