import React from 'react'
import logo from '../assets/logo.png'

function Logo({ width = '100px', rounded = false }) {
    return <img src={logo} alt="Logo" style={{ width, borderRadius: rounded ? '50%' : '450%' }} />
}

export default Logo
