import { Astroid } from './astroid';

export class Laser {
    constructor(public astroids: Astroid[]) {}

    getSequenceOfDestruction(astroid: Astroid): Astroid[] {
        let astroids = this.astroids.slice();
        astroids.splice(astroids.indexOf(astroid), 1);
        let preSorted = astroids
            .map(a => {
                let angle = this.calculateAngle(astroid, a);
                let distance = this.calculateDistance(astroid, a);
                return {
                    astroid: a,
                    angle,
                    distance,
                };
            })
            .sort((a, b) => a.angle - b.angle);

        let sorted = [];

        while (preSorted.length > 0) {
            let angle = preSorted[0].angle;
            let i = 0;

            while (i < preSorted.length) {
                if (angle != preSorted[i].angle) break;
                i++;
            }

            let sameAngles = preSorted.splice(0, i);

            sameAngles = sameAngles.sort((a, b) => a.distance - b.distance);
            sorted.push(sameAngles.shift().astroid);
            if (sameAngles.length > 0) preSorted.concat(sameAngles);
        }

        return sorted;
    }

    calculateAngle(start: Astroid, end: Astroid): number {
        let [x1, y1] = [start.x, start.y];
        let [x2, y2] = [end.x, end.y];

        let theta = Math.atan2(x2 - x1, y1 - y2);
        return theta < 0 ? Math.PI + (Math.PI - Math.abs(theta)) : theta;
    }

    calculateDistance(start: Astroid, end: Astroid): number {
        let [x1, y1] = [start.x, start.y];
        let [x2, y2] = [end.x, end.y];

        return (x1 - x2) ** 2 + (y1 - y2) ** 2;
    }
}
