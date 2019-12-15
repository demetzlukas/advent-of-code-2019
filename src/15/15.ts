import { readFileFromInput } from '../utils/readFile';
import { IntCode } from '../11/intCode';
import { Cell } from './cell';

const fileName = './input/15.txt';
const directions: number[] = [1, 2, 4, 3];
let intCode: IntCode;
let paths: number[] = [];
let visitedCells: Map<string, Cell> = new Map<string, Cell>();
visitedCells.set('0x0', new Cell('0x0'));

export async function main() {
    let lines = await readFileFromInput(fileName);
    let operations: number[] = lines.split(',').map(Number);

    intCode = new IntCode(operations.slice(), [], false, true);

    step(1, visitedCells.get('0x0'));
    console.log('paths', paths);
}

function step(steps: number, cell: Cell) {
    for (const direction of directions) {
        if (cell.directions.includes(direction)) continue;

        cell.directions.push(direction);

        let nextCellId = getNextCell(cell.id, direction);

        let output = move(direction);
        let oppositeDirection = getOppositeDirection(direction);

        if (output === 0) continue;

        if (output === 2) {
            move(oppositeDirection);
            paths.push(steps);
            return;
        }

        let nextCell = visitedCells.get(nextCellId) || {
            id: nextCellId,
            value: -1,
            directions: [],
        };
        nextCell.value = 1;
        nextCell.directions.push(oppositeDirection);

        visitedCells.set(nextCellId, nextCell);

        step(steps + 1, nextCell);

        move(oppositeDirection);
        visitedCells.delete(nextCellId);
    }
}

function move(direction: number): number {
    intCode.inputs.push(direction);
    intCode.start();
    return intCode.output.pop();
}

function getOppositeDirection(direction: number): number {
    switch (direction) {
        case 1:
            return 2;
        case 2:
            return 1;
        case 3:
            return 4;
        case 4:
            return 3;
        default:
            throw new Error('Unknown direction ' + direction);
    }
}

function getNextCell(lastCell: string, direction: number): string {
    let [lastX, lastY] = lastCell.split('x');
    let x: number = parseInt(lastX);
    let y: number = parseInt(lastY);
    switch (direction) {
        case 1:
            x--;
            break;
        case 2:
            x++;
            break;
        case 3:
            y--;
            break;
        case 4:
            y++;
            break;
        default:
            throw new Error('Unknown direction ' + direction);
    }
    return `${x}x${y}`;
}
