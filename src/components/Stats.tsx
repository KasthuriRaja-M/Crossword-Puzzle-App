import React from 'react';

interface StatsProps {
  stats: {
    filledCells: number;
    totalCells: number;
    completedWords: number;
    totalWords: number;
  };
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const progressPercentage = stats.totalCells > 0 ? Math.round((stats.filledCells / stats.totalCells) * 100) : 0;
  const wordsProgressPercentage = stats.totalWords > 0 ? Math.round((stats.completedWords / stats.totalWords) * 100) : 0;

  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-number">{stats.filledCells}/{stats.totalCells}</span>
        <span className="stat-label">Cells Filled</span>
        <div style={{ 
          width: '100%', 
          height: '4px', 
          background: 'rgba(255,255,255,0.3)', 
          borderRadius: '2px',
          marginTop: '8px'
        }}>
          <div style={{
            width: `${progressPercentage}%`,
            height: '100%',
            background: '#4CAF50',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <div className="stat-item">
        <span className="stat-number">{stats.completedWords}/{stats.totalWords}</span>
        <span className="stat-label">Words Completed</span>
        <div style={{ 
          width: '100%', 
          height: '4px', 
          background: 'rgba(255,255,255,0.3)', 
          borderRadius: '2px',
          marginTop: '8px'
        }}>
          <div style={{
            width: `${wordsProgressPercentage}%`,
            height: '100%',
            background: '#2196F3',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <div className="stat-item">
        <span className="stat-number">{progressPercentage}%</span>
        <span className="stat-label">Overall Progress</span>
      </div>
    </div>
  );
};

export default Stats;
