import { readFileFromInput } from '../utils/readFile';

const fileName = './input/2.txt';
let opCounter: number;

export async function main() {
    let input = await readFileFromInput(fileName);
    let array: number[] = input.split(',').map(value => parseInt(value));
    console.log(`Part 1: ${calculate(array.slice(), 16, 9)}`);

    let noun = 0;
    while (noun < 100) {
        let verb = 0;
        while (verb < 100) {
            if (calculate(array.slice(), noun, verb) == 19690720) {
                console.log(
                    `Part 2: noun = ${noun}, verb = ${verb}, 100 * noun + verb = ${100 *
                        noun +
                        verb}`
                );
                break;
            }
            verb++;
        }
        noun++;
    }
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
    while ((operation = getOperation(array)) !== null)
        execute(array, operation);

    return array[0];
}

function getOperation(array: number[]): number[] {
    const steps = 4;
    switch (array[opCounter]) {
        case 1:
        case 2:
            let slice = array.slice(opCounter, opCounter + steps);
            opCounter += steps;
            return slice;
        case 99:
            return null;
        default:
            throw new Error('unknown operation');
    }
}

function execute(array: number[], operation: number[]): void {
    let [opCode, first, second, result] = operation;
    switch (opCode) {
        case undefined:
            break;
        case 1:
            array[result] = array[first] + array[second];
            break;
        case 2:
            array[result] = array[first] * array[second];
            break;
        default:
            throw new Error('unknown operation');
    }
}
