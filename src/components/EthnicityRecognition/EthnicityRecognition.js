import React from "react";

const EthnicityRecognition = ({ ethnicityRanges, imageUrl }) => {
  return(
    <div>
      <div className="center ma">
        <div className="mt2">
          <img id="inputimage" src={imageUrl} alt="" width={'500px'} height={'auto'} />
        </div>
        <div className="pt4 pl4 f4">
          <p className=""><b>Ethnic Group:</b> {`${ethnicityRanges.first[0]}  %${(ethnicityRanges.first[1] * 100).toFixed(2)}`}</p>
          <p className=""><b>Ethnic Group:</b> {`${ethnicityRanges.second[0]} %${(ethnicityRanges.second[1] * 100).toFixed(2)}`}</p>
          <p className=""><b>Ethnic Group:</b> {`${ethnicityRanges.third[0]} %${(ethnicityRanges.third[1] * 100).toFixed(2)}`}</p>
        </div>
      </div>
    </div>
  )
}

export default EthnicityRecognition;