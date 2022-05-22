import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Feed from '../Feed/Feed';
import './Navbar.css';

const Navbar = () => {


    const [sidebar, setSidebar] = useState(false);

    const childCompFunc = useRef();

    const showSidebar = (e) => {
        setSidebar(!sidebar);
        childCompFunc.current.getFilterValue(e.target.innerText)
    }


    return (
        <>
            {/* Mobile view */}
            <div className="navbar d-block d-xl-none">
                <Link to="#" className="menuBar"><i className="fa fa-bars" aria-hidden="true" onClick={showSidebar}></i></Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <div className="close">
                    <i class="fa fa-times" aria-hidden="true" onClick={showSidebar}></i>
                </div>
                <ul className="menuItem">
                    <li className="menuText" onClick={showSidebar}>
                        <Link to="#" className="menuIcon"><img src="./assets/fire.png" alt="" />Trending</Link>
                    </li>
                    <li className="menuText" onClick={showSidebar}>
                        <Link to="#" className="menuIcon">Latest</Link>
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
                        <Link to="#" className="menuIcon">NFT</Link>
                    </li>
                    <li className="menuText" onClick={showSidebar}>
                        <Link to="#" className="menuIcon">All</Link>
                    </li>
                </ul>
            </nav>
            <div className="d-none">
                <Feed ref={childCompFunc}></Feed>
            </div>
        </>
    )
}

export default Navbar
