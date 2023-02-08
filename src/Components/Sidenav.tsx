import Nav from 'react-bootstrap/Nav';
import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { navData } from "../data/navData";
import { Button } from "react-bootstrap";
import styles from './sidenav.module.css';

export default function Sidenav() {
    const [open, setopen] = useState(true)
    const toggleOpen = () => {
        setopen(!open)
        
    }
    
    return (
        <div data-testid="sidenav" className={open?styles.sidenav:styles.sidenavClosed}>
            <button className={styles.menuBtn} onClick={toggleOpen}>
                {open? <KeyboardDoubleArrowLeftIcon />: <KeyboardDoubleArrowRightIcon />}
            </button>
            {navData.map(item =>{
                return <Nav.Link key={item.id} as={Link} className={styles.sideitem} to={item.link}>
                {item.icon}
                <span className={styles.linkText}>{item.text}</span>
            </Nav.Link>
            })}
        </div>
  )
}