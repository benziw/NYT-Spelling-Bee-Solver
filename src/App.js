import './css/App.css';

import { useState } from 'react';

import Hive from './components/Hive';
import WordList from './components/WordList';

import TextField from '@mui/material/TextField';


export default function App() {

  const [letters, setLetters] = useState('_______');

  const textOnChange = (e) => {
    let str = e.target.value.replace(/[^a-z]/gi, '');
    let strLower = str.toLowerCase()
    if (strLower.indexOf(strLower[strLower.length-1]) !== strLower.length-1){
      str = str.slice(0,-1);
    }

    while(str.length < 7){
      str += "_";
    }
    setLetters(str); 
  }

  return (
    <div className="App">

      <TextField onChange={textOnChange} maxLength='7' value={letters.replaceAll("_", "").toUpperCase()}></TextField>
      <h4>{`Enter letters above. First letter will be center letter. No duplicates.`}</h4>
      <h1>{letters.toUpperCase()}</h1>

      <Hive letters={letters.toUpperCase()}/>

      <WordList letters={letters.toLowerCase()}/>

    </div>
  );
}

