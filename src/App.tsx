import React, { useState, useEffect } from 'react';
import { InputNumber } from 'antd';
import './App.css';

function App() {
  const [checkednum, selectValue] = useState<number | null>(null);
  const selectedarr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => .5 - Math.random());

  return (
    <div className="App">
   
      <input type="text" id='name' placeholder='Enter Name' /><br /><br />
      <InputNumber min={1} max={9} onChange={(newNumber: number) => selectValue(newNumber)} id='inputnum' />

      {checkednum ?
        <Matrix selectedarr={selectedarr} checkednum={checkednum} selectValue={selectValue} />
        :
        <div className='num'>Select a number</div>
      }
    </div>
  );
}

interface MatrixProps {
  selectedarr: number[];
  checkednum: number | null;
  selectValue: (newcheckednum: number | null) => void;
}

const Matrix = ({ selectedarr, checkednum, selectValue }: MatrixProps) => {
  const [clicked, setclicked] = useState<number[] | []>([]);
  const onChangework = (val: number) => {
    setclicked([...clicked, val]);
  };

  useEffect(() => {
    setTimeout(() => {
      if (clicked.includes(checkednum as never)) {
        alert('Congrajulations You won!');
        selectValue(null);
        setclicked([]);
      }

      if (clicked.length === 3 && !clicked.includes(checkednum as never)) {
        alert('You lose! Click Okay to Retry');
        selectValue(null);
        setclicked([]);
      }
    }, 100)
  }, [clicked]);

  return (
    <div className="boxContainer">
      {selectedarr.map((val: number, index: number) => {
        if (clicked.includes(val as never)) {
          return <div className={val === checkednum ? 'box box-right' : 'box box-wrong'} key={index}>{val}</div>
        } else {
          return <div className="box" key={index} onClick={() => onChangework(val)}></div>
        }
      })}
    </div>
  );
}


export default App;
