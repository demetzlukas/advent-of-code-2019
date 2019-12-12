export function getSumOfAbsolutes(array: number[]): number {
    return array
        .map(value => Math.abs(value))
        .reduce((sum, value) => sum + value);
}
