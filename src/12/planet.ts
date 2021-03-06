import { getSumOfAbsolutes } from '../utils/math';

export class Planet {
    velocity: number[];
    initPosition: number[];
    initVelocity: number[];

    constructor(public position: number[] = [0, 0, 0]) {
        this.velocity = [0, 0, 0];
        this.initPosition = this.position.slice();
        this.initVelocity = this.velocity.slice();
    }

    calculateVelocity(planets: Planet[]) {
        let [px1, py1, pz1] = this.position;
        let [vx1, vy1, vz1] = this.velocity;

        planets.forEach(planet => {
            let [px2, py2, pz2] = planet.position;
            vx1 = this.getVelocity(px1, px2, vx1);
            vy1 = this.getVelocity(py1, py2, vy1);
            vz1 = this.getVelocity(pz1, pz2, vz1);

            this.velocity[0] = vx1;
            this.velocity[1] = vy1;
            this.velocity[2] = vz1;
        });
    }

    private getVelocity(x1: number, x2: number, velocity): number {
        if (x2 == x1) return velocity;
        if (x2 > x1) return velocity + 1;
        else return velocity - 1;
    }

    updatePosition() {
        for (let i = 0; i < this.position.length; i++) {
            this.position[i] += this.velocity[i];
        }
    }

    calculateEnergy(): number {
        return (
            getSumOfAbsolutes(this.position) * getSumOfAbsolutes(this.velocity)
        );
    }
}
