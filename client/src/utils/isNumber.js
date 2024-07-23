export function isNumber(value) {
    const num = Number(value);
    return !isNaN(num) && isFinite(num);
}