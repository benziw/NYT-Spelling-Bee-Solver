import { useState } from 'react';
import Axios from 'axios';
import '../css/WordList.css';

import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


function strToUniqueSorted(str) {
  return Array.from(new Set(str.split(''))).sort().join('');
}

function isPangram(str) {
  return strToUniqueSorted(str) === strToUniqueSorted(str);
}

export default function WordList(props) {

  //const [sevenLetters, setSevenLetters] = useState(false);
  const [realWords, setRealWords] = useState([]);
  const [noWords, setNoWords] = useState(false);
  const [displayString, setDisplayString] = useState('');

  const letters = props.letters.replaceAll("_", "").split('').join('');
  const sortedLetters = props.letters.replaceAll("_", "").split('').sort().join('');

;


  const getWordsOnClick = (e) => {

    //check sevenletters
    if (letters.length < 7) {
      return null;
    }

    const getWordsPromise = Axios.get('http://localhost:3001/api/getWords').then((response) => {
      return response.data;
    });

    const doRest = async function () {
      const words = await getWordsPromise;

      if (!words[sortedLetters]) {
        setRealWords(['no words found']);
        setNoWords(true);
        //setDisplayString('no words found');
        return null;
      }
      else {
        let matchedWords = words[sortedLetters].filter(wrd => wrd.includes(letters.charAt(0)));
        console.log(matchedWords);

        setRealWords(matchedWords);
      }
    }

    setRealWords(['\n']);
    setNoWords(false);
    doRest();
    
  }

  return (
    <div className="wordListContainer">

      {letters.length === 7 ?
        (realWords[0] !== '\n' ?
          <Button onClick={getWordsOnClick} variant='contained'>get words</Button> :
          <Button variant="outlined">loading...</Button>) :
        <Button onClick={getWordsOnClick} variant='contained' disabled>get words</Button>
      }

      <TextField multiline minRows={12} maxRows={12} 
        value={realWords.join('\n')}
        className='wordsField'
        fullWidth={true}
      />

    </div>
  )


}