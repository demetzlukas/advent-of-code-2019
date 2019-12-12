export function deepCopy(input: any[][]): any[][] {
    return input.map(row => {
        return [...row];
    });
}
