export class Planet {
    static planets: Map<string, Planet> = new Map();
    centerPlanet: Planet;

    constructor(public name: string) {}

    calculateCenterPlanets(): number {
        return this.getAllCenters().length;
    }

    getAllCenters(): Planet[] {
        let centerPlanets: Planet[] = [];
        let tmpPlanet: Planet = this;

        while ((tmpPlanet = tmpPlanet.centerPlanet) != undefined)
            centerPlanets.push(tmpPlanet);

        return centerPlanets;
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

    static getPlanet(name: string): Planet {
        let planet = this.planets.get(name);

        if (planet == undefined) {
            planet = new Planet(name);
            this.planets.set(name, planet);
        }

        return planet;
    }
}
