import * as readLineSync from 'readline-sync';

export class IntCode {
    opCounter: number;

    constructor(
        public operations: number[],
        public inputs: number[] = [],
        public print: boolean = true
    ) {
        this.opCounter = 0;
    }

    start() {
        let operation: number[] = [];

        while ((operation = this.getNextOperation()) !== null)
            this.execute(operation);

        return this.operations[0];
    }

    private getNextOperation(): number[] {
        let result: number[] = [];
        let opCodeAsString = `${this.operations[this.opCounter++]}`;
        opCodeAsString = opCodeAsString.padStart(5, '0');
        let opCode = parseInt(opCodeAsString.slice(-2));
        let positionModeFirst = !parseInt(opCodeAsString.slice(-3, -2));
        let positionModeSecond = !parseInt(opCodeAsString.slice(-4, -3));
        let positionModeThird = !parseInt(opCodeAsString.slice(-5, -4));

        result.push(opCode);
        // we always have at least one parameter
        result.push(this.getParameterByMode(positionModeFirst));

        switch (opCode) {
            case 1:
            case 2:
            case 7:
            case 8:
                result.push(this.getParameterByMode(positionModeSecond));
                result.push(this.getParameterByMode(positionModeThird));
                break;
            case 3:
            case 4:
                break;
            case 5:
            case 6:
                result.push(this.getParameterByMode(positionModeSecond));
                break;
            case 99:
                result = null;
                break;
            default:
                throw new Error('Unknown op code ' + opCode);
        }

        return result;
    }

    private getParameterByMode(positionMode: boolean): number {
        return positionMode
            ? this.operations[this.opCounter++]
            : this.opCounter++;
    }

    private execute(operation: number[]): void {
        let [opCode, first, second, third] = operation;
        switch (opCode) {
            case 1:
                this.operations[third] =
                    this.operations[first] + this.operations[second];
                break;
            case 2:
                this.operations[third] =
                    this.operations[first] * this.operations[second];
                break;
            case 3:
                let input =
                    this.inputs.length == 0
                        ? parseInt(readLineSync.question('Input: '))
                        : this.inputs.shift();
                this.operations[first] = input;
                break;
            case 4:
                if (this.print) console.log('Output:', this.operations[first]);
                this.inputs = [
                    this.inputs[0],
                    this.operations[first],
                    ...this.inputs.slice(1),
                ];
                break;
            case 5:
                if (this.operations[first] != 0)
                    this.opCounter = this.operations[second];
                break;
            case 6:
                if (this.operations[first] == 0)
                    this.opCounter = this.operations[second];
                break;
            case 7:
                this.operations[third] =
                    this.operations[first] < this.operations[second] ? 1 : 0;
                break;
            case 8:
                this.operations[third] =
                    this.operations[first] == this.operations[second] ? 1 : 0;
                break;
            default:
                throw new Error('Unknown op code ' + opCode);
        }
    }
}
