import React from 'react'
import {FaCoins} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <Link to='/'>
            <div id="search" className='navbar'>
                <FaCoins className='icon' />
                <h1> Coin Search</h1>
            </div>
        </Link>
    )
}

export default Navbar