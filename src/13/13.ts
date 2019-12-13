import { readFileFromInput } from '../utils/readFile';
import { IntCode } from '../11/intCode';
import { GameField } from './gameField';

const fileName = './input/13.txt';

export async function main() {
    let lines = await readFileFromInput(fileName);
    let operations: number[] = lines.split(',').map(Number);

    let intCode = new IntCode(operations.slice(), [], false);
    intCode.start();
    let gameField = new GameField();
    let output = intCode.output.slice();

    while (output.length > 0) {
        let x = output.shift();
        let y = output.shift();
        let type = output.shift();
        gameField.render(x, y, type);
    }

    console.log(`Part 1: ${gameField.getNumberOfType(GameField.BLOCK)}`);
}
