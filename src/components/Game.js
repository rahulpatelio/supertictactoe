import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../winner';


const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [playNumber, setPlayNumber] = useState(0);
    const [xWillPlay, setXwillPlay] = useState(true);
    const winner = calculateWinner(history[playNumber]);
    const xOro = xWillPlay ? "X" : "O";

    const handleClick = (i) => {
        const historyMarker = history.slice(0, playNumber + 1);
        const current = historyMarker[playNumber];
        const squares = [...current];
        // return if won or sq. fill
        if (winner || squares[i]) return;
        // select sq.
        squares[i] = xOro;
        setHistory([...historyMarker, squares]);
        setPlayNumber(historyMarker.length);
        setXwillPlay(!xWillPlay);
    };

    const jumpTo = (step) => {
        setPlayNumber(step);
        setXwillPlay(step % 2 === 0);
      }

    const renderMoves = () => 
        history.map((_step, move) => {
            const destination = move ? `Go To Move #${move}` : "Go To Start";
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            )
        })

    return (
        <>
            <h1> Super Tic Tac Toe</h1>
            <Board squares={history[playNumber]} onClick={handleClick} />
            <div className="info-wrapper">
                <div>
                    <h3>Play By Play</h3>
                    {renderMoves()}
                </div>
                <h3>{winner ? "Winner: " + winner : "Next Player: " + xOro}</h3>
            </div>
        </>
    )
}

export default Game;
