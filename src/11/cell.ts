import { Painter } from './painter';

export class Cell {
    static numberOfVisitedCells = 0;
    private _color: number;
    private painted: boolean;

    public get color(): number {
        return this._color;
    }
    public set color(color: number) {
        if (!this.painted) {
            Cell.numberOfVisitedCells++;
            this.painted = true;
        }
        this._color = color;
    }

    constructor(
        public x: number = 0,
        public y: number = 0,
        initColor: number = Painter.BLACK
    ) {
        this.painted = false;
        this._color = initColor;
    }

    getCoordinatesAsString(): string {
        return `${this.x}x${this.y}`;
    }
}
