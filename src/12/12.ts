import { readLinesFromInput } from '../utils/readFile';
import { Planet } from '../12/planet';
import { lcm } from '../utils/math';

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
        step(planets);
    }

    let totalEnergy = planets
        .map(planet => planet.calculateEnergy())
        .reduce((sum, value) => sum + value);

    console.log(`Part 1: ${totalEnergy}`);

    console.log(`Part 2: ${stepsToReturn(planets.slice())}`);
}

function step(planets: Planet[]) {
    planets.forEach(planet => {
        planet.calculateVelocity(planets);
    });
    planets.forEach(planet => {
        planet.updatePosition();
    });
}

function stepsToReturn(planets: Planet[]): number {
    let origins = planets.map(planet => [...planet.initPosition]);
    const motionless: number[][] = planets.map(x => [0, 0, 0]);
    const axisSteps: number[] = [0, 0, 0];

    const positions: number[][] = planets.map(planet => planet.position);
    const velocities: number[][] = planets.map(planet => planet.velocity);
    let steps: number = 0;

    while (axisSteps.indexOf(0) > -1) {
        step(planets);
        steps++;

        for (let i = 0; i < axisSteps.length; i++) {
            if (
                axisSteps[i] === 0 &&
                sameOnAxis(i, origins, positions) &&
                sameOnAxis(i, motionless, velocities)
            )
                axisSteps[i] = steps;
        }
    }
    return lcm(axisSteps);
}

function sameOnAxis(axis: number, posArr1: number[][], posArr2: number[][]) {
    for (let i = 0; i < Math.min(posArr1.length, posArr2.length); i++) {
        if (posArr1[i][axis] !== posArr2[i][axis]) return false;
    }
    return true;
}
