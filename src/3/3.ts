import { readFileFromInput, readLinesFromInput } from '../utils/readFile';

const fileName = './input/3.txt';

class Wire {
    coordinates: number[][];

    constructor() {
        this.coordinates = [];
        this.coordinates.push([1, 1]);
    }

    move(steps: string) {
        steps
            .split(',')
            .map((step: string) => step.match(/([LRUD])(\d+)/))
            .forEach(([_, direction, step]) =>
                this.moveStep(direction, parseInt(step))
            );
    }

    private moveStep(direction: string, steps: number) {
        let [x, y] = this.coordinates[this.coordinates.length - 1];

        switch (direction) {
            case 'R':
                for (let i = 1; i < steps + 1; i++)
                    this.coordinates.push([x, y + i]);
                break;
            case 'L':
                for (let i = 1; i < steps + 1; i++)
                    this.coordinates.push([x, y - i]);
                break;
            case 'U':
                for (let i = 1; i < steps + 1; i++)
                    this.coordinates.push([x + i, y]);
                break;
            case 'D':
                for (let i = 1; i < steps + 1; i++)
                    this.coordinates.push([x - i, y]);
                break;
            default:
                throw new Error('Wrong direction');
        }
    }

    calculateIntersects(otherWire: Wire): number[][] {
        let intersects: number[][] = [];

        this.coordinates.forEach(([firstX, firstY]) => {
            otherWire.coordinates.forEach(([secondX, secondY]) => {
                if (firstX == secondX && firstY == secondY)
                    intersects.push([firstX, firstY]);
            });
        });

        return intersects.slice(1);
    }

    stepsUntil(point: number[]): number {
        let [pX, pY] = point;
        let counter = 0;

        for (const [x, y] of this.coordinates) {
            if (x === pX && y === pY) return counter;
            counter++;
        }

        return -1;
    }
}

export async function main() {
    let [x1, x2] = await readLinesFromInput(fileName);

    let wire1 = new Wire();
    let wire2 = new Wire();

    wire1.move(x1);
    wire2.move(x2);

    let intersects = wire1.calculateIntersects(wire2);
    let closesPoint = calculateManhattenDistances(
        [1, 1],
        intersects
    ).reduce((min, value) => (value.distance < min.distance ? value : min));

    console.log(`Part 1: ${closesPoint.distance}`);
    // 5319

    let minimumSteps = intersects
        .map(
            intersect =>
                wire1.stepsUntil(intersect) + wire2.stepsUntil(intersect)
        )
        .reduce((min, value) => Math.min(min, value));

    console.log(`Part2: ${minimumSteps}`);
}

function calculateManhattenDistances(origin: number[], points: number[][]) {
    let [originX, originY] = origin;

    return points.map(([x, y]) => {
        return {
            point: [x, y],
            distance: Math.abs(originX - x) + Math.abs(originY - y),
        };
    });
}
