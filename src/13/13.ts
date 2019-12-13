import { readFileFromInput } from '../utils/readFile';
import { IntCode } from '../11/intCode';
import { GameField } from './gameField';
import * as readLineSync from 'readline-sync';

const fileName = './input/13.txt';

export async function main() {
    let lines = await readFileFromInput(fileName);
    let operations: number[] = lines.split(',').map(Number);

    let intCode = new IntCode(operations.slice(), [], false);
    intCode.start();
    let gameField = new GameField();

    while (intCode.output.length > 0) {
        let [x, y, type] = intCode.output.splice(0, 3);

        if (x == -1 && y == 0) gameField.score = type;
        else gameField.renderCell(x, y, type);
    }

    console.log(`Part 1: ${gameField.getNumberOfType(GameField.BLOCK)}`);

    let operationsPartTwo = operations.slice();
    operationsPartTwo[0] = 2;
    intCode = new IntCode(operationsPartTwo, [], false, true);
    gameField = new GameField();

    while (true) {
        intCode.start();
        while (intCode.output.length > 0) {
            let [x, y, type] = intCode.output.splice(0, 3);

            if (x == -1 && y == 0) gameField.score = type;
            else gameField.renderCell(x, y, type);
        }

        // gameField.render(intCode.output);

        let ballY = gameField.getPositionOf(GameField.BALL)[1];
        let paddleY = gameField.getPositionOf(GameField.PADDLE)[1];

        intCode.inputs = [ballY < paddleY ? -1 : ballY > paddleY ? 1 : 0];

        if (gameField.getNumberOfType(GameField.BLOCK) == 0) break;
    }

    console.log(`Part 2: ${gameField.score}`);
}
