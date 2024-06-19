import { useState } from 'react';

function Square({value, onSquareClick}) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

    function findAWinner(nextSquares) {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [6,4,2]
        ];

        for (let line of lines) {
            const [a,b,c] = line;
            if(nextSquares[a] !== null && nextSquares[a] === nextSquares[b] && nextSquares[a] === nextSquares[c]) {
                return nextSquares[a];
            }
        }

        return null;
    }

    function handleClick(idx) {
        if(squares[idx] === null && winner === null) {
            const nextSquares = squares.slice();
            nextSquares[idx] = player;
            const nextPlayer = player === 'X' ? 'O' : 'X';
            const nextWinner = findAWinner(nextSquares);

            setPlayer(nextPlayer);
            setSquares(nextSquares);
            setWinner(nextWinner);
        }
    }

    function relaunchGame() {
        const nextSquares = Array(9).fill(null);
        const nextPlayer = 'X';
        const nextWinner = null;

        setPlayer(nextPlayer);
        setSquares(nextSquares);
        setWinner(nextWinner);
    }

    return (
    <>
        {winner && <div>Player {winner} is the winner !!!</div>}
        <button onClick={relaunchGame}>Restart</button>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
    </>);
}

