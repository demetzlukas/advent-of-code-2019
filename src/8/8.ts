import { readFileFromInput } from '../utils/readFile';
import { Image } from './image';
const fileName = './input/8.txt';

export async function main() {
    let input = await readFileFromInput(fileName);

    let image = new Image(25, 6);
    let layers = image.parseFromString(input);

    let zeroesInLayers = layers.map(layer =>
        layer
            .map(pixel => (pixel.match(/0/g) || []).length)
            .reduce((sum, value) => sum + value)
    );

    let indexLeastMostZeroes = zeroesInLayers
        .map((layer, index) => {
            return { layer, index };
        })
        .reduce((min, value) => (value.layer < min.layer ? value : min));

    let numberOfOnes = layers[indexLeastMostZeroes.index]
        .map(pixel => (pixel.match(/1/g) || []).length)
        .reduce((sum, value) => sum + value);
    let numberOfTwos = layers[indexLeastMostZeroes.index]
        .map(pixel => (pixel.match(/2/g) || []).length)
        .reduce((sum, value) => sum + value);

    console.log(`Part 1: ${numberOfOnes * numberOfTwos}`);
}
