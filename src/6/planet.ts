export class Planet {
    static planets: Map<string, Planet> = new Map();
    orbitingPlanet: Planet;

    constructor(public name: string) {}

    calculateCenterPlanets(): number {
        return this.getAllCenters().length;
    }

    getAllCenters(): Planet[] {
        let orbitingPlanets: Planet[] = [];
        let tmpPlanet: Planet = this;

        while ((tmpPlanet = tmpPlanet.orbitingPlanet) != undefined)
            orbitingPlanets.push(tmpPlanet);

        return orbitingPlanets;
    }

    stepsTo(to: Planet): number {
        let fromCenters = this.getAllCenters();
        let toCenters = to.getAllCenters();

        for (const planet of fromCenters) {
            if (toCenters.includes(planet))
                return fromCenters.indexOf(planet) + toCenters.indexOf(planet);
        }

        return -1;
    }
}
