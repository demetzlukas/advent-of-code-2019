import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/1.txt';
const { readFile } = require('fs').promises;

function fuelCalculator(mass: number): number {
    return Math.floor(mass / 3) - 2;
}

function fuelCalculatorWithFuel(mass: number): number {
    if (fuelCalculator(mass) < 0) return 0;

    let fuel = fuelCalculator(mass);
    return fuel + fuelCalculatorWithFuel(fuel);
}

export async function main() {
    let lines = await readLinesFromInput(fileName);
    let totalFuel = lines
        .map((line: string) => fuelCalculator(parseInt(line)))
        .reduce((sum: number, fuel: number) => sum + fuel);
    console.log(`Part 1: ${totalFuel}`);

    let totalFuelWithFuel = lines
        .map((line: string) => fuelCalculatorWithFuel(parseInt(line)))
        .reduce((sum: number, fuel: number) => sum + fuel);
    console.log(`Part 2: ${totalFuelWithFuel}`);
}
