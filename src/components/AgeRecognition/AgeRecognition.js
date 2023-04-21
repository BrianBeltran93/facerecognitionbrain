import React from "react";

const AgeRecognition = ({ ageRanges, imageUrl }) => {
  return(
    <div>
      <div className="center ma">
        <div className="mt2">
          <img id="inputimage" src={imageUrl} alt="" width={'500px'} height={'auto'} />
        </div>
        <div className="pt4 pl4 f4">
          <p className=""><b>Age Group:</b> {`${ageRanges.first[0]}  %${(ageRanges.first[1] * 100).toFixed(2)}`}</p>
          <p className=""><b>Age Group:</b> {`${ageRanges.second[0]} %${(ageRanges.second[1] * 100).toFixed(2)}`}</p>
          <p className=""><b>Age Group:</b> {`${ageRanges.third[0]} %${(ageRanges.third[1] * 100).toFixed(2)}`}</p>
        </div>
      </div>
    </div>
  )
}

export default AgeRecognition;