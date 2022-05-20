import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className="header container mt-4">
            <div className="headerTop d-flex justify-content-between">
                <a href="./" className="heading"><p>Live Spaces</p></a>
            </div>
            <div className="headerMiddle my-2">
               <p className="align-items-center"><i className="fa fa-check" aria-hidden="true"></i>&nbsp; All NFTs on Cyber either belong to or were minted by their space creater.</p>
            </div>
        </div>
    )
}

export default Header
