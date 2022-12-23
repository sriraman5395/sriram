import React from 'react'
import { useState } from 'react';
import './Puzzle.css'
const Puzzle = () => {
    const [tiles, setTiles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null]);
    const [moves, setMoves] = useState(0);
    const [emptyTileIndex, setEmptyTileIndex] = useState(null);
  
    const handleTileClick = (index) => {
      // Check if the tile can be moved
      if (index > 0 && index < 16 && (tiles[index - 1] === null || tiles[index + 1] === null || tiles[index - 4] === null || tiles[index + 4] === null)) {
        // Swap the clicked tile with the null tile
        const newTiles = [...tiles];
        newTiles[tiles.indexOf(null)] = tiles[index];
        newTiles[index] = null;
        setTiles(newTiles);
        setEmptyTileIndex(index);
        setMoves(moves + 1);
      }
    };
    const mixTiles = () => {
        // Create a copy of the tiles array
        let mixedTiles = [...tiles];
    
        // Randomly swap the tiles
        for (let i = 0; i < 1000; i++) {
          const index1 = Math.floor(Math.random() * 16);
          const index2 = Math.floor(Math.random() * 16);
          const temp = mixedTiles[index1];
          mixedTiles[index1] = mixedTiles[index2];
          mixedTiles[index2] = temp;
        }
    
        // Update the tiles state with the mixed tiles
        setTiles(mixedTiles);
      };
  return (
    <div className="puzzle-game">
    <div className="puzzle-grid">
      {tiles.map((tile, index) => (
        <div key={index} onClick={() => handleTileClick(index)} className="puzzle-tile">
          {tile}
        </div>
      ))}
    </div>
    <div className="puzzle-moves">Moves: {moves}</div>
    <button onClick={mixTiles}>Mix Tiles</button>
  </div>
  )
}

export default Puzzle