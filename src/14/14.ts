import { readLinesFromInput } from '../utils/readFile';
import { Chemical } from './chemical';

const fileName = './input/14.txt';
const regex = /(\d+) ([A-Z]+)/;

export async function main() {
    let lines = await readLinesFromInput(fileName);
    let chemicals = new Map<string, Chemical>();

    lines.forEach(line => {
        let [from, to] = line.split(' => ');
        let [toAmount, toName] = to.match(regex).slice(1);

        let toChecmical = chemicals.get(toName);
        if (toChecmical === undefined) {
            toChecmical = new Chemical(toName, parseInt(toAmount));
            chemicals.set(toName, toChecmical);
        }
        toChecmical.amount = parseInt(toAmount);

        from.split(', ').forEach(chemical => {
            let [amount, name] = chemical.match(regex).slice(1);
            let tmp = chemicals.get(name);
            if (tmp === undefined) {
                tmp = new Chemical(name);
                chemicals.set(name, tmp);
            }
            toChecmical.addFrom(tmp, parseInt(amount));
        });
    });

    let amountsForORE = chemicals
        .get('FUEL')
        .produce()
        .get(chemicals.get('ORE'));
    let sum = 0;

    for (const chem in amountsForORE) {
        if (amountsForORE.hasOwnProperty(chem)) {
            const amount = amountsForORE[chem];
            sum += amount;
        }
    }
    console.log(sum);
}
