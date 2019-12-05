import { readFileFromInput } from '../utils/readFile';

const fileName = './input/5.txt';
let opCounter: number;
let inputParameter: number = 1;

export async function main() {
    let input = await readFileFromInput(fileName);
    let array: number[] = input.split(',').map(value => parseInt(value));
    opCounter = 0;

    getResult(array);
}

function calculate(array: number[], noun: number, verb: number): number {
    opCounter = 0;
    return getResult(initArray(array, noun, verb));
}

function initArray(array: number[], noun: number, verb: number): number[] {
    array[1] = noun;
    array[2] = verb;

    return array;
}

function getResult(array: number[]): number {
    let operation: number[] = [];
    let counter = 0;
    while ((operation = getOperation(array)) !== null)
        execute(array, operation);

    return array[0];
}

function getOperation(array: number[]): number[] {
    let result: number[] = null;
    switch (array[opCounter]) {
        case 1:
        case 2:
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
        case 99:
            break;
        default:
            let opCodeAsString = `${array[opCounter++]}`;
            let opCode = parseInt(opCodeAsString.slice(-2));

            // change to boolean
            let modeFirst =
                opCodeAsString.slice(-3, -2) != ''
                    ? parseInt(opCodeAsString.slice(-3, -2))
                    : 0;
            let modeSecond =
                opCodeAsString.slice(-4, -3) != ''
                    ? parseInt(opCodeAsString.slice(-4, -3))
                    : 0;

            let first: number, second: number, third: number;
            switch (opCode) {
                case 1:
                case 2:
                    first =
                        modeFirst == 0
                            ? array[array[opCounter++]]
                            : array[opCounter++];
                    second =
                        modeSecond == 0
                            ? array[array[opCounter++]]
                            : array[opCounter++];
                    third = array[opCounter++];
                    break;
                case 4:
                    first =
                        modeFirst == 0
                            ? array[array[opCounter++]]
                            : array[opCounter++];
                    break;
                default:
                    throw new Error('error');
            }

            result = [opCode, first, second, third];
    }
    return result;
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
            array[first] = inputParameter;
            break;
        case 4:
            console.log('Output:', first);
            break;
        default:
            throw new Error(opCode + ' unknown operation');
    }
}
