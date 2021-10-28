
const ScoreBoard = ({score}) => {
        return(
        <div className="score-board">
            <p>Score:</p>
            <h3>{score}</h3>
        </div>
        );
}

export default ScoreBoard