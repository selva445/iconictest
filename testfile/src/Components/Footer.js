import React from 'react'
import './Home.css'
export default function Footer() {
    return (
        <div className="footer"> COPYRIGHTS @ {(new Date().getFullYear())}</div>
    )
}
