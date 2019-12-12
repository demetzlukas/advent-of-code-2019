import { readLinesFromInput } from '../utils/readFile';
import { Planet } from '../12/planet';

const fileName = './input/12.txt';
const regex = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/;

export async function main() {
    let lines = await readLinesFromInput(fileName);
    let planets = lines.map(line => {
        const [_, x, y, z] = line.match(regex);
        return new Planet([parseInt(x), parseInt(y), parseInt(z)]);
    });

    let steps = 0;
    while (steps++ < 1000) {
        planets.forEach(planet => {
            planet.calculateVelocity(planets.slice());
        });
        planets.forEach(planet => {
            planet.updatePosition();
        });
    }
    let totalEnergy = planets
        .map(planet => planet.calculateEnergy())
        .reduce((sum, value) => sum + value);

    console.log(`Part 1: ${totalEnergy}`);
}
