export type Direction = 'across' | 'down';

export interface Cell {
  value: string;
  correctValue?: string;
  isBlack: boolean;
  number?: number;
}

export interface Clue {
  number: number;
  clue: string;
  answer: string;
  startRow: number;
  startCol: number;
}

export interface CrosswordData {
  grid: Cell[][];
  acrossClues: Clue[];
  downClues: Clue[];
}
