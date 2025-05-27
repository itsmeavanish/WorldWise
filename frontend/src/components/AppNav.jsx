import React from 'react'
import styles from "./AppNav.module.css"
import { NavLink } from 'react-router-dom'
export default function AppNav(){
    return ( 
        <nav className={styles.nav} >
            <ul>
                <li>
                    <NavLink to='cities'  style={{background:"rgb(31, 41, 55)"}}>Cities</NavLink>
                </li>
                <li>
                    <NavLink to='countries'  style={{background:"rgb(31, 41, 55)"}}>Countries</NavLink>
                </li>
            </ul>
        </nav>
      )
}