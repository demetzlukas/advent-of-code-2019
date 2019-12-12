export function getSumOfAbsolutes(array: number[]): number {
    return array
        .map(value => Math.abs(value))
        .reduce((sum, value) => sum + value);
}

export function lcm(nums: number[]): number {
    if (nums.length === 0) return 0;
    let rVal = nums[0];
    for (let i = 0; i < nums.length; i++) {
        rVal = (rVal * nums[i]) / gcd(rVal, nums[i]);
    }
    return rVal;
}

export function gcd(a: number, b: number): number {
    if (b == 0) return a;
    return gcd(b, a % b);
}
