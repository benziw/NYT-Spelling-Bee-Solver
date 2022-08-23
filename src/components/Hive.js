import '../css/Hive.css';

export default function Hive(props) {

  const letterArray = props.letters.split("");

  return (
    <div className='hive'>
      {letterArray.map((letter, i) =>
        <svg class="hive-cell" viewBox="0 0 120 103.92304845413263">
          <polygon class="cell-fill" points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263" stroke="white" stroke-width="7.5"></polygon>
          <text class="cell-letter" x="50%" y="50%" dy="0.35em">{letter}
          </text>
        </svg>
      )}
    </div>

  );
}