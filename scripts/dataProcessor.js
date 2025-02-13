export function processData(dataArray, variableType) {
    if (variableType === 'cuantitativa_continua') {
        return processContinuousData(dataArray);
    } else {
        return processDiscreteOrQualitativeData(dataArray, variableType);
    }
}

// Procesar variables cualitativas y cuantitativas discretas
function processDiscreteOrQualitativeData(dataArray, variableType) {
    const frequencyMap = {};
    dataArray.forEach(item => {
        let value = item;
        if (variableType === 'cuantitativa_discreta') {
            value = parseFloat(item);
            if (isNaN(value)) return;
        }
        frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });

    const totalFrequency = dataArray.length;
    const sortedData = Object.keys(frequencyMap).sort((a, b) => {
        if (variableType === 'cuantitativa_discreta') {
            return parseFloat(a) - parseFloat(b);
        } else {
            return a.localeCompare(b);
        }
    });

    let cumulativeFrequency = 0;
    let cumulativeRelativeFrequency = 0;

    const result = sortedData.map(value => {
        const absoluteFrequency = frequencyMap[value];
        cumulativeFrequency += absoluteFrequency;

        const relativeFrequency = absoluteFrequency / totalFrequency;
        cumulativeRelativeFrequency += relativeFrequency;

        return {
            value,
            frequency: absoluteFrequency,
            cumulativeFrequency,
            relativeFrequency: relativeFrequency.toFixed(4),
            cumulativeRelativeFrequency: cumulativeRelativeFrequency.toFixed(4),
            percentage: (relativeFrequency * 100).toFixed(2),
            cumulativePercentage: (cumulativeRelativeFrequency * 100).toFixed(2)
        };
    });

    return { result, totalFrequency };
}

function escogerPrecision() {
    let select = document.getElementById("amount-type");
    let valorSeleccionado = select.value;

    if (valorSeleccionado === "uno_decimal") {
        return 1;
    } else if (valorSeleccionado === "dos_decimal") {
        return 2;
    } else if (valorSeleccionado === "tres_decimal") {
        return 3;
    } else {
        return 0; // Retorna 0 si la opción no es válida
    }
}


// Procesar variables cuantitativas continuas con intervalos
function processContinuousData(dataArray) {
    const numericData = dataArray.map(Number).filter(item => !isNaN(item));
    const min = Math.min(...numericData);
    const max = Math.max(...numericData);
    const range = max - min;

    const n = numericData.length;
    const k = Math.ceil(1 + 3.322 * Math.log10(n)); // Regla de Sturges
    let decimal = 'variable-type'
    const intervalWidth = parseFloat((range / k).toFixed(escogerPrecision()));

    const intervals = [];
    let start = min;

    for (let i = 0; i < k; i++) {
        const end = start + intervalWidth;
        intervals.push({ 
            m: i + 1,
            Li: start.toFixed(2),
            Ls: end.toFixed(2),
            xi: ((start + end) / 2).toFixed(3),
            frequency: 0 
        });
        start = end;
    }

    numericData.forEach(value => {
        for (let i = 0; i < intervals.length; i++) {
            const lower = parseFloat(intervals[i].Li);
            const upper = parseFloat(intervals[i].Ls);
            if (value >= lower && value < upper) {
                intervals[i].frequency += 1;
                break;
            }
            // Para incluir el último valor exacto en el último intervalo
            if (i === intervals.length - 1 && value === upper) {
                intervals[i].frequency += 1;
            }
        }
    });

    let cumulativeFrequency = 0;
    let cumulativeRelativeFrequency = 0;

    const result = intervals.map(interval => {
        cumulativeFrequency += interval.frequency;
        const relativeFrequency = interval.frequency / n;
        cumulativeRelativeFrequency += relativeFrequency;

        return {
            m: interval.m,
            Li: interval.Li,
            Ls: interval.Ls,
            xi: interval.xi,
            frequency: interval.frequency,
            cumulativeFrequency,
            relativeFrequency: relativeFrequency.toFixed(4),
            cumulativeRelativeFrequency: cumulativeRelativeFrequency.toFixed(4),
            percentage: (relativeFrequency * 100).toFixed(2),
            cumulativePercentage: (cumulativeRelativeFrequency * 100).toFixed(2)
        };
    });

    return { result, totalFrequency: n };
}
