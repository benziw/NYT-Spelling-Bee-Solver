import './css/App.css';

import { useState, useRef, useEffect } from 'react';
import Axios from 'axios';

import Hive from './components/Hive';
import WordList from './components/WordList';

import GitHubIcon from '@mui/icons-material/GitHub';
import HiveIcon from '@mui/icons-material/Hive';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

function strToUniqueSorted(str) {
  return Array.from(new Set(str.split(''))).sort().join('');
}

function isPangram(str, ltrs) {
  return strToUniqueSorted(str) === strToUniqueSorted(ltrs);
}

export default function App() {

  const [letters, setLetters] = useState('_______');
  const [realWords, setRealWords] = useState([]);

  const focusRef = useRef(null);


  const textOnChange = (e) => {

    let str = e.target.value.replace(/[^a-zA-Z]/gi, '');

    if (str.length > 7) {
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

  const enterKeyPress = (e) => {
    if(e.key === 'Enter'){
      getWordsOnClick();
    }
  }

  const getWordsOnClick = (e) => {

    //check sevenletters
    if (letters.length < 7) {
      return null;
    }

    const getWordsPromise = Axios.get('http://localhost:3001/api/getWords').then((response) => {
      return response.data;
    });

    const doRest = async function () {

      let sortedLetters = strToUniqueSorted(letters);

      const words = await getWordsPromise;

      if (!words[sortedLetters]) {
        setRealWords(['no words found']);
        return null;
      }
      else {
        let matchedWords = words[sortedLetters].filter(wrd => wrd.includes(letters.charAt(0)));
        console.log(matchedWords);

        setRealWords(matchedWords);
      }
    }

    setRealWords(['\n']);
    doRest();
    
  }

  return (
    <div className="App">

      <div className='header'>
        <Link href='https://www.nytimes.com/puzzles/spelling-bee' target='_blank'>
          <HiveIcon />
        </Link>
        <h1>nyt spelling bee solver</h1>
        <Link href='https://github.com/benziw/NYT-Spelling-Bee-Solver' target="_blank">
          <GitHubIcon />
        </Link>

      </div>

      <h4>Enter letters. First letter will be center letter. No duplicates. <span className='pangram'>Pangrams</span> will be bold and yellow.</h4>

      <div className='contentContainer'>
        <input 
          autoFocus
          className='inputLetters' 
          type='text' 
          onChange={textOnChange} 
          onKeyDown={enterKeyPress}
          value={letters.replaceAll('_','')}
          ref={focusRef}
          onBlur={(e) => focusRef.current.focus()}
        ></input>
        <Button 
          onClick={getWordsOnClick}
          variant='contained'
          >get words
        </Button>
        <Hive letters={letters.toUpperCase()} />
        <WordList words={realWords} letters={letters}/>
      </div>


    </div>
  );
}

