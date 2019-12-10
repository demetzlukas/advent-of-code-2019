import * as readLineSync from 'readline-sync';

export class IntCode {
    private operationCounter: number;
    done: boolean;
    output: number;
    relativeBase: number;

    constructor(
        public operations: number[],
        public inputs: number[] = [],
        public print: boolean = true,
        public stopAndWait: boolean = false
    ) {
        this.operationCounter = 0;
        this.done = false;
        this.output = 0;
        this.relativeBase = 0;
    }

    start() {
        let operation: number[];

        while ((operation = this.getNextOperation()) !== null)
            this.execute(operation);

        return this.operations[0];
    }

    private getNextOperation(): number[] {
        let result: number[] = [];
        let opCodeAsString = `${this.operations[this.operationCounter++]}`;
        opCodeAsString = opCodeAsString.padStart(5, '0');
        let code = parseInt(opCodeAsString.slice(-2));
        let positionModeFirst = parseInt(opCodeAsString.slice(-3, -2));
        let positionModeSecond = parseInt(opCodeAsString.slice(-4, -3));
        let positionModeThird = parseInt(opCodeAsString.slice(-5, -4));

        result.push(code);

        switch (code) {
            case 1:
            case 2:
            case 7:
            case 8:
                result.push(this.getParameterByMode(positionModeFirst));
                result.push(this.getParameterByMode(positionModeSecond));
                result.push(this.getParameterByMode(positionModeThird));
                break;
            case 3:
                if (this.inputs.length == 0 && this.stopAndWait) {
                    this.operationCounter -= 1;
                    result = null;
                    break;
                }
            case 4:
            case 9:
                result.push(this.getParameterByMode(positionModeFirst));
                break;
            case 5:
            case 6:
                result.push(this.getParameterByMode(positionModeFirst));
                result.push(this.getParameterByMode(positionModeSecond));
                break;
            case 99:
                result = null;
                this.done = true;
                break;
            default:
                throw new Error('Unknown op code ' + code);
        }

        return result;
    }

    private getParameterByMode(positionMode: number): number {
        switch (positionMode) {
            case 0:
                return this.operations[this.operationCounter++];
            case 1:
                return this.operationCounter++;
            case 2:
                return (
                    this.relativeBase + this.operations[this.operationCounter++]
                );
            default:
                throw new Error('Unknown position mode ' + positionMode);
        }
    }

    private execute(operation: number[]): void {
        let [code, first, second, third] = operation;
        if (first != undefined && first >= this.operations.length)
            this.operations[first] = 0;
        if (!second != undefined && second >= this.operations.length)
            this.operations[second] = 0;
        if (!third != undefined && third >= this.operations.length)
            this.operations[third] = 0;

        switch (code) {
            case 1:
                this.operations[third] =
                    this.operations[first] + this.operations[second];
                break;
            case 2:
                this.operations[third] =
                    this.operations[first] * this.operations[second];
                break;
            case 3:
                this.operations[first] =
                    this.inputs.length == 0
                        ? parseInt(readLineSync.question('Input: '))
                        : this.inputs.shift();
                break;
            case 4:
                this.output = this.operations[first];
                if (this.print) console.log('Output:', this.output);
                break;
            case 5:
                if (this.operations[first] != 0)
                    this.operationCounter = this.operations[second];
                break;
            case 6:
                if (this.operations[first] == 0)
                    this.operationCounter = this.operations[second];
                break;
            case 7:
                this.operations[third] =
                    this.operations[first] < this.operations[second] ? 1 : 0;
                break;
            case 8:
                this.operations[third] =
                    this.operations[first] == this.operations[second] ? 1 : 0;
                break;
            case 9:
                this.relativeBase += this.operations[first];
                break;
            default:
                throw new Error('Unknown op code ' + code);
        }
    }
}
