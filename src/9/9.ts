import { readFileFromInput } from '../utils/readFile';
import { IntCode } from '../9/intCode';
const fileName = './input/9.txt';

export async function main() {
    let input = await readFileFromInput(fileName);
    let array: number[] = input.split(',').map(value => parseInt(value));

    let intCode = new IntCode(array);
    intCode.start();
}
