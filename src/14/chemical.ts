export class Chemical {
    fromChemicals: [Chemical, number][];

    constructor(public name: string, public amount: number = 0) {
        this.fromChemicals = [];
    }

    addFrom(chemical: Chemical, amount: number) {
        this.fromChemicals.push([chemical, amount]);
    }

    produce(): Map<Chemical, any> {
        let map: Map<Chemical, any> = new Map<Chemical, any>();
        let obj = {};
        obj[this.name] = 1;
        map.set(this, obj);
        this.getAmountToProduce(map);

        return map;
    }
    private getAmountToProduce(map: Map<Chemical, any>) {
        let neededAmounts = map.get(this);
        let sumOfAmounts = 0;

        for (const key in neededAmounts) {
            if (neededAmounts.hasOwnProperty(key)) {
                sumOfAmounts += neededAmounts[key];
            }
        }

        this.fromChemicals.forEach(([chemical, amount]) => {
            let fraction = Math.ceil(sumOfAmounts / this.amount);
            let amounts = map.get(chemical) || {};
            amounts[this.name] = fraction * amount;
            map.set(chemical, amounts);
            chemical.getAmountToProduce(map);
        });
    }
}
