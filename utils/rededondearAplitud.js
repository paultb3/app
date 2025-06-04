export function roundingUp(number, nDecimals) {
    const factor = Math.pow(10, nDecimals);
    return Math.ceil(number * factor) / factor;
}
