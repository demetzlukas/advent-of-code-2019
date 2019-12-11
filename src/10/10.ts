import { readLinesFromInput } from '../utils/readFile';
import { Astroid } from './astroid';
import { Laser } from './laser';
const fileName = './input/10.txt';

export async function main() {
    let lines = await readLinesFromInput(fileName);
    lines.forEach((line, row) =>
        line.split('').forEach((cell, column) => {
            if (cell === '#') Astroid.astroids.push(new Astroid(column, row));
        })
    );
    let max = Astroid.astroids.reduce((max, value) =>
        value.calculateSeeingAstroids() > max.calculateSeeingAstroids()
            ? value
            : max
    );
    console.log(
        `Part 1: ${max.x}, ${
            max.y
        } sees ${max.calculateSeeingAstroids()} astroids.`
    );

    let laser = new Laser(Astroid.astroids);
    let destroyedPlanet = laser.getSequenceOfDestruction(max)[199];
    console.log(`Part 2: ${destroyedPlanet.x * 100 + destroyedPlanet.y}`);
}
