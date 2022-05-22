import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Feed from '../Feed/Feed';
import Navbar from '../Navbar/Navbar'
import './Header.css'

const Header = () => {

    const childCompFunc = useRef();


    const selected = (e) => {
        childCompFunc.current.getFilterValue(e.target.innerText)
    }

    console.log(window.location.pathname);

    return (
        <>
            <div className="header container mt-4">
                <div className="headerTop d-flex justify-content-between">
                    <a href="./" className="heading"><p>Live Spaces</p></a>
                    <Navbar></Navbar>
                </div>
                <div className="headerMiddle my-2">
                    <p className="align-items-center"><i className="fa fa-check" aria-hidden="true"></i>&nbsp; All NFTs on Cyber either belong to or were minted by their space creater.</p>
                </div>
                {/* Desktop view */}
                    
                        <div className={window.location.pathname != '/upload' ? "headerBottom mt-4 d-none d-xl-flex" : "d-none"}>
                            <button className="d-flex align-items-center" onClick={selected}><img src="./assets/fire.png" alt="" />Trending</button>
                            <button className="d-flex align-items-center" onClick={selected}>Latest</button>
                            <button className="d-flex align-items-center">Most popular</button>
                            <Link to="/upload"><button className="d-flex align-items-center"><img src="./assets/diamond.png" alt="" />Upload</button></Link>
                            <button className="d-flex align-items-center"><img src="./assets/temple.png" alt="" />In Temple</button>
                            <button className="d-flex align-items-center" onClick={selected}>NFT</button>
                            <button className="d-flex align-items-center" onClick={selected}>All</button>
                        </div>
            </div>
            <div className="d-none">
                <Feed ref={childCompFunc}></Feed>
            </div>
        </>
    )
}

export default Header
