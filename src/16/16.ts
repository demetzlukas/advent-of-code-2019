import { readFileFromInput } from '../utils/readFile';
import { sum } from '../utils/array';

const fileName = './input/16.txt';

export async function main() {
    let lines = await readFileFromInput(fileName);
    let inputs: number[] = lines.split('').map(Number);
    let basePattern: number[] = [0, 1, 0, -1];

    console.log(
        `Part 1: ${calculateSignal(inputs.slice(), basePattern, 100)
            .slice(0, 8)
            .join('')}`
    );
}

function calculateSignal(
    inputs: number[],
    basePattern: number[],
    upperBound: number
): number[] {
    let steps = 0;
    while (steps++ < upperBound) {
        let newInputs: number[] = [];

        inputs.forEach((number, index) => {
            let pattern: number[] = getPattern(basePattern, index);
            let numbers: number[] = [];

            inputs.forEach((number, index) =>
                numbers.push(number * pattern[index % pattern.length])
            );
            newInputs.push(Math.abs(numbers.reduce(sum)) % 10);
        });
        inputs = newInputs;
    }

    return inputs;
}

function getPattern(basePattern: number[], index: number): number[] {
    let pattern: number[] = [];
    if (index == 0) pattern = basePattern.slice();
    else {
        basePattern.forEach(p => {
            let repeat = 0;
            while (repeat++ < index + 1) {
                pattern.push(p);
            }
        });
    }

    pattern.push(pattern.shift());
    return pattern;
}
