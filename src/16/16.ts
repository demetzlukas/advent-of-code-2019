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
    let newInputs: number[] = [];
    let pattern: number[] = [];
    let numbers: number[] = [];
    while (steps++ < upperBound) {
        newInputs = [];
        pattern = basePattern.slice();

        inputs.forEach((number, index) => {
            if (index > 0) {
                pattern = [];

                basePattern.forEach(p => {
                    let repeat = 0;
                    while (repeat++ < index + 1) {
                        pattern.push(p);
                    }
                });
            }

            numbers = [];
            pattern.push(pattern.shift());
            inputs.forEach((number, index) =>
                numbers.push(number * pattern[index % pattern.length])
            );
            newInputs.push(Math.abs(numbers.reduce(sum)) % 10);
        });
        inputs = [...newInputs];
    }

    return newInputs;
}
