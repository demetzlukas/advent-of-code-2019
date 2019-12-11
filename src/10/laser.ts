import { Astroid } from './astroid';

export class Laser {
    constructor(public astroids: Astroid[]) {}

    getSequenceOfDestruction(baseAstroid: Astroid): Astroid[] {
        let astroids = this.astroids.slice();
        astroids.splice(astroids.indexOf(baseAstroid), 1);
        let preSorted = astroids
            .map(astroid => {
                return {
                    astroid,
                    angle: this.calculateAngle(baseAstroid, astroid),
                    distance: this.calculateDistance(baseAstroid, astroid),
                };
            })
            .sort((a, b) =>
                a.angle === b.angle
                    ? a.distance - b.distance
                    : a.angle - b.angle
            );
        let maxDistance = preSorted
            .map(a => a.distance)
            .reduce((max, value) => (value > max ? value : max));

        let sorted = [];

        while (preSorted.length > 0) {
            let angle = preSorted[0].angle;
            let sameAngles = [];

            while (preSorted.length > 0) {
                if (angle !== preSorted[0].angle) break;
                sameAngles.push(preSorted.shift());
            }

            sameAngles = sameAngles.map((a, index) => {
                return { ...a, order: a.angle + index * maxDistance };
            });

            sorted = sorted.concat(sameAngles);
        }

        return sorted.sort((a, b) => a.order - b.order).map(a => a.astroid);
    }

    calculateAngle(start: Astroid, end: Astroid): number {
        let theta = Math.atan2(end.x - start.x, start.y - end.y);
        return theta < 0 ? Math.PI + (Math.PI - Math.abs(theta)) : theta;
    }

    calculateDistance(start: Astroid, end: Astroid): number {
        return (start.x - end.x) ** 2 + (start.y - end.y) ** 2;
    }
}
