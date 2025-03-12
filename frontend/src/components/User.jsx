import React from 'react'

import styles from "./User.module.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

export default function User() {
    const {logout,isAuthenticated,user}=useAuth();
    console.log("user",user)
    const navigate=useNavigate();
    function handleclick(){
        logout();
        navigate("/")
    }
   if (isAuthenticated)
  return (
    <div className={styles.user}>
      <img src={user?.profilePhoto} alt='error'/>
      <span>Welcome {user?.name}</span>
      <button onClick={handleclick}>logout</button>
    </div>
  )
}
