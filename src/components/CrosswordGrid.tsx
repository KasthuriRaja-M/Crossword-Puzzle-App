import React from 'react';
import { Cell, Direction } from '../types/crossword';

interface CrosswordGridProps {
  grid: Cell[][];
  selectedCell: { row: number; col: number } | null;
  currentDirection: Direction;
  onCellClick: (row: number, col: number) => void;
}

const CrosswordGrid: React.FC<CrosswordGridProps> = ({
  grid,
  selectedCell,
  currentDirection,
  onCellClick
}) => {
  const isCellInCurrentWord = (row: number, col: number): boolean => {
    if (!selectedCell) return false;

    const { row: selectedRow, col: selectedCol } = selectedCell;
    
    if (currentDirection === 'across') {
      // Check if cell is in the same row as selected cell
      if (row !== selectedRow) return false;
      
      // Find the start of the word
      let startCol = selectedCol;
      while (startCol >= 0 && !grid[row][startCol].isBlack) {
        if (grid[row][startCol].number) break;
        startCol--;
      }
      startCol = Math.max(0, startCol);
      
      // Check if current cell is part of this word
      let checkCol = startCol;
      while (checkCol < grid[row].length && !grid[row][checkCol].isBlack) {
        if (checkCol === col) return true;
        checkCol++;
      }
    } else {
      // Check if cell is in the same column as selected cell
      if (col !== selectedCol) return false;
      
      // Find the start of the word
      let startRow = selectedRow;
      while (startRow >= 0 && !grid[startRow][col].isBlack) {
        if (grid[startRow][col].number) break;
        startRow--;
      }
      startRow = Math.max(0, startRow);
      
      // Check if current cell is part of this word
      let checkRow = startRow;
      while (checkRow < grid.length && !grid[checkRow][col].isBlack) {
        if (checkRow === row) return true;
        checkRow++;
      }
    }
    
    return false;
  };

  const getCellClassName = (row: number, col: number): string => {
    const cell = grid[row][col];
    let className = 'crossword-cell';
    
    if (cell.isBlack) {
      className += ' black';
    } else {
      if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
        className += ' selected';
      } else if (isCellInCurrentWord(row, col)) {
        className += ' filled';
      }
    }
    
    return className;
  };

  return (
    <div 
      className="crossword-grid"
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${grid.length}, 1fr)`
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={getCellClassName(rowIndex, colIndex)}
            onClick={() => onCellClick(rowIndex, colIndex)}
            style={{ position: 'relative' }}
          >
            {cell.number && (
              <span className="number">{cell.number}</span>
            )}
            {!cell.isBlack && cell.value && (
              <span>{cell.value}</span>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CrosswordGrid;
