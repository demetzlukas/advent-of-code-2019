import { readFileFromInput } from '../utils/readFile';
import { IntCode } from './intCode';

const fileName = './input/7.txt';

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
            let inputs = p;
            let i = 0;
            while (i++ < 5) {
                let intCode = new IntCode(array.slice(), inputs, false);
                intCode.start();
                inputs = intCode.inputs;
            }
            return inputs.pop();
        })
        .reduce((max, value) => (value > max ? value : max));

    console.log(`Part 1: ${max}`);
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
