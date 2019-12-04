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
    return getAdjacentBlocks(digit).filter(i => i.length > 1).length > 0;
}

function getAdjacentBlocks(digit: number): number[][] {
    let digitsAsStringArray = getNumberAsStringArray(digit);
    let adjacentBlocks: number[][] = [];
    let lastChar = digitsAsStringArray.shift();
    let currentChar: string;

    while (digitsAsStringArray.length > 0) {
        let pair = [];
        pair.push(lastChar);

        while (lastChar == (currentChar = digitsAsStringArray.shift()))
            pair.push(currentChar);

        lastChar = currentChar;
        adjacentBlocks.push(pair);
    }

    return adjacentBlocks;
}

function getNumberAsStringArray(digit: number): string[] {
    return `${digit}`.split('');
}

function isPasswordPart1(digit: number): boolean {
    return isIncreasing(digit) && containsAdjacentPairs(digit);
}

function isPasswordPart2(digit: number): boolean {
    if (!isIncreasing(digit)) return false;
    let adjacentBlocks = getAdjacentBlocks(digit);

    for (const block of adjacentBlocks) {
        if (block.length == 2) return true;
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
