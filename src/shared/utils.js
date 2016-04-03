export function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}
