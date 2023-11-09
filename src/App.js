
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // this function will get run when a Square() is clicked.
    // design.
    // if (expression) {
    // end process
    // }
    // fill the square, save the history, and trigger the rerendering of the entire Game() component.
    console.log(squares)
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // fill the square, and trigger the rerendering of the entire Game() component.
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);

  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
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
    </>
  );
}

export default function Game() {
  // currentMoves is a state that control which version of the game we are seeing.
  // history state store all the versions of our game. 
  const [currentMoves, setCurrentMoves] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // we recalculate xIsNext and currentSquares everytime we rerender our Game(). those information 
  // will be passed down to Board() so it can render correctly. 
  const xIsNext = (currentMoves % 2 == 0)
  const currentSquares = history[currentMoves];

  function handlePlay(nextSquares) {
    // this function will run when a square is clicked with nextSquares is the new move.
    // if the currentMoves is not the last in history, we want to reset the history
    // else, we want to proceed as usual.
    setHistory([...history.slice(0, currentMoves + 1), nextSquares])
    setCurrentMoves(currentMoves + 1);
  }
  function jumpTo(index) {
    // by setting the currentMoves state, React will rerender
    // the whold Game component to reflect the version of the game.
    setCurrentMoves(index);
  }
  // moves will be an array of button elements
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}



