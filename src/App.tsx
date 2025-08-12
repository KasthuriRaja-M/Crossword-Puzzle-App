import React, { useState, useEffect, useCallback } from 'react';
import CrosswordGrid from './components/CrosswordGrid';
import CluesPanel from './components/CluesPanel';
import Controls from './components/Controls';
import Stats from './components/Stats';
import { CrosswordData, Cell, Direction } from './types/crossword';
import { generateCrossword } from './utils/crosswordGenerator';

const App: React.FC = () => {
  const [crosswordData, setCrosswordData] = useState<CrosswordData | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [currentDirection, setCurrentDirection] = useState<Direction>('across');
  const [gameStats, setGameStats] = useState({
    filledCells: 0,
    totalCells: 0,
    completedWords: 0,
    totalWords: 0
  });
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Generate new crossword on component mount
  useEffect(() => {
    generateNewCrossword();
  }, [generateNewCrossword]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning]);

  const generateNewCrossword = useCallback(() => {
    const newCrossword = generateCrossword();
    setCrosswordData(newCrossword);
    setSelectedCell(null);
    setCurrentDirection('across');
    setTimer(0);
    setIsTimerRunning(true);
    updateGameStats(newCrossword);
  }, [updateGameStats]);

  const updateGameStats = useCallback((data: CrosswordData) => {
    const totalCells = data.grid.flat().filter(cell => !cell.isBlack).length;
    const filledCells = data.grid.flat().filter(cell => !cell.isBlack && cell.value !== '').length;
    const totalWords = data.acrossClues.length + data.downClues.length;
    const completedWords = data.acrossClues.filter(clue => 
      isWordComplete(data, clue.startRow, clue.startCol, 'across')
    ).length + data.downClues.filter(clue => 
      isWordComplete(data, clue.startRow, clue.startCol, 'down')
    ).length;

    setGameStats({ filledCells, totalCells, completedWords, totalWords });
  }, [isWordComplete]);

  const isWordComplete = useCallback((data: CrosswordData, startRow: number, startCol: number, direction: Direction): boolean => {
    const word = getWordAtPosition(data, startRow, startCol, direction);
    return word.every(cell => cell.value !== '');
  }, []);

  const getWordAtPosition = (data: CrosswordData, startRow: number, startCol: number, direction: Direction): Cell[] => {
    const word: Cell[] = [];
    let row = startRow;
    let col = startCol;

    while (row < data.grid.length && col < data.grid[0].length && !data.grid[row][col].isBlack) {
      word.push(data.grid[row][col]);
      if (direction === 'across') {
        col++;
      } else {
        row++;
      }
    }

    return word;
  };

  const handleCellClick = useCallback((row: number, col: number) => {
    if (!crosswordData) return;

    const cell = crosswordData.grid[row][col];
    if (cell.isBlack) return;

    setSelectedCell({ row, col });

    // Determine direction based on available words
    const hasAcrossWord = hasWordAtPosition(crosswordData, row, col, 'across');
    const hasDownWord = hasWordAtPosition(crosswordData, row, col, 'down');

    if (hasAcrossWord && hasDownWord) {
      // Toggle direction if both are available
      setCurrentDirection(prev => prev === 'across' ? 'down' : 'across');
    } else if (hasAcrossWord) {
      setCurrentDirection('across');
    } else if (hasDownWord) {
      setCurrentDirection('down');
    }
  }, [crosswordData]);

  const hasWordAtPosition = (data: CrosswordData, row: number, col: number, direction: Direction): boolean => {
    if (direction === 'across') {
      // Check if there's a word starting to the left
      let checkCol = col;
      while (checkCol >= 0 && !data.grid[row][checkCol].isBlack) {
        if (data.grid[row][checkCol].number) return true;
        checkCol--;
      }
    } else {
      // Check if there's a word starting above
      let checkRow = row;
      while (checkRow >= 0 && !data.grid[checkRow][col].isBlack) {
        if (data.grid[checkRow][col].number) return true;
        checkRow--;
      }
    }
    return false;
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!crosswordData || !selectedCell) return;

    const { row, col } = selectedCell;
    const newGrid = [...crosswordData.grid.map(row => [...row])];

    if (event.key === 'Backspace' || event.key === 'Delete') {
      // Clear current cell and move to previous
      newGrid[row][col] = { ...newGrid[row][col], value: '' };
      moveToPreviousCell();
    } else if (event.key.match(/^[a-zA-Z]$/)) {
      // Fill current cell and move to next
      newGrid[row][col] = { ...newGrid[row][col], value: event.key.toUpperCase() };
      moveToNextCell();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || 
               event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      handleArrowKey(event.key);
    } else if (event.key === 'Tab') {
      event.preventDefault();
      setCurrentDirection(prev => prev === 'across' ? 'down' : 'across');
    }

    const newCrosswordData = { ...crosswordData, grid: newGrid };
    setCrosswordData(newCrosswordData);
    updateGameStats(newCrosswordData);
  }, [crosswordData, selectedCell, currentDirection, moveToNextCell, moveToPreviousCell, handleArrowKey, updateGameStats]);

  const moveToNextCell = useCallback(() => {
    if (!crosswordData || !selectedCell) return;

    const { row, col } = selectedCell;
    let nextRow = row;
    let nextCol = col;

    if (currentDirection === 'across') {
      nextCol++;
    } else {
      nextRow++;
    }

    // Find next valid cell
    while (nextRow < crosswordData.grid.length && nextCol < crosswordData.grid[0].length) {
      if (!crosswordData.grid[nextRow][nextCol].isBlack) {
        setSelectedCell({ row: nextRow, col: nextCol });
        return;
      }
      if (currentDirection === 'across') {
        nextCol++;
      } else {
        nextRow++;
      }
    }
  }, [crosswordData, selectedCell, currentDirection]);

  const moveToPreviousCell = useCallback(() => {
    if (!crosswordData || !selectedCell) return;

    const { row, col } = selectedCell;
    let prevRow = row;
    let prevCol = col;

    if (currentDirection === 'across') {
      prevCol--;
    } else {
      prevRow--;
    }

    // Find previous valid cell
    while (prevRow >= 0 && prevCol >= 0) {
      if (!crosswordData.grid[prevRow][prevCol].isBlack) {
        setSelectedCell({ row: prevRow, col: prevCol });
        return;
      }
      if (currentDirection === 'across') {
        prevCol--;
      } else {
        prevRow--;
      }
    }
  }, [crosswordData, selectedCell, currentDirection]);

  const handleArrowKey = useCallback((key: string) => {
    if (!crosswordData || !selectedCell) return;

    const { row, col } = selectedCell;
    let newRow = row;
    let newCol = col;

    switch (key) {
      case 'ArrowUp':
        newRow = Math.max(0, row - 1);
        break;
      case 'ArrowDown':
        newRow = Math.min(crosswordData.grid.length - 1, row + 1);
        break;
      case 'ArrowLeft':
        newCol = Math.max(0, col - 1);
        break;
      case 'ArrowRight':
        newCol = Math.min(crosswordData.grid[0].length - 1, col + 1);
        break;
    }

    if (!crosswordData.grid[newRow][newCol].isBlack) {
      setSelectedCell({ row: newRow, col: newCol });
    }
  }, [crosswordData, selectedCell]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleClueClick = useCallback((clueNumber: number, direction: Direction) => {
    if (!crosswordData) return;

    setCurrentDirection(direction);
    
    // Find the cell with this clue number
    for (let row = 0; row < crosswordData.grid.length; row++) {
      for (let col = 0; col < crosswordData.grid[0].length; col++) {
        if (crosswordData.grid[row][col].number === clueNumber) {
          setSelectedCell({ row, col });
          return;
        }
      }
    }
  }, [crosswordData]);

  const checkSolution = useCallback(() => {
    if (!crosswordData) return;

    const isCorrect = crosswordData.acrossClues.every(clue => {
      const word = getWordAtPosition(crosswordData, clue.startRow, clue.startCol, 'across');
      return word.map(cell => cell.value).join('') === clue.answer;
    }) && crosswordData.downClues.every(clue => {
      const word = getWordAtPosition(crosswordData, clue.startRow, clue.startCol, 'down');
      return word.map(cell => cell.value).join('') === clue.answer;
    });

    if (isCorrect) {
      setIsTimerRunning(false);
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      alert(`Congratulations! You solved the crossword puzzle in ${minutes}:${seconds.toString().padStart(2, '0')}!`);
    } else {
      alert('Not quite right. Keep trying!');
    }
  }, [crosswordData, timer]);

  const revealSolution = useCallback(() => {
    if (!crosswordData) return;

    const newGrid = crosswordData.grid.map(row =>
      row.map(cell => {
        if (cell.isBlack) return cell;
        return { ...cell, value: cell.correctValue || '' };
      })
    );

    const newCrosswordData = { ...crosswordData, grid: newGrid };
    setCrosswordData(newCrosswordData);
    setIsTimerRunning(false);
    updateGameStats(newCrosswordData);
  }, [crosswordData, updateGameStats]);

  const clearPuzzle = useCallback(() => {
    if (!crosswordData) return;

    const newGrid = crosswordData.grid.map(row =>
      row.map(cell => {
        if (cell.isBlack) return cell;
        return { ...cell, value: '' };
      })
    );

    const newCrosswordData = { ...crosswordData, grid: newGrid };
    setCrosswordData(newCrosswordData);
    setSelectedCell(null);
    setTimer(0);
    setIsTimerRunning(true);
    updateGameStats(newCrosswordData);
  }, [crosswordData, updateGameStats]);

  if (!crosswordData) {
    return (
      <div className="container">
        <div className="header">
          <h1>Crossword Puzzle App</h1>
          <p>Loading puzzle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Crossword Puzzle App</h1>
        <p>Solve the puzzle by filling in the words!</p>
      </div>

      <Stats stats={gameStats} timer={timer} isTimerRunning={isTimerRunning} />

      <div className="crossword-container">
        <CrosswordGrid
          grid={crosswordData.grid}
          selectedCell={selectedCell}
          currentDirection={currentDirection}
          onCellClick={handleCellClick}
        />
      </div>

      <CluesPanel
        acrossClues={crosswordData.acrossClues}
        downClues={crosswordData.downClues}
        selectedClue={selectedCell ? getClueNumberAtPosition(crosswordData, selectedCell.row, selectedCell.col, currentDirection) : null}
        onClueClick={handleClueClick}
      />

      <Controls
        onNewPuzzle={generateNewCrossword}
        onCheckSolution={checkSolution}
        onRevealSolution={revealSolution}
        onClearPuzzle={clearPuzzle}
        onToggleTimer={() => setIsTimerRunning(!isTimerRunning)}
        isTimerRunning={isTimerRunning}
      />
    </div>
  );
};

const getClueNumberAtPosition = (data: CrosswordData, row: number, col: number, direction: Direction): number | null => {
  if (direction === 'across') {
    // Find the start of the across word
    let checkCol = col;
    while (checkCol >= 0 && !data.grid[row][checkCol].isBlack) {
      if (data.grid[row][checkCol].number) {
        return data.grid[row][checkCol].number || null;
      }
      checkCol--;
    }
  } else {
    // Find the start of the down word
    let checkRow = row;
    while (checkRow >= 0 && !data.grid[checkRow][col].isBlack) {
      if (data.grid[checkRow][col].number) {
        return data.grid[checkRow][col].number || null;
      }
      checkRow--;
    }
  }
  return null;
};

export default App;
