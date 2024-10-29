import React from 'react';
import "./App.css"
// import { useState } from "react";
import { kebabToTitleCase } from './helpers'; 

function App() {
  const [btnColor, setBtnColor] = React.useState("medium-violet-red");
  const nextColor = btnColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red"
  const [disabled, setDisabled] =  React.useState(false);
  const className = disabled ? "gray" : btnColor

  return (
    <div>
      <button className={className} onClick={() => setBtnColor(nextColor)} disabled={disabled}>Change to {nextColor} </button>
      <br/>
      <input type="checkbox" defaultChecked={disabled} onChange={(e) => setDisabled(e.target.checked)} id='disable-checkbox-button'/>
      <label htmlFor="disable-checkbox-button">Disable button</label>
    </div>
  );
}

export default App;
