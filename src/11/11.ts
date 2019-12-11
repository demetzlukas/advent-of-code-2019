import { readFileFromInput } from '../utils/readFile';
import { IntCode } from '../9/intCode';
import { Painter } from './painter';
import { Cell } from './cell';

const fileName = './input/11.txt';

export async function main() {
    let input = await readFileFromInput(fileName);
    let operations: number[] = input.split(',').map(value => parseInt(value));

    let painter = new Painter(operations.slice());
    painter.render();
    console.log(`Part 1: ${Cell.numberOfVisitedCells}`);
}
