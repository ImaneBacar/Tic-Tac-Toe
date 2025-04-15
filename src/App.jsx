// Hook pour gérer l'état
import { useState } from "react";

// Une case du jeu
function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"         
      onClick={onSquareClick}    // quand on clique sur la case
    >
      {value}                    
    </button>
  );
}

// Le plateau du jeu
export default function Board() {

  const [xIsNext, setXIsNext] = useState(true); // true si c’est à X de jouer

  const [squares, setSquares] = useState(Array(9).fill(null)); // les 9 cases du plateau

  const winner = calculateWinner(squares); // vérifie s'il y a un gagnant
  let status;

  if (winner) {
    status = "winner: " + winner; // affiche le gagnant
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O"); // sinon, indique le joueur suivant
  }

  // Quand on clique sur une case
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return; // on fait rien si déjà rempli ou si on a un gagnant

    const nextSquares = squares.slice(); // copie du tableau
    nextSquares[i] = xIsNext ? "X" : "O"; // X ou O selon le tour
    setSquares(nextSquares); // mise à jour des cases
    setXIsNext(!xIsNext);    // changement de joueur
  }

  return (
    <>
      <div className="status">{status}</div> {/* affiche le statut du jeu */}
      
      {/* 3 lignes de 3 cases */}
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

// Vérifie si quelqu’un a gagné
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
    [0, 4, 8], [2, 4, 6]             // diagonales
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // retourne le gagnant
    }
  }
  return null; // pas de gagnant
}
