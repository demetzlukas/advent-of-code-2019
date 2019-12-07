import * as readLineSync from 'readline-sync';

export class IntCode {
    operationCounter: number;
    done: boolean;
    output: number;

    constructor(
        public operations: number[],
        public inputs: number[] = [],
        public print: boolean = true,
        public stopAndWait: boolean = false
    ) {
        this.operationCounter = 0;
        this.done = false;
        this.output = 0;
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
        let positionModeFirst = !parseInt(opCodeAsString.slice(-3, -2));
        let positionModeSecond = !parseInt(opCodeAsString.slice(-4, -3));
        let positionModeThird = !parseInt(opCodeAsString.slice(-5, -4));

        result.push(code);
        // we always have at least one parameter
        result.push(this.getParameterByMode(positionModeFirst));

        switch (code) {
            case 1:
            case 2:
            case 7:
            case 8:
                result.push(this.getParameterByMode(positionModeSecond));
                result.push(this.getParameterByMode(positionModeThird));
                break;
            case 3:
                if (this.inputs.length == 0 && this.stopAndWait) {
                    this.operationCounter -= 2;
                    return null;
                }
            case 4:
                break;
            case 5:
            case 6:
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

    private getParameterByMode(positionMode: boolean): number {
        return positionMode
            ? this.operations[this.operationCounter++]
            : this.operationCounter++;
    }

    private execute(operation: number[]): void {
        let [code, first, second, third] = operation;
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
                let input =
                    this.inputs.length == 0
                        ? parseInt(readLineSync.question('Input: '))
                        : this.inputs.shift();
                this.operations[first] = input;
                break;
            case 4:
                if (this.print) console.log('Output:', this.operations[first]);
                // this.inputs = [
                //     this.inputs[0],
                //     this.operations[first],
                //     ...this.inputs.slice(1),
                // ];
                this.output = this.operations[first];
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
            default:
                throw new Error('Unknown op code ' + code);
        }
    }
}
