import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Feed from '../Feed/Feed';
import './Navbar.css';

const Navbar = () => {


    const [sidebar, setSidebar] = useState(false);
    const [selected, setSelected] = useState('');

    const showSidebar = (e) => {
        setSidebar(!sidebar)
        setSelected(e.target.innerText)
    }


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
                     <li className="menuText" onClick={showSidebar}>
                         <Link to="#" className="menuIcon"><img src="./assets/fire.png" alt="" /> 24h Trending</Link>
                     </li>
                     <li className="menuText" onClick={showSidebar}>
                         <Link to="#" className="menuIcon">Latest shows</Link>
                     </li>
                     <li className="menuText" onClick={showSidebar}>
                         <Link to="#" className="menuIcon">Most popular</Link>
                     </li>
                     <li className="menuText" onClick={showSidebar}>
                         <Link to="/upload" className="menuIcon"><img src="./assets/diamond.png" alt="" />Upload</Link>
                     </li>
                     <li className="menuText" onClick={showSidebar}>
                         <Link to="#" className="menuIcon"><img src="./assets/temple.png" alt="" />In Temple</Link>
                     </li>
                     <li className="menuText" onClick={showSidebar}>
                         <Link to="#" className="menuIcon">In Void</Link>
                     </li>
                     <li className="menuText" onClick={showSidebar}>
                         <Link to="#" className="menuIcon">#BAYC</Link>
                     </li>
                 </ul>
            </nav>
            <div className="d-none">
               <Feed value={selected}></Feed>
            </div>
        </>
    )
}

export default Navbar
