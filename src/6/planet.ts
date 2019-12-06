export class Planet {
    static planets: Map<string, Planet> = new Map();
    orbitingPlanet: Planet;

    constructor(public name: string) {}

    calculateOrbitingPlanets(): number {
        let orbitingPlanets = 0;
        let tmpPlanet: Planet = this;

        while ((tmpPlanet = tmpPlanet.orbitingPlanet) != undefined)
            orbitingPlanets++;

        return orbitingPlanets;
    }
}
