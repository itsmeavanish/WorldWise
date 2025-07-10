import React from 'react';
import styles from './AppLayout.module.css';
import Sidebar from '../components/Sidebar'; 
import User from '../components/User';
import Map from '../components/Map';
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
