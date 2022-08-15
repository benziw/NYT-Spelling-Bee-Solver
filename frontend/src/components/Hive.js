import '../css/Hive.css';
import Hex from "./Hex";

const pickColor = (i) => i === 0 ? '#f7da20' : '#e6e6e6';

export default function Hive(props){

  //let letters = ['i','o','z','e','n','m','d'];

  return (
    <div className='hive'>
      {props.letters.split("").map((letter , i) => 
        <Hex className={`hive${i}`} letter={letter} color={pickColor(i)} key={i} />  
      )}
    </div>
    
  );
}