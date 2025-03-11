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

import {
    calcularMediaDiscreta,
    calcularMedianaDiscreta,
    calcularModaDiscreta,
    calcularMediaArmonicaDiscreta,
   calcularMediaGeometricaDiscreta,
    calcularVarianzaDiscreta,
    calcularDesviacionEstandarDiscreta,
    calcularCoeficienteVariacionDiscreta
 } from './stasCalulculatorCualitivaDiscreta.js';

export function processData(dataArray, variableType) {


    if (variableType === 'cuantitativa_continua' || variableType==='cuantitatita_discreta_intervalos') {
        const processedData = processContinuousData(dataArray);
        return {
            ...processedData,
            estadisticas: calcularEstadisticas(processedData.result ,variableType)
        };
    } else {
        const processedData = processDiscreteOrQualitativeData(dataArray, variableType);
        if (variableType === 'cuantitativa_discreta') {
            return {
                ...processedData,
                estadisticas:calcularEstadisticas(dataArray,variableType)
            };
        }
        return processedData;
    }
}


// Procesar variables cualitativas y cuantitativas discretas
function processDiscreteOrQualitativeData(dataArray, variableType) {
    let totalRelativeFrequency = 0;
    let totalPorcentaje = 0;
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
        totalRelativeFrequency+=relativeFrequency;
        totalPorcentaje += (relativeFrequency *100);

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

    totalRelativeFrequency = parseFloat(totalRelativeFrequency.toFixed(escogerPrecision()))

    totalPorcentaje = parseFloat(totalPorcentaje.toFixed(escogerPrecision()));

    return { result, totalFrequency, totalRelativeFrequency, totalPorcentaje };
}

function escogerPrecision() {
    let select = parseInt(document.getElementById("presicion").value);
    return select
}

// Procesar variables cuantitativas continuas con intervalos
function processContinuousData(dataArray) {
    let totalPorcentaje = 0;
    let totalRelativeFrequency = 0;
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
        totalRelativeFrequency += relativeFrequency;
        totalPorcentaje+=(relativeFrequency *100);

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

        totalPorcentaje = totalPorcentaje.toFixed(escogerPrecision()) 
        totalRelativeFrequency =  totalRelativeFrequency.toFixed(escogerPrecision())
    return { result, totalFrequency: n , totalRelativeFrequency, totalPorcentaje};
}

function calcularEstadisticas(numeros, variableType) {
    if(variableType ==='cuantitativa_continua' || variableType==='cuantitatita_discreta_intervalos'){
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
    }else{
        return{
            media :calcularMediaDiscreta(numeros, escogerPrecision()),
            mediana:calcularMedianaDiscreta(numeros, escogerPrecision()),
            moda: calcularModaDiscreta(numeros),
            mediaArmonica: calcularMediaArmonicaDiscreta(numeros, escogerPrecision()),
            mediaGeometrica : calcularMediaGeometricaDiscreta(numeros, escogerPrecision()),
            varianza :calcularVarianzaDiscreta(numeros, escogerPrecision()),
            desviacionEstandar: calcularDesviacionEstandarDiscreta(numeros, escogerPrecision()),
            coeficienteVariacion :calcularCoeficienteVariacionDiscreta(numeros, escogerPrecision())
        }
    }
}
