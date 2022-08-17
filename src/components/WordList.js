import { useState } from 'react';
import Axios from 'axios';


export default function WordList(props) {

  const [sevenLetters, setSevenLetters] = useState(false);
  const [realWords, setRealWords] = useState([]);
  const letters = props.letters.replaceAll("_", "").split('').sort().join('');


  const getWordsOnClick = (e) => {

    //check sevenletters
    if (letters.length < 7) {
      setSevenLetters(false);
      //console.log('state changed');
      return null;
    }
    else {
      setSevenLetters(true);
    }

    const getWordsPromise = Axios.get('http://localhost:3001/api/getWords').then((response) => {
      return response.data;
    });

    const doRest = async function () {
      const words = await getWordsPromise;
      console.log(words);

      setRealWords(words[letters] || [`no words found from letters '${letters.toUpperCase()}'`]);
    }


    doRest();

  }

  return (
    <div className="wordListContainer">
      <button onClick={getWordsOnClick}>get words</button>

      {sevenLetters ?
        null :
        <p>must enter seven letters</p>
      }

      {realWords.map((word) => (
        <p>{word}</p>
      ))}

    </div>
  )


}