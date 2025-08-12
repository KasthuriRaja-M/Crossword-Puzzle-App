import { CrosswordData } from '../types/crossword';

// Sample crossword data - a simple 5x5 puzzle
const sampleCrossword: CrosswordData = {
  grid: [
    [
      { value: '', correctValue: 'H', isBlack: false, number: 1 },
      { value: '', correctValue: 'E', isBlack: false },
      { value: '', correctValue: 'L', isBlack: false },
      { value: '', correctValue: 'L', isBlack: false },
      { value: '', correctValue: 'O', isBlack: false, number: 2 }
    ],
    [
      { value: '', correctValue: 'E', isBlack: false, number: 3 },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'W', isBlack: false, number: 4 }
    ],
    [
      { value: '', correctValue: 'L', isBlack: false, number: 5 },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'O', isBlack: false, number: 6 }
    ],
    [
      { value: '', correctValue: 'L', isBlack: false, number: 7 },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'R', isBlack: false, number: 8 }
    ],
    [
      { value: '', correctValue: 'O', isBlack: false, number: 9 },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'D', isBlack: false, number: 10 }
    ]
  ],
  acrossClues: [
    {
      number: 1,
      clue: "Greeting word",
      answer: "HELLO",
      startRow: 0,
      startCol: 0
    },
    {
      number: 3,
      clue: "First letter of the alphabet",
      answer: "E",
      startRow: 1,
      startCol: 0
    },
    {
      number: 5,
      clue: "Twelfth letter of the alphabet",
      answer: "L",
      startRow: 2,
      startCol: 0
    },
    {
      number: 7,
      clue: "Twelfth letter of the alphabet",
      answer: "L",
      startRow: 3,
      startCol: 0
    },
    {
      number: 9,
      clue: "Fifteenth letter of the alphabet",
      answer: "O",
      startRow: 4,
      startCol: 0
    }
  ],
  downClues: [
    {
      number: 2,
      clue: "World (abbreviation)",
      answer: "WORLD",
      startRow: 0,
      startCol: 4
    },
    {
      number: 4,
      clue: "Twenty-third letter of the alphabet",
      answer: "W",
      startRow: 1,
      startCol: 4
    },
    {
      number: 6,
      clue: "Fifteenth letter of the alphabet",
      answer: "O",
      startRow: 2,
      startCol: 4
    },
    {
      number: 8,
      clue: "Eighteenth letter of the alphabet",
      answer: "R",
      startRow: 3,
      startCol: 4
    },
    {
      number: 10,
      clue: "Fourth letter of the alphabet",
      answer: "D",
      startRow: 4,
      startCol: 4
    }
  ]
};

// More complex crossword data - 7x7 puzzle
const complexCrossword: CrosswordData = {
  grid: [
    [
      { value: '', correctValue: 'P', isBlack: false, number: 1 },
      { value: '', correctValue: 'Y', isBlack: false },
      { value: '', correctValue: 'T', isBlack: false },
      { value: '', correctValue: 'H', isBlack: false },
      { value: '', correctValue: 'O', isBlack: false },
      { value: '', correctValue: 'N', isBlack: false },
      { value: '', correctValue: '', isBlack: true }
    ],
    [
      { value: '', correctValue: 'Y', isBlack: false, number: 2 },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'R', isBlack: false, number: 3 }
    ],
    [
      { value: '', correctValue: 'T', isBlack: false, number: 4 },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'R', isBlack: false, number: 5 },
      { value: '', correctValue: 'E', isBlack: false },
      { value: '', correctValue: 'A', isBlack: false },
      { value: '', correctValue: 'C', isBlack: false },
      { value: '', correctValue: 'T', isBlack: false }
    ],
    [
      { value: '', correctValue: 'H', isBlack: false, number: 6 },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'E', isBlack: false },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true }
    ],
    [
      { value: '', correctValue: 'O', isBlack: false, number: 7 },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'A', isBlack: false },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'J', isBlack: false, number: 8 },
      { value: '', correctValue: 'A', isBlack: false },
      { value: '', correctValue: 'V', isBlack: false }
    ],
    [
      { value: '', correctValue: 'N', isBlack: false, number: 9 },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'C', isBlack: false },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'A', isBlack: false },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true }
    ],
    [
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'T', isBlack: false, number: 10 },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: 'S', isBlack: false, number: 11 },
      { value: '', correctValue: '', isBlack: true },
      { value: '', correctValue: '', isBlack: true }
    ]
  ],
  acrossClues: [
    {
      number: 1,
      clue: "Popular programming language",
      answer: "PYTHON",
      startRow: 0,
      startCol: 0
    },
    {
      number: 2,
      clue: "Question word",
      answer: "WHY",
      startRow: 1,
      startCol: 0
    },
    {
      number: 4,
      clue: "React framework",
      answer: "REACT",
      startRow: 2,
      startCol: 2
    },
    {
      number: 6,
      clue: "Programming language",
      answer: "HTML",
      startRow: 3,
      startCol: 0
    },
    {
      number: 7,
      clue: "JavaScript framework",
      answer: "JAVA",
      startRow: 4,
      startCol: 4
    },
    {
      number: 9,
      clue: "CSS framework",
      answer: "CSS",
      startRow: 5,
      startCol: 2
    },
    {
      number: 10,
      clue: "TypeScript",
      answer: "TS",
      startRow: 6,
      startCol: 2
    }
  ],
  downClues: [
    {
      number: 3,
      clue: "React component",
      answer: "RENDER",
      startRow: 0,
      startCol: 6
    },
    {
      number: 5,
      clue: "Web technology",
      answer: "REACT",
      startRow: 2,
      startCol: 2
    },
    {
      number: 6,
      clue: "Markup language",
      answer: "HTML",
      startRow: 3,
      startCol: 0
    },
    {
      number: 8,
      clue: "JavaScript",
      answer: "JAVASCRIPT",
      startRow: 4,
      startCol: 4
    },
    {
      number: 11,
      clue: "TypeScript",
      answer: "TS",
      startRow: 6,
      startCol: 4
    }
  ]
};

// Array of available crosswords
const crosswords: CrosswordData[] = [sampleCrossword, complexCrossword];

export const generateCrossword = (): CrosswordData => {
  // Randomly select a crossword from the available ones
  const randomIndex = Math.floor(Math.random() * crosswords.length);
  return crosswords[randomIndex];
};
