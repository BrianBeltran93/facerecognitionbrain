import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from "./brain.png"
import './Logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0" style={{ width: '150px' }}>
      <Tilt className="Tilt br2 shadow-2">
        <div className="pa3" style={{ height: '150px' }}>
          <img style={{ paddingTop: '25px' }} src={brain} alt="logo" />
        </div>
      </Tilt>
      <a className="black f6" href='https://icons8.com/icon/2070/brain'
        target="_blank" rel="noreferrer">img origin</a>
    </div>
  )
}

export default Logo;