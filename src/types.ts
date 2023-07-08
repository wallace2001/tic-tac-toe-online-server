export interface User {
    name: string;
    roomJoined: string;
}

export interface IMoveGame {
    matrix: string[][];
    turn: boolean;
    start: boolean;
    winnerSymbol: 'x' | 'o' | '';
    symbol: string;
    matrixWinner: string[][];
    user: User;
}

export type ICallback = (options: IMoveGame) => void;
export type ICallbackJoin = ({ start }) => void;