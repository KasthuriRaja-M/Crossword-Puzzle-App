import React from 'react';
import { Clue, Direction } from '../types/crossword';

interface CluesPanelProps {
  acrossClues: Clue[];
  downClues: Clue[];
  selectedClue: number | null;
  onClueClick: (clueNumber: number, direction: Direction) => void;
}

const CluesPanel: React.FC<CluesPanelProps> = ({
  acrossClues,
  downClues,
  selectedClue,
  onClueClick
}) => {
  const handleClueClick = (clue: Clue, direction: Direction) => {
    onClueClick(clue.number, direction);
  };

  const isClueSelected = (clueNumber: number): boolean => {
    return selectedClue === clueNumber;
  };

  return (
    <div className="clues-container">
      <div className="clues-section">
        <h3>Across</h3>
        {acrossClues.map((clue) => (
          <div
            key={`across-${clue.number}`}
            className={`clue-item ${isClueSelected(clue.number) ? 'selected' : ''}`}
            onClick={() => handleClueClick(clue, 'across')}
          >
            <span className="clue-number">{clue.number}.</span>
            <span>{clue.clue}</span>
          </div>
        ))}
      </div>

      <div className="clues-section">
        <h3>Down</h3>
        {downClues.map((clue) => (
          <div
            key={`down-${clue.number}`}
            className={`clue-item ${isClueSelected(clue.number) ? 'selected' : ''}`}
            onClick={() => handleClueClick(clue, 'down')}
          >
            <span className="clue-number">{clue.number}.</span>
            <span>{clue.clue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CluesPanel;
