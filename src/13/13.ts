import { readFileFromInput } from '../utils/readFile';
import { IntCode } from '../11/intCode';
import { GameField } from './gameField';
import * as readLineSync from 'readline-sync';

const fileName = './input/13.txt';

export async function main() {
    let auto = true;
    let lines = await readFileFromInput(fileName);
    let operations: number[] = lines.split(',').map(Number);

    let intCode = new IntCode(operations.slice(), [], false);
    let gameField = new GameField();

    intCode.start();
    gameField.render(intCode.output);

    console.log(`Part 1: ${gameField.getNumberOfType(GameField.BLOCK)}`);

    let operationsPartTwo = operations.slice();
    operationsPartTwo[0] = 2;
    intCode = new IntCode(operationsPartTwo, [], false, true);
    gameField = new GameField();

    while (true) {
        intCode.start();
        gameField.render(intCode.output);

        let ballY = gameField.getPositionOf(GameField.BALL)[1];
        let paddleY = gameField.getPositionOf(GameField.PADDLE)[1];

        if (auto)
            intCode.inputs = [ballY < paddleY ? -1 : ballY > paddleY ? 1 : 0];
        else {
            gameField.paint();
            intCode.inputs = [parseInt(readLineSync.question('Input: '))];
        }

        if (gameField.getNumberOfType(GameField.BLOCK) == 0) break;
    }

    console.log(`Part 2: ${gameField.score}`);
}
