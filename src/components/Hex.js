import { useState } from 'react';
import '../css/Hex.css';

export default function Hex (props){

  return (
    <div className='hex'>
      <svg viewBox="0 0 120 103.92304845413263" >
        <polygon points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263" fill={props.color} stroke="white" stroke-width="7.5"></polygon>
        <text class="cell-letter" x="50%" y="50%" dy="0.35em">{props.letter}</text>
      </svg>
      
    </div>
  );
}