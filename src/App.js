import './css/App.css';
import Hive from './components/Hive';
import { useState } from 'react';
import WordList from './components/WordList';

export default function App() {

  const [letters, setLetters] = useState('_______');

  const textOnChange = (e) => {
    let str = e.target.value;
    while(str.length < 7){
      str += "_";
    }
    setLetters(str); 
  }

  return (
    <div className="App">

      <input onChange={textOnChange} maxLength='7'></input>
      <h4>{`Enter letters above. First letter will be center letter`}</h4>
      <h1>{`${letters}`}</h1>

      <Hive letters={letters}/>

      <WordList letters={letters}/>
    </div>
  );
}

