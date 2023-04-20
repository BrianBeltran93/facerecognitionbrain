import React from "react";
import './Home.css';

const Home = ({ onRouteChange }) => {
  return (
    <div>
      <div>
        <h1 className="f1 pb5 black">SmartBrain!</h1>
      </div>
      <div className="pt5">
        <span onClick={() => onRouteChange('facedetection')} 
        className="f3 b underline dim pointer">
          Face Detection
        </span>
      </div>
    </div>
  )
}

export default Home;