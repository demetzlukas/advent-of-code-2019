import { readFileFromInput } from '../utils/readFile';
import * as readLineSync from 'readline-sync';

let inputs: number[] = [];
const fileName = './input/7.txt';
let opCounter: number = 0;

export async function main() {
    let input = await readFileFromInput(fileName);
    let array: number[] = input.split(',').map(value => parseInt(value));

    let permutations: any[][] = permutator([0, 1, 2, 3, 4]).map(permutation => [
        permutation[0],
        0,
        ...permutation.slice(1),
    ]);

    let max = permutations
        .map(p => {
            inputs = p;
            let i = 0;
            while (i++ < 5) getResult(array.slice());
            // getResult(array.slice());
            // getResult(array.slice());
            // getResult(array.slice());
            // getResult(array.slice());
            return inputs.pop();
        })
        .reduce((max, value) => (value > max ? value : max));

    console.log(`Part 1: ${max}`);
}

export function getResult(array: number[]): number {
    let operation: number[] = [];
    opCounter = 0;

    while ((operation = getOperation(array)) !== null)
        execute(array, operation);

    return array[0];
}

function permutator(inputArr: any[]): any[][] {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    };

    permute(inputArr);

    return result;
}

function getOperation(array: number[]): number[] {
    let result: number[] = [];
    let opCodeAsString = `${array[opCounter++]}`.padStart(5, '0');
    let opCode = parseInt(opCodeAsString.slice(-2));
    let positionModeFirst = !parseInt(opCodeAsString.slice(-3, -2));
    let positionModeSecond = !parseInt(opCodeAsString.slice(-4, -3));
    let positionModeThird = !parseInt(opCodeAsString.slice(-5, -4));

    result.push(opCode);
    // we always have at least one parameter
    result.push(getParameter(array, positionModeFirst));

    switch (opCode) {
        case 1:
        case 2:
        case 7:
        case 8:
            result.push(getParameter(array, positionModeSecond));
            result.push(getParameter(array, positionModeThird));
            break;
        case 3:
        case 4:
            break;
        case 5:
        case 6:
            result.push(getParameter(array, positionModeSecond));
            break;
        case 99:
            result = null;
            break;
        default:
            throw new Error('Unknown op code ' + opCode);
    }

    return result;
}

function getParameter(array: number[], positionMode: boolean): number {
    return positionMode ? array[opCounter++] : opCounter++;
}

function execute(array: number[], operation: number[]): void {
    let [opCode, first, second, third] = operation;
    switch (opCode) {
        case 1:
            array[third] = array[first] + array[second];
            break;
        case 2:
            array[third] = array[first] * array[second];
            break;
        case 3:
            let input =
                inputs.length == 0
                    ? parseInt(readLineSync.question('Input: '))
                    : inputs.shift();
            array[first] = input;
            break;
        case 4:
            console.log('Output:', array[first]);
            inputs = [inputs[0], array[first], ...inputs.slice(1)];
            break;
        case 5:
            if (array[first] != 0) opCounter = array[second];
            break;
        case 6:
            if (array[first] == 0) opCounter = array[second];
            break;
        case 7:
            array[third] = array[first] < array[second] ? 1 : 0;
            break;
        case 8:
            array[third] = array[first] == array[second] ? 1 : 0;
            break;
        default:
            throw new Error('Unknown op code ' + opCode);
    }
}
