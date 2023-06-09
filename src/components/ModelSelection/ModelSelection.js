import React from "react";
import './ModelSelection.css';

const ModelSelection = ({ setModelDetection }) => {
  return(
    <div>
      <input type="radio" name="model-selection" value="face-recognition" 
      onClick={() => setModelDetection('face-recognition')} />
      <label className="pa2">Face Recognition</label>
      <input type="radio" name="model-selection" value="age-recognition" 
      onClick={() => setModelDetection('age-recognition')} />
      <label className="pa2">Age Recognition</label>
      <input type="radio" name="model-selection" value="Ethnicity-recognition" 
      onClick={() => setModelDetection('ethnicity-recognition')} />
      <label className="pa2">Ethnicity Recognition</label>
    </div>
  )
} 

export default ModelSelection;