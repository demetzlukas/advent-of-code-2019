import { Astroid } from './astroid';
import { groupBy } from '../utils/groupBy';

export class Laser {
    constructor(public astroids: Astroid[]) {}

    getSequenceOfDestruction(baseAstroid: Astroid): Astroid[] {
        let astroids = this.astroids.slice();
        astroids.splice(astroids.indexOf(baseAstroid), 1);

        let preSorted = astroids.map(astroid =>
            astroid.getAngleAndDistance(baseAstroid)
        );
        let maxDistance = preSorted
            .map(a => a.distance)
            .reduce((max, value) => (value > max ? value : max));

        let astroidsByAngle = [...groupBy(preSorted, a => a.angle).values()];
        return astroidsByAngle
            .map(group =>
                group
                    .sort((a, b) => a.distance - b.distance)
                    .map((a, index) => {
                        return {
                            ...a,
                            order: a.angle + index * maxDistance,
                        };
                    })
            )
            .reduce((all, group) => all.concat(group))
            .sort((a, b) => a.order - b.order)
            .map(a => a.astroid);
    }
}
