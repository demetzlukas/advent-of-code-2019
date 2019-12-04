import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/1.txt';

function calculate(mass: number): number {
    return Math.floor(mass / 3) - 2;
}

function calculateWithFuelMass(mass: number): number {
    if (calculate(mass) < 0) return 0;

    let fuel = calculate(mass);
    return fuel + calculateWithFuelMass(fuel);
}

function calculateFuel(masses: string[], recursive: boolean): number {
    let calculation = recursive ? calculateWithFuelMass : calculate;

    return masses
        .map((mass: string) => calculation(parseInt(mass)))
        .reduce((sum: number, fuel: number) => sum + fuel);
}

export async function main() {
    let masses = await readLinesFromInput(fileName);

    console.log(`Part 1: ${calculateFuel(masses, false)}`);
    console.log(calculateFuel(masses, true));
}
