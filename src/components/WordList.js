import '../css/WordList.css';

import TextField from '@mui/material/TextField';

function strToUniqueSorted(str) {
  return Array.from(new Set(str.split(''))).sort().join('');
}

function isPangram(str, ltrs) {
  return strToUniqueSorted(str) === strToUniqueSorted(ltrs);
}

export default function WordList(props) {

  const words = props.words;
  const letters = props.letters;

  return (
    <div className="wordListContainer">

      <ul>
        {words.map(word => 
          <li className={isPangram(word, letters) ? 'pangram' : ''}>{word}</li>
        )}
      </ul>

    </div>
  )


}