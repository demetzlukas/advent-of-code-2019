export class Astroid {
    static astroids: Astroid[] = [];
    seeingAstroids: Astroid[];
    constructor(public x: number, public y: number) {
        this.seeingAstroids = [];
    }

    calculateSeeingAstroids(): number {
        if (this.seeingAstroids.length > 0) return this.seeingAstroids.length;
        let astroidsWithoutThis = Astroid.astroids.slice();
        astroidsWithoutThis.splice(astroidsWithoutThis.indexOf(this), 1);

        for (const a of astroidsWithoutThis) {
            let tempAstroids = astroidsWithoutThis.slice();
            tempAstroids.splice(tempAstroids.indexOf(a), 1);

            let i: number;
            for (i = 0; i < tempAstroids.length; i++) {
                if (
                    this.onSameLine(this, tempAstroids[i], a) &&
                    this.between(this, tempAstroids[i], a)
                ) {
                    break;
                }
            }
            if (i === tempAstroids.length) {
                this.seeingAstroids.push(a);
            }
        }

        return this.seeingAstroids.length;
    }

    private onSameLine(
        start: Astroid,
        between: Astroid,
        end: Astroid
    ): boolean {
        let [x1, y1] = [start.x, start.y];
        let [x2, y2] = [between.x, between.y];
        let [x3, y3] = [end.x, end.y];

        return (y3 - y2) / (x3 - x2) == (y2 - y1) / (x2 - x1);
    }

    private between(start: Astroid, between: Astroid, end: Astroid): boolean {
        let [x1, y1] = [start.x, start.y];
        let [x2, y2] = [between.x, between.y];
        let [x3, y3] = [end.x, end.y];
        return (
            (x1 <= x2 && x2 <= x3 && y1 <= y2 && y2 <= y3) ||
            (x3 <= x2 && x2 <= x1 && y3 <= y2 && y2 <= y1) ||
            (x1 <= x2 && x2 <= x3 && y3 <= y2 && y2 <= y1) ||
            (x3 <= x2 && x2 <= x1 && y1 <= y2 && y2 <= y3)
        );
    }

    calculateAngle(other: Astroid): number {
        let theta = Math.atan2(this.x - other.x, other.y - this.y);
        return theta < 0 ? Math.PI + (Math.PI - Math.abs(theta)) : theta;
    }

    calculateDistance(other: Astroid): number {
        return (other.x - this.x) ** 2 + (other.y - this.y) ** 2;
    }

    getAngleAndDistance(other: Astroid) {
        return {
            astroid: this,
            angle: this.calculateAngle(other),
            distance: this.calculateDistance(other),
        };
    }
}
