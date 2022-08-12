import { useState } from 'react';

export default function WordList(props){

    const [sevenLetters, setSevenLetters] = useState(true);
    const [gotWords,setGotWords] = useState(true);
    const [realWords, setRealWords] = useState([]);

    const letters = props.letters.replaceAll("_","");
    //let wordsFromAPI = [];

    const generatePossibleWords = (ltrs) => {
        
    }
    
    const getWordsOnClick = (e) => {

        //console.log(letters);
        //console.log(sevenLetters);

        //check sevenletters
        if(letters.length < 7){
            setSevenLetters(false);
            //console.log('state changed');
            return null;
        }
        else{
            setSevenLetters(true);
        }
        
        //first generate all possible words
        generatePossibleWords();

        //query words_dictionary.json


        
    }

    return(
        <div className="wordListContainer">
            <button onClick={getWordsOnClick}>get words</button>

            {sevenLetters ?
                null :
                <p>must enter seven letters</p>
            }

            {/* {realWords.map(word => <p key={word}>word</p>)} */}
        </div>
    )


}