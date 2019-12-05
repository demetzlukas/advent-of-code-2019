import { readFileFromInput } from '../utils/readFile';
import * as readLineSync from 'readline-sync';

const fileName = './input/5.txt';
let opCounter: number = 0;

export async function main() {
    let input = await readFileFromInput(fileName);
    let array: number[] = input.split(',').map(value => parseInt(value));
    opCounter = 0;

    getResult(array);
}

function getResult(array: number[]): number {
    let operation: number[] = [];

    while ((operation = getOperation(array)) !== null)
        execute(array, operation);

    return array[0];
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
            array[first] = parseInt(readLineSync.question('Input: '));
            break;
        case 4:
            console.log('Output:', array[first]);
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
