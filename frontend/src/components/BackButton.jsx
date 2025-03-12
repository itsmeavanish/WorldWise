import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./Button.module.css"
export default function BackButton() {
    const navigate=useNavigate();
  return (
    <button className={styles.back} onClick={(e)=>
        {e.preventDefault();
        navigate(-1)}}>
            Back
      </button>
  )
}
