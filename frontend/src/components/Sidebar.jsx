import Logo from './Logo'
import styles from './Sidebar.module.css'
import AppNav from './AppNav'
import { Link, Outlet } from 'react-router-dom'


export default function Sidebar() {
  
 
  return (
    <div className={styles.sidebar} style={{background:"#070f20"}}>
        <Logo />
        <AppNav />
        <Outlet />
        <Link to="/" className={styles.homebutton}>
        
        <button className={styles.back}>Go to homepage</button>
        </Link>
    </div>
  )
}


