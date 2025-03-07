import {
    calcularMedia,
    calcularMediana,
    calcularModa,
    calcularMediaArmonica,
    calcularMediaGeometrica,
    calcularVarianza,
    calcularDesviacionEstandar,
    calcularCoeficienteVariacion
} from './statsCalculator.js';

export function processData(dataArray, variableType) {


    if (variableType === 'cuantitativa_continua') {
        const processedData = processContinuousData(dataArray);
        return {
            ...processedData,
            estadisticas: calcularEstadisticas(processedData.result)
        };
    } else {
        const processedData = processDiscreteOrQualitativeData(dataArray, variableType);
        if (variableType === 'cuantitativa_discreta') {
            return {
                ...processedData,
            };
        }
        return processedData;
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
    let select = parseInt(document.getElementById("presicion").value);
    return select
}

// Procesar variables cuantitativas continuas con intervalos
function processContinuousData(dataArray) {
    const numericData = dataArray.map(item => item === "" ? 0 : Number(item)).filter(item => !isNaN(item));
    const min = Math.min(...numericData);
    const max = Math.max(...numericData);
    const range = max - min;

    const n = numericData.length;
    const k = Math.round(1 + 3.322 * Math.log10(n)); // Regla de Sturges
    
    const intervalWidth = parseFloat((range / k));
    intervalWidth.toFixed(escogerPrecision());

    const intervals = [];
    let start = min;

    for (let i = 0; i < k; i++) {
        const end = start + intervalWidth;
        intervals.push({ 
            m: i + 1,
            Li: start.toFixed(escogerPrecision()),
            Ls: end.toFixed(escogerPrecision()),
            xi: ((start + end) / 2).toFixed(escogerPrecision()),
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
            relativeFrequency: relativeFrequency.toFixed(escogerPrecision()),
            cumulativeRelativeFrequency: cumulativeRelativeFrequency.toFixed(escogerPrecision()),
            percentage: (relativeFrequency * 100).toFixed(escogerPrecision()),
            cumulativePercentage: (cumulativeRelativeFrequency * 100).toFixed(escogerPrecision())
        };
    });

    return { result, totalFrequency: n };
}

function calcularEstadisticas(numeros) {
    return {
        media: calcularMedia(numeros, escogerPrecision()),
        mediana: calcularMediana(numeros, escogerPrecision()),
        moda: calcularModa(numeros),
        mediaArmonica: calcularMediaArmonica(numeros, escogerPrecision()),
        mediaGeometrica: calcularMediaGeometrica(numeros, escogerPrecision()),
        varianza: calcularVarianza(numeros, escogerPrecision()),
        desviacionEstandar: calcularDesviacionEstandar(numeros, escogerPrecision()),
        coeficienteVariacion: calcularCoeficienteVariacion(numeros, escogerPrecision())
    };
}

