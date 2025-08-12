import React from 'react';

interface ControlsProps {
  onNewPuzzle: () => void;
  onCheckSolution: () => void;
  onRevealSolution: () => void;
  onClearPuzzle: () => void;
  onToggleTimer: () => void;
  isTimerRunning: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onNewPuzzle,
  onCheckSolution,
  onRevealSolution,
  onClearPuzzle,
  onToggleTimer,
  isTimerRunning
}) => {
  return (
    <div className="controls">
      <button className="btn secondary" onClick={onNewPuzzle}>
        New Puzzle
      </button>
      <button className="btn" onClick={onCheckSolution}>
        Check Solution
      </button>
      <button className="btn secondary" onClick={onRevealSolution}>
        Reveal Solution
      </button>
      <button className="btn danger" onClick={onClearPuzzle}>
        Clear Puzzle
      </button>
      <button className="btn secondary" onClick={onToggleTimer}>
        {isTimerRunning ? '⏸️ Pause Timer' : '▶️ Start Timer'}
      </button>
    </div>
  );
};

export default Controls;
