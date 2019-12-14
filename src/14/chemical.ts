import { sum } from '../utils/array';

export class Chemical {
    fromChemicals: [Chemical, number][];

    constructor(public name: string, public amount: number = 0) {
        this.fromChemicals = [];
    }

    addFrom(chemical: Chemical, amount: number) {
        this.fromChemicals.push([chemical, amount]);
    }

    produce(amount: number = 1): Map<Chemical, any> {
        let map: Map<Chemical, any> = new Map<Chemical, any>();
        let obj = {};
        obj[this.name] = amount;
        map.set(this, obj);
        this.getAmountToProduce(map);

        return map;
    }

    private getAmountToProduce(map: Map<Chemical, any>) {
        let neededAmounts = map.get(this);
        let sumOfAmounts = Object.keys(neededAmounts)
            .map(chemical => neededAmounts[chemical])
            .reduce(sum);

        this.fromChemicals.forEach(([chemical, amount]) => {
            let fraction = Math.ceil(sumOfAmounts / this.amount);
            let amounts = map.get(chemical) || {};
            amounts[this.name] = fraction * amount;
            map.set(chemical, amounts);
            chemical.getAmountToProduce(map);
        });
    }
}
