import './App.css';

import { useState } from 'react';
import { hexToDecimal, decimalToHex } from './utils/conversion';

function App() {
  const [hexValue, setHexValue] = useState('');
  const [decimalValue, setDecimalValue] = useState('');

  const handleHexChange = (event) => {
    const hexInput = event.target.value;
    setHexValue(hexInput);
    if (/^[0-9A-Fa-f]+$/.test(hexInput)) {
      setDecimalValue(hexToDecimal(hexInput).toString());
    } else {
      setDecimalValue('');
    }
  };

  const handleDecimalChange = (event) => {
    const decimalInput = event.target.value;
    setDecimalValue(decimalInput);
    if (/^\d*$/.test(decimalInput)) {
      setHexValue(decimalToHex(parseInt(decimalInput)).toUpperCase());
    } else {
      setHexValue('');
    }
  };

  return (
    <div className="App">
      <label>
        Hexadecimal:
        0x<input type="text" value={hexValue} onChange={handleHexChange} />
      </label>
      <br />
      <label>
        Decimal:
        <input type="text" value={decimalValue} onChange={handleDecimalChange} />
      </label>
    </div>
  );
}

export default App;
