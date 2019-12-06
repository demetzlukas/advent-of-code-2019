import { readLinesFromInput } from '../utils/readFile';
import { Planet } from './planet';

const fileName = './input/6.txt';
const splitCharacter = ')';

function getPlanet(name: string): Planet {
    let planet = Planet.planets.get(name);

    if (planet == undefined) {
        planet = new Planet(name);
        Planet.planets.set(name, planet);
    }

    return planet;
}

export async function main() {
    let orbits = await readLinesFromInput(fileName);

    orbits.forEach(orbit => {
        let [center, orbiting] = orbit.split(splitCharacter);
        let centerPlanet: Planet = getPlanet(center);
        let orbitingPlanet: Planet = getPlanet(orbiting);

        orbitingPlanet.orbitingPlanet = centerPlanet;
    });

    let sum = [...Planet.planets.values()]
        .map(planet => planet.calculateCenterPlanets())
        .reduce((sum, planet) => sum + planet);

    console.log(`Part 1: ${sum}`);

    console.log(
        `Part 2: ${Planet.planets
            .get('YOU')
            .stepsTo(Planet.planets.get('SAN'))}`
    );
}
