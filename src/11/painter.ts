import { Cell } from './cell';
import { IntCode } from '../11/intCode';

export class Painter {
    static TURN_LEFT = 0;
    static TURN_RIGHT = 1;
    static UP = -1;
    static DOWN = 1;
    static LEFT = -2;
    static RIGHT = 2;
    static BLACK = 0;
    static WHITE = 1;
    direction: number;
    start: Cell;
    intCode: IntCode;
    cells: Map<string, Cell>;

    constructor(operations: number[], initColor = Painter.BLACK) {
        this.intCode = new IntCode(operations, [], false, true);
        this.start = new Cell(0, 0, initColor);
        this.direction = Painter.UP;
        this.cells = new Map<string, Cell>();
        this.cells.set(this.start.getCoordinatesAsString(), this.start);
    }

    render() {
        let tmpCell = this.start;
        while (!this.intCode.done) {
            let color = tmpCell.color;
            this.intCode.inputs = [color];
            this.intCode.start();
            tmpCell.color = this.intCode.output.shift();
            let direction = this.intCode.output.shift();

            tmpCell = this.getNextCell(tmpCell, direction);
        }
    }
    private getNextCell(cell: Cell, direction: number): Cell {
        let x = cell.x;
        let y = cell.y;
        switch (this.direction) {
            case Painter.UP:
                if (direction == Painter.TURN_LEFT) {
                    y--;
                    this.direction = Painter.LEFT;
                } else {
                    y++;
                    this.direction = Painter.RIGHT;
                }
                break;
            case Painter.DOWN:
                if (direction == Painter.TURN_LEFT) {
                    y++;
                    this.direction = Painter.RIGHT;
                } else {
                    y--;
                    this.direction = Painter.LEFT;
                }
                break;
            case Painter.LEFT:
                if (direction == Painter.TURN_LEFT) {
                    x++;
                    this.direction = Painter.DOWN;
                } else {
                    x--;
                    this.direction = Painter.UP;
                }
                break;
            case Painter.RIGHT:
                if (direction == Painter.TURN_LEFT) {
                    x--;
                    this.direction = Painter.UP;
                } else {
                    x++;
                    this.direction = Painter.DOWN;
                }
                break;
            default:
                throw new Error('Unknown direction ' + direction);
        }

        let coordinatesAsString = `${x}x${y}`;
        if (this.cells.get(coordinatesAsString) === undefined)
            this.cells.set(coordinatesAsString, new Cell(x, y));

        return this.cells.get(coordinatesAsString);
    }

    paint() {
        let rowOffset = [...this.cells.keys()]
            .map(cell => cell.match(/(\d+)x(\d+)/)[1])
            .map(cell => parseInt(cell))
            .reduce((min, value) => (value < min ? value : min));
        let columnOffset = [...this.cells.keys()]
            .map(cell => cell.match(/(\d+)x(\d+)/)[2])
            .map(cell => parseInt(cell))
            .reduce((min, value) => (value < min ? value : min));

        let pixels: number[][] = [];
        [...this.cells.values()].forEach(cell => {
            if (pixels[cell.x + rowOffset] == undefined)
                pixels[cell.x + rowOffset] = [];
            pixels[cell.x + rowOffset][cell.y + columnOffset] = cell.color;
        });

        for (let row = 0; row < pixels.length; row++) {
            for (let column = 0; column < pixels[row].length; column++) {
                pixels[row][column] =
                    pixels[row][column] === undefined ? 0 : pixels[row][column];
            }
        }
        pixels
            .map(row => row.map(cell => (cell == 0 ? ' ' : '+')).join(''))
            .forEach(row => console.log(row));
    }
}
