import './App.css';

import { useState } from 'react';

const DEFAULT_LEFT_MODE = "hex";
const DEFAULT_RIGHT_MODE = "dec";

function App() {
  const [leftMode, setLeftMode] = useState(DEFAULT_LEFT_MODE);
  const [rightMode, setRightMode] = useState(DEFAULT_RIGHT_MODE);

  const [binaryValue, setBinaryValue] = useState("0b"); // string
  const [hexValue, setHexValue] = useState("0x"); // string
  const [decimalValue, setDecimalValue] = useState(""); // string

  const refreshBinaryValue = function (num) {
    setBinaryValue(num === null ? "0b" : "0b" + num.toString(2));
  };

  const refreshDecimalValue = function (num) {
    setDecimalValue(num === null ? "" : num.toString());
  };

  const refreshHexValue = function (num) {
    setHexValue(num === null ? "0x" : "0x" + num.toString(16).toUpperCase());
  };

  const handleHexChange = function (event) {
    let hexInput = event.target.value;
    if (hexInput === "") { // In case the user selected all and deleted
      hexInput = "0x";
    }
    if (!hexInput.startsWith("0x")) {
      return;
    }

    let num = null;
    if (/^0x[0-9A-Fa-f]+$/.test(hexInput)) {
      num = parseInt(hexInput, 16);
    }

    setHexValue(hexInput);
    refreshBinaryValue(num);
    refreshDecimalValue(num);
  };

  const handleDecimalChange = function (event) {
    const decimalInput = event.target.value;
    let num = null;
    if (/^[0-9]+$/.test(decimalInput)) {
      num = parseInt(decimalInput);
    }

    setDecimalValue(decimalInput);
    refreshBinaryValue(num);
    refreshHexValue(num);
  };

  const handleBinaryChange = function (event) {
    let binaryInput = event.target.value;
    if (binaryInput === "") { // In case the user selected all and deleted
      binaryInput = "0b";
    }
    if (!binaryInput.startsWith("0b")) {
      return;
    }

    let num = null;
    if (/^0b[0-1]+$/.test(binaryInput)) {
      num = parseInt(binaryInput, 2);
    }
    setBinaryValue(binaryInput);
    refreshDecimalValue(num);
    refreshHexValue(num);
  };

  const handleLeftModeChange = function (event) {
    const newMode = event.target.value;
    setLeftMode(newMode);
  };

  const handleRightModeChange = function (event) {
    const newMode = event.target.value;
    setRightMode(newMode);
  };

  const switchString = function (mode) {
    switch (mode) {
      case "hex":
        return hexValue;
      case "dec":
        return decimalValue;
      case "bin":
        return binaryValue;
      default:
        return "Invalid";
    }
  }

  const switchHandler = function (mode, e) {
    switch (mode) {
      case "hex":
        handleHexChange(e);
        break;
      case "dec":
        handleDecimalChange(e);
        break;
      case "bin":
        handleBinaryChange(e);
        break;
      default:
        return;
    }
  };

  const exchangeMode = function() {
    const tempMode = leftMode;
    setLeftMode(rightMode);
    setRightMode(tempMode);
  }

  return (
    <div className="App">
      <div className='container'>
        <div>
          <select className="left-selector" value={leftMode} onChange={handleLeftModeChange}>
            <option value="bin" disabled={rightMode === "bin"}>Binary</option>
            <option value="hex" disabled={rightMode === "hex"}>Hexadecimal</option>
            <option value="dec" disabled={rightMode === "dec"}>Decimal</option>
          </select>
        </div>
        <div>
          <button onClick={exchangeMode}>{"<-->"}</button>
        </div>
        <div>
          <select className="right-selector" value={rightMode} onChange={handleRightModeChange}>
          <option value="bin" disabled={leftMode === "bin"}>Binary</option>
            <option value="hex" disabled={leftMode === "hex"}>Hexadecimal</option>
            <option value="dec" disabled={leftMode === "dec"}>Decimal</option>
          </select>
        </div>
        <div>
          <textarea value={switchString(leftMode)} onChange={(e) => switchHandler(leftMode, e)} />
        </div>

        <div>
        </div>

        <div>
          <textarea value={switchString(rightMode)} onChange={(e) => switchHandler(rightMode, e)} />
        </div>
      </div>
    </div>
  );
}

export default App;
