export default function GameOver(props){
const {winner, onRestart} = props;

    return (
        <div id="game-over">
            <h2> Game Over</h2>
            <p> {!winner ? "It's a draw!" : `Congratulations! ${winner}, You won.`}</p>
            <p><button onClick={onRestart}> Rematch! </button></p>
        </div>

    );
}