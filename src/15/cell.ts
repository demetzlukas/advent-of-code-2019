export class Cell {
    value: number;
    directions: number[];
    constructor(public id: string) {
        this.value = -1;
        this.directions = [];
    }
}
