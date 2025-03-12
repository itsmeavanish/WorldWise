import React, { useState } from 'react'
import Logo from './Logo'
import styles from './Sidebar.module.css'
import AppNav from './AppNav'
import { Link, Outlet } from 'react-router-dom'
import { useMapEvent } from 'react-leaflet'
import { DetectClick } from './Map'

export default function Sidebar() {
  const {input}=DetectClick
 
  return (
    <div className={styles.sidebar}>
        <Logo />
        <AppNav />
        <Outlet />
        {input?<input placeholder="Start your trip by entering city you want to visit" ></input>:null}
        <Link to="/" className={styles.homebutton}>
        
        <button className={styles.back}>Go to homepage</button>
        </Link>
    </div>
  )
}


