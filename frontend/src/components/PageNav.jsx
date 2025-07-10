import React from 'react'
import { Link, NavLink, useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import { useAuth } from '../contexts/useAuth';
import { Globe2 } from 'lucide-react';
import './PagesNav.css'
import Logo from './Logo';
import Trips from '../Forms/Trips';
export default function PageNav() {
    const {isAuthenticated,user,logout}=useAuth();
    const navigate=useNavigate();
    console.log("user",user);
    function Profile(){
            function handleclick(){
                logout();
                navigate("/")
            }
           if (isAuthenticated)
          return (
        
           <div className="profilecontainer">
      {/* Compact top bar profile display */}
      <div className="user">
        <img src={user?.profilePhoto} alt="Profile" />
        <span>Welcome {user?.name?.split(" ")[0]}</span>
      </div>

      {/* Hidden full profile card on hover */}
      <div className="profilebox">
        <div className="profileicon">
          <img src={user?.profilePhoto} alt="Profile Full" />
        </div>
        <h3>{user?.name || ""}</h3>
        <p>Email: {user?.email || ""}</p>
        <p>Joined At: {user?.createdAt?.split("T")[0]}</p>
        <button onClick={handleclick}>Logout</button>
      </div>
    </div>
          )
    }
  return ( 
    <nav className="navbar">
        <div className="navbar-container">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="logo"
          >
            <Logo />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="nav-links"
          >
            
            {isAuthenticated ? (
              <Link to="/" className="cta-button" onClick={()=>window.location("refresh")}>Dashboard</Link>
            ) : (
              <button className="cta-button" onClick={()=>navigate('login')}>Get Started</button>
            )}
           {isAuthenticated && <Link to="/trips" className='cta-button' >Your Trips</Link>}
            {isAuthenticated && <Profile /> }
           
          </motion.div>
        </div>
      </nav>

  )
}
