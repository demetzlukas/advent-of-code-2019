import { readFileFromInput } from '../utils/readFile';
import { IntCode } from '../11/intCode';
import { GameField } from './gameField';

const fileName = './input/13.txt';

export async function main() {
    let lines = await readFileFromInput(fileName);
    let operations: number[] = lines.split(',').map(Number);

    let intCode = new IntCode(operations, [], false);
    intCode.start();
    let gameField = new GameField();
    let output = intCode.output.slice();

    while (output.length > 0) {
        let x = output.shift();
        let y = output.shift();
        let type = output.shift();
        gameField.render(x, y, type);
    }

    let numberOfBlock = gameField.field
        .map(row => row.filter(cell => cell === GameField.BLOCK).length)
        .reduce((sum, value) => sum + value);

    console.log(`Part 1: ${gameField.getNumberOfType(GameField.BLOCK)}`);
}
