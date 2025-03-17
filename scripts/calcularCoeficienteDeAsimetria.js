export function asimetriaFisherPearson(dataArray, precision) {
    const n = dataArray.length;
    const mean = dataArray.reduce((sum, val) => sum + val, 0) / n;

    const std = Math.sqrt(dataArray.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n);

    const skewness = dataArray.reduce((sum, val) => sum + Math.pow((val - mean) / std, 3), 0) / n;
    return parseFloat(skewness).toFixed(precision);
}

export function asimetriaBowley(dataArray, precision) {
    const sorted = [...dataArray].sort((a, b) => a - b);
    const n = sorted.length;

    const Q1 = getPercentile(sorted, 25);
    const Q2 = getPercentile(sorted, 50);
    const Q3 = getPercentile(sorted, 75);

    const bowley = (Q3 + Q1 - 2 * Q2) / (Q3 - Q1);
    return parseFloat(bowley).toFixed(precision);
}

// Función auxiliar para percentiles (cuartiles incluidos)
function getPercentile(sortedArray, percentile) {
    const pos = percentile * (sortedArray.length + 1) / 100;

    if (Number.isInteger(pos)) {
        return sortedArray[pos - 1];
    } else {
        const lower = Math.floor(pos) - 1;
        const upper = Math.ceil(pos) - 1;
        return sortedArray[lower] + (pos - Math.floor(pos)) * (sortedArray[upper] - sortedArray[lower]);
    }
}


export function asimetriaKelly(dataArray, precision) {
    const sorted = [...dataArray].sort((a, b) => a - b);

    const P10 = getPercentile(sorted, 10);
    const P50 = getPercentile(sorted, 50);
    const P90 = getPercentile(sorted, 90);

    const kelly = (P90 + P10 - 2 * P50) / (P90 - P10);
    return Number(kelly).toFixed(precision);
}

export function asimetriaPearson(dataArray, precision) {
    const n = dataArray.length;
    const sorted = [...dataArray].sort((a, b) => a - b);

    const mean = dataArray.reduce((sum, val) => sum + val, 0) / n;
    const median = getPercentile(sorted, 50);

    const std = Math.sqrt(dataArray.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n);

    const pearson = (3 * (mean - median)) / std;
    return parseFloat(pearson).toFixed(precision);
}

export function kurtosisFisher(dataArray, precision) {
    const n = dataArray.length;
    const mean = dataArray.reduce((sum, val) => sum + val, 0) / n;

    const std = Math.sqrt(dataArray.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n);

    const kurtosis = dataArray.reduce((sum, val) => sum + Math.pow((val - mean) / std, 4), 0) / n;

    // Curtosis excesiva: se le resta 3
    const kurtosisExcess = kurtosis - 3;
    return parseFloat(kurtosisExcess).toFixed(precision);
}
