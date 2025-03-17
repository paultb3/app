export function asimetriaFisherPearsonAgrupada(dataArray, precision) {
    const totalFreq = dataArray.reduce((sum, item) => sum + item.frequency, 0);
    const mean = dataArray.reduce((sum, item) => sum + parseFloat(item.xi) * item.frequency, 0) / totalFreq;

    const variance = dataArray.reduce((sum, item) => {
        const xi = parseFloat(item.xi);
        return sum + item.frequency * Math.pow(xi - mean, 2);
    }, 0) / totalFreq;

    const std = Math.sqrt(variance);

    const skewness = dataArray.reduce((sum, item) => {
        const xi = parseFloat(item.xi);
        return sum + item.frequency * Math.pow((xi - mean) / std, 3);
    }, 0) / totalFreq;

    return parseFloat(skewness).toFixed(precision);
}

export function asimetriaBowleyAgrupada(dataArray, precision) {
    const totalFreq = dataArray.reduce((sum, item) => sum + item.frequency, 0);
    const sorted = [...dataArray].sort((a, b) => parseFloat(a.Li) - parseFloat(b.Li));


    const Q1 = getGroupedPercentile(sorted, totalFreq, 25);
    const Q2 = getGroupedPercentile(sorted, totalFreq, 50);
    const Q3 = getGroupedPercentile(sorted, totalFreq, 75);

    const bowley = (Q3 + Q1 - (2 * Q2)) / (Q3 - Q1);
    return parseFloat(bowley).toFixed(precision);
}


export function kurtosisFisherAgrupada(dataArray, precision) {
    const totalFreq = dataArray.reduce((sum, item) => sum + item.frequency, 0);
    const mean = dataArray.reduce((sum, item) => sum + parseFloat(item.xi) * item.frequency, 0) / totalFreq;

    const variance = dataArray.reduce((sum, item) => {
        const xi = parseFloat(item.xi);
        return sum + item.frequency * Math.pow(xi - mean, 2);
    }, 0) / totalFreq;

    const std = Math.sqrt(variance);

    const kurtosis = dataArray.reduce((sum, item) => {
        const xi = parseFloat(item.xi);
        return sum + item.frequency * Math.pow((xi - mean) / std, 4);
    }, 0) / totalFreq;

    const kurtosisExcess = kurtosis - 3;

    return parseFloat(kurtosisExcess).toFixed(precision);
}

export function asimetriaKellyAgrupada(dataArray, precision) {
    const totalFreq = dataArray.reduce((sum, item) => sum + item.frequency, 0);

    // ✅ Ordenar las clases por Li
    const sorted = [...dataArray].sort((a, b) => parseFloat(a.Li) - parseFloat(b.Li));

    // 🔍 Calcular percentiles usando clases ordenadas
    const P10 = getGroupedPercentile(sorted, totalFreq, 10);
    const P50 = getGroupedPercentile(sorted, totalFreq, 50);
    const P90 = getGroupedPercentile(sorted, totalFreq, 90);

    // ⚠️ Validar divisor ≠ 0
    const divisor = P90 - P10;
    if (divisor === 0) {
        return "Indefinido";  // Evita división por cero
    }

    // ✅ Fórmula de Kelly
    const kelly = (P90 + P10 - 2 * P50) / divisor;

    // ✅ Redondear
    return parseFloat(kelly).toFixed(precision);
}


export function asimetriaPearsonAgrupada(dataArray, precision) {
    const totalFreq = dataArray.reduce((sum, item) => sum + item.frequency, 0);

    const mean = dataArray.reduce((sum, item) => sum + parseFloat(item.xi) * item.frequency, 0) / totalFreq;

    const variance = dataArray.reduce((sum, item) => {
        const xi = parseFloat(item.xi);
        return sum + item.frequency * Math.pow(xi - mean, 2);
    }, 0) / totalFreq;

    const std = Math.sqrt(variance);

    const median = getGroupedPercentile(dataArray, totalFreq, 50);

    const pearson = (3 * (mean - median)) / std;
    return parseFloat(pearson).toFixed(precision);
}

function getGroupedPercentile(dataArray, totalFreq, percentile) {
    const sorted = [...dataArray].sort((a, b) => parseFloat(a.Li) - parseFloat(b.Li));  // <--- ORDENAR
    let cumulativeFreq = 0;
    const target = (percentile / 100) * totalFreq;

    for (let i = 0; i < sorted.length; i++) {
        const item = sorted[i];
        const Li = parseFloat(item.Li);
        const Ls = parseFloat(item.Ls);
        const fi = item.frequency;
        const classWidth = Ls - Li;

        if (cumulativeFreq + fi >= target) {
            const prevCumulative = cumulativeFreq;
            const positionInClass = target - prevCumulative;
            const percentileValue = Li + (positionInClass / fi) * classWidth;
            return percentileValue;
        }

        cumulativeFreq += fi;
    }

    // Si no se encuentra, devolver último valor
    const lastItem = sorted[sorted.length - 1];
    return parseFloat(lastItem.xi);
}
