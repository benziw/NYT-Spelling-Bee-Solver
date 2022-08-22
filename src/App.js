import './css/App.css';

import { useState } from 'react';

import Hive from './components/Hive';
import WordList from './components/WordList';

import TextField from '@mui/material/TextField';
import GitHubIcon from '@mui/icons-material/GitHub';
import HiveIcon from '@mui/icons-material/Hive';
import Link from '@mui/material/Link';


export default function App() {

  const [letters, setLetters] = useState('_______');

  const textOnChange = (e) => {

    let str = e.target.value.replace(/[^a-zA-Z]/gi, '');

    if (str.length >= 7) {
      str = str.slice(0, 7);
    }
    else {   //remove repeats
      let newChar = str.slice(-1);
      let oldStr = str.slice(0, -1).toLowerCase();
      //console.log(`newChar: ${newChar} | oldStr: ${oldStr}`);
      str = (oldStr.indexOf(newChar) > -1 ? oldStr : str);
      //console.log(`str: ${str}`);
    }

    while (str.length < 7) {
      str += "_";
    }
    setLetters(str);
  }

  return (
    <div className="App">

      <div className='header'>
        <HiveIcon />
        <h1>nyt spelling bee solver</h1>
        <Link href='https://github.com/benziw/NYT-Spelling-Bee-Solver' target="_blank">
          <GitHubIcon />
        </Link>

      </div>

      <div className='inputContainer'>
        <TextField autoFocus={true} onChange={textOnChange} maxLength='7' value={letters.replaceAll("_", "").toUpperCase()}></TextField>
        <h4>{`Enter letters above. First letter will be center letter. No duplicates.`}</h4>
      </div>

      <div className='contentContainer'>
        <div className='hiveContainer'>
          <h1 className='lettersDisplay'>{letters.toUpperCase()}</h1>
          <Hive letters={letters.toUpperCase()} />
        </div>

        <WordList letters={letters.toLowerCase()} />
      </div>


    </div>
  );
}

