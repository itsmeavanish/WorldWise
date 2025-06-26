import  { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { toast } from 'react-toastify';

export default function ProtectedRoute({children}) {
  const {isAuthenticated}=useAuth()
    const navigate=useNavigate();
    useEffect(function(){
        if (!isAuthenticated){
            navigate("/");
            toast.warn("You are not logged in...")
        }
    },[isAuthenticated,navigate])
  return (
    isAuthenticated ? children : null
  );
}
