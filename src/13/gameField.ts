export class GameField {
    static EMPTY = ' ';
    static WALL = '|';
    static BLOCK = 'X';
    static PADDLE = '-';
    static BALL = 'O';
    score: number;
    field: string[][];

    constructor() {
        this.field = [];
    }

    render(operations: number[]) {
        while (operations.length > 0) {
            let [x, y, type] = operations.splice(0, 3);

            if (x == -1 && y == 0) this.score = type;
            else this.renderCell(x, y, type);
        }
    }

    private renderCell(x: number, y: number, type: number) {
        let row = this.field[y] || [];
        row[x] = this.getType(type);
        this.field[y] = row;
    }

    paint() {
        this.cleanField();
        console.log(
            'Score',
            this.score,
            'Blocks left',
            this.getNumberOfType(GameField.BLOCK),
            'Paddle',
            this.getPositionOf(GameField.PADDLE),
            'Ball',
            this.getPositionOf(GameField.BALL)
        );
        this.field.forEach(row => console.log(row.join('')));
    }

    private cleanField() {
        for (let row = 0; row < this.field.length; row++) {
            this.field[row] =
                this.field[row] === undefined ? [] : this.field[row];
            for (let column = 0; column < this.field[row].length; column++) {
                this.field[row][column] =
                    this.field[row][column] === undefined
                        ? GameField.EMPTY
                        : this.field[row][column];
            }
        }
    }

    private getType(type: number) {
        switch (type) {
            case 0:
                return GameField.EMPTY;
            case 1:
                return GameField.WALL;
            case 2:
                return GameField.BLOCK;
            case 3:
                return GameField.PADDLE;
            case 4:
                return GameField.BALL;
            default:
                throw new Error('Unknown type ' + type);
        }
    }

    getNumberOfType(type: string) {
        return this.field
            .map(row => row.filter(cell => cell === type).length)
            .reduce((sum, value) => sum + value);
    }

    getPositionOf(type: string): number[] {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                const element = this.field[i][j];
                if (element == type) return [i, j];
            }
        }
    }
}
