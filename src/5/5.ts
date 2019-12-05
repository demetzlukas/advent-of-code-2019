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
    let result: number[] = null;
    switch (array[opCounter]) {
        case 1:
        case 2:
        case 7:
        case 8:
            result = [
                array[opCounter++],
                array[array[opCounter++]],
                array[array[opCounter++]],
                array[opCounter++],
            ];
            break;
        case 3:
            result = [array[opCounter++], array[opCounter++]];
            break;
        case 4:
            result = [array[opCounter++], array[array[opCounter++]]];
            break;
        case 5:
        case 6:
            result = [
                array[opCounter++],
                array[array[opCounter++]],
                array[array[opCounter++]],
            ];
            break;
        case 99:
            break;
        default:
            let opCodeAsString = `${array[opCounter++]}`.padStart(5, '0');
            let opCode = parseInt(opCodeAsString.slice(-2));
            let positionModeFirst = !parseInt(opCodeAsString.slice(-3, -2));
            let positionModeSecond = !parseInt(opCodeAsString.slice(-4, -3));
            let positionModeThird = !parseInt(opCodeAsString.slice(-5, -4));
            let first: number, second: number, third: number;

            switch (opCode) {
                case 1:
                case 2:
                case 7:
                case 8:
                    first = getParameter(array, positionModeFirst);
                    second = getParameter(array, positionModeSecond);
                    third = positionModeThird
                        ? array[opCounter++]
                        : opCounter++;
                    break;
                case 4:
                    first = getParameter(array, positionModeFirst);
                    break;
                case 5:
                case 6:
                    first = getParameter(array, positionModeFirst);
                    second = getParameter(array, positionModeSecond);
                    break;
                default:
                    throw new Error('Unknown op code ' + opCode);
            }

            result = [opCode, first, second, third];
    }
    return result;
}

function getParameter(array: number[], positionMode: boolean): number {
    return positionMode ? array[array[opCounter++]] : array[opCounter++];
}

function execute(array: number[], operation: number[]): void {
    let [opCode, first, second, third] = operation;
    switch (opCode) {
        case undefined:
            break;
        case 1:
            array[third] = first + second;
            break;
        case 2:
            array[third] = first * second;
            break;
        case 3:
            array[first] = parseInt(readLineSync.question('Input: '));
            break;
        case 4:
            console.log('Output:', first);
            break;
        case 5:
            if (first != 0) opCounter = second;
            break;
        case 6:
            if (first == 0) opCounter = second;
            break;
        case 7:
            array[third] = first < second ? 1 : 0;
            break;
        case 8:
            array[third] = first == second ? 1 : 0;
            break;
        default:
            throw new Error(opCode + ' unknown operation');
    }
}
