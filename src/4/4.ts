const lowerBound = 231832;
const upperBound = 767346;

export function main() {
    let counter = 0;
    let digit: number;
    let passwordCounter = 0;

    while ((digit = lowerBound + counter) < upperBound) {
        if (isPasswordPart1(digit)) passwordCounter++;
        counter++;
    }

    console.log(`Part 1: ${passwordCounter}`);

    counter = 0;
    passwordCounter = 0;

    while ((digit = lowerBound + counter) < upperBound) {
        if (isPasswordPart2(digit)) passwordCounter++;
        counter++;
    }

    console.log(`Part 2: ${passwordCounter}`);
}

function containsAdjacentPairs(digit: number): boolean {
    return getAdjacentIdenticals(digit).filter(i => i.length > 1).length > 0;
}

function getAdjacentIdenticals(digit: number): number[][] {
    let digitsAsStringArray = getNumberAsStringArray(digit);
    let identicals = [];
    let lastCharacter = digitsAsStringArray.shift();
    let currentCharacter = '';

    while (digitsAsStringArray.length > 0) {
        let pair = [];
        pair.push(lastCharacter);
        currentCharacter = digitsAsStringArray.shift();
        while (lastCharacter == currentCharacter) {
            pair.push(currentCharacter);
            currentCharacter = digitsAsStringArray.shift();
        }
        lastCharacter = currentCharacter;
        identicals.push(pair);
    }

    return identicals;
}

function getNumberAsStringArray(digit: number): string[] {
    return `${digit}`.split('');
}

function isPasswordPart1(digit: number): boolean {
    return isIncreasing(digit) && containsAdjacentPairs(digit);
}

function isPasswordPart2(digit: number): boolean {
    if (!isIncreasing(digit)) return false;
    let identicals = getAdjacentIdenticals(digit);

    if (identicals.length == 0) return false;

    for (const identical of identicals) {
        if (identical.length == 2) return true;
    }

    return false;
}

function isIncreasing(digit: number): boolean {
    let digitsAsStringArray = getNumberAsStringArray(digit);
    for (let i = 1; i < digitsAsStringArray.length; i++) {
        if (digitsAsStringArray[i - 1] > digitsAsStringArray[i]) return false;
    }

    return true;
}
