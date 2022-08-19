import { useState } from 'react';
import Axios from 'axios';
import '../css/WordList.css';

import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

function strToUniqueSorted(str) {
  return Array.from(new Set(str.split(''))).sort().join('');
}

export default function WordList(props) {

  //const [sevenLetters, setSevenLetters] = useState(false);
  const [realWords, setRealWords] = useState([]);
  const letters = props.letters.replaceAll("_", "").split('').join('');
  const sortedLetters = props.letters.replaceAll("_", "").split('').sort().join('');
  const [pangramLetters, setPangramLetters] = useState(letters);
  const [noWords, setNoWords] = useState(false);


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
        setRealWords(['']);
        setNoWords(true);
        return null;
      }
      else {
        let matchedWords = words[sortedLetters].filter(wrd => wrd.includes(letters.charAt(0)));
        console.log(matchedWords);

        setRealWords(matchedWords || [`no words found from letters '${letters.toUpperCase()}'`]);
      }
    }

    setRealWords(['\n']);
    setNoWords(false);
    doRest();
    setPangramLetters(letters);
  }

  return (
    <div className="wordListContainer">

      {letters.length === 7 ?
        (realWords[0] !== '\n' ?
          <Button onClick={getWordsOnClick} variant='contained'>get words</Button> :
          <Button variant="outlined">loading...</Button>) :
        <Button onClick={getWordsOnClick} variant='contained' disabled>get words</Button>
      }

      {noWords ?
        <h4>{`No words found from '${letters.toUpperCase()}'`}</h4> :
        null
      }

      {realWords.map((word) => (

        <div className='wordContainer'>
          <p className='pWord' key={word}>{word.toUpperCase()}</p>
          <p className='pPangram'>{strToUniqueSorted(pangramLetters) === strToUniqueSorted(word) ? 'Pangram!' : ''}</p>
        </div>

      ))}

    </div>
  )


}