// Importation du hook useState pour gérer l'état local
import { useState } from 'react';

// Composant Square : affiche une case avec une valeur et gère le clic
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Composant Board : affiche le plateau du jeu et gère les actions du joueur
function Board({ xIsNext, squares, onPlay }) {
  // Fonction de gestion du clic sur une case
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return; // Ignore le clic si la case est déjà occupée ou si un gagnant est trouvé
    }
    const nextSquares = squares.slice(); // Crée une copie des cases
    nextSquares[i] = xIsNext ? 'X' : 'O'; // Ajoute X ou O dans la case
    onPlay(nextSquares); // Appelle la fonction pour mettre à jour l'état du jeu
  }

  const winner = calculateWinner(squares); // Vérifie s'il y a un gagnant
  let status;
  if (winner) {
    status = 'Winner: ' + winner; // Affiche le gagnant
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); // Affiche le joueur suivant
  }

  return (
    <>
      <div className="status">{status}</div>
      {/* Affiche le plateau de jeu sous forme de 3 lignes */}
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

// Composant Game : gère l'historique des mouvements et l'affichage des étapes
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // Historique des cases
  const [currentMove, setCurrentMove] = useState(0); // Mouvement actuel
  const xIsNext = currentMove % 2 === 0; // Vérifie quel joueur doit jouer
  const currentSquares = history[currentMove]; // Récupère l'état des cases pour le mouvement actuel

  // Fonction pour enregistrer un nouveau mouvement dans l'historique
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // Ajoute le nouveau mouvement à l'historique
    setHistory(nextHistory); // Met à jour l'historique
    setCurrentMove(nextHistory.length - 1); // Passe au mouvement suivant
  }

  // Fonction pour revenir à un mouvement précédent
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Crée la liste des boutons pour naviguer entre les mouvements
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
        <ol>{moves}</ol> {/* Affiche la liste des mouvements */}
      </div>
    </div>
  );
}

// Fonction pour déterminer si un joueur a gagné
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
  // Vérifie chaque combinaison gagnante
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Retourne le gagnant
    }
  }
  return null; // Aucun gagnant
}
