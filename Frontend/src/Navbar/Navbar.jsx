import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {


    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);


    return (
        <>
            <div className="navbar d-block d-xl-none">
                <Link to="#" className="menuBar"><i className="fa fa-bars" aria-hidden="true" onClick={showSidebar}></i></Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <div className="close">
                    <i class="fa fa-times" aria-hidden="true"  onClick={showSidebar}></i>
                </div>
                 <ul className="menuItem">
                     <li className="menuText">
                         <Link to="#" className="menuIcon"><img src="./assets/fire.png" alt="" /> 24h Trending</Link>
                     </li>
                     <li className="menuText">
                         <Link to="#" className="menuIcon">Latest shows</Link>
                     </li>
                     <li className="menuText">
                         <Link to="#" className="menuIcon">Most popular</Link>
                     </li>
                     <li className="menuText">
                         <Link to="/upload" className="menuIcon"><img src="./assets/diamond.png" alt="" />Upload</Link>
                     </li>
                     <li className="menuText">
                         <Link to="#" className="menuIcon"><img src="./assets/temple.png" alt="" />In Temple</Link>
                     </li>
                     <li className="menuText">
                         <Link to="#" className="menuIcon">In Void</Link>
                     </li>
                     <li className="menuText">
                         <Link to="#" className="menuIcon">#BAYC</Link>
                     </li>
                 </ul>
            </nav>
        </>
    )
}

export default Navbar
