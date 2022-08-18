import { useState } from 'react';
import Axios from 'axios';

import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

export default function WordList(props) {

  //const [sevenLetters, setSevenLetters] = useState(false);
  const [realWords, setRealWords] = useState([]);
  const letters = props.letters.replaceAll("_", "").split('').sort().join('');


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
      console.log(words);

      setRealWords(words[letters] || [`no words found from letters '${letters.toUpperCase()}'`]);
    }

    setRealWords(['loading...']);
    doRest();
  }

  return (
    <div className="wordListContainer">
      
      {letters.length == 7 ?
        (realWords[0] !== 'loading...' ? 
          <Button onClick={getWordsOnClick} variant='contained'>get words</Button> :
          <LoadingButton loading variant="outlined">loading...</LoadingButton>) :
        <Button onClick={getWordsOnClick} variant='contained' disabled>get words</Button>
      }

      {realWords.map((word) => (
        <p key={word}>{word}</p>
      ))}

    </div>
  )


}