export function deepCopy(input: any[][]): any[][] {
    return input.map(row => {
        return [...row];
    });
}

export function sum(sum: number, value: number): number {
    return sum + value;
}
