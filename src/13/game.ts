import { IntCode } from '../11/intCode';
import { GameField } from './gameField';

export class Game {
    field: GameField;
    intCode: IntCode;

    constructor(operations: number[]) {
        this.intCode = new IntCode(operations);
        this.field = new GameField();
    }
}
