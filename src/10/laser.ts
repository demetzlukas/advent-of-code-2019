import { Astroid } from './astroid';

export class Laser {
    constructor(public astroids: Astroid[]) {}

    getSequenceOfDestruction(astroid: Astroid): Astroid[] {
        let astroids = this.astroids.slice();
        astroids.splice(astroids.indexOf(astroid), 1);
        let preSorted = astroids
            .map(a => {
                return {
                    astroid: a,
                    angle: this.calculateAngle(astroid, a),
                    distance: this.calculateDistance(astroid, a),
                };
            })
            .sort((a, b) => a.angle - b.angle);
        let maxDistance = preSorted
            .map(a => a.distance)
            .reduce((max, value) => (value > max ? value : max));

        let sorted = [];

        while (preSorted.length > 0) {
            let angle = preSorted[0].angle;
            let i = 0;

            while (i < preSorted.length) {
                if (angle != preSorted[i].angle) break;
                i++;
            }

            let sameAngles = preSorted.splice(0, i);
            sameAngles = sameAngles
                .sort((a, b) => a.distance - b.distance)
                .map((a, index) => {
                    return { ...a, order: a.angle + index * maxDistance };
                });

            sorted = sorted.concat(sameAngles);
        }

        return sorted.sort((a, b) => a.order - b.order).map(a => a.astroid);
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
