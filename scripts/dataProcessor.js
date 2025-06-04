 import { asimetriaBowley } from './calcularCoeficienteDeAsimetria.js';
import {
    calcularEstadisticas,
    calcularMedidasDePosicion,
    calcularCoeficienteDeAsimetria,
 } from './puente.js';

 import { roundingUp } from '../utils/rededondearAplitud.js';

 import { getMaxDecimals } from '../utils/decimalesMaximos.js';

 export function processData(dataArray, variableType) {
    let processedData;

    switch (variableType) {
        case 'cuantitativa_continua':
        case 'cuantitatita_discreta_intervalos':
            processedData = processContinuousData(dataArray);
            console.log(calcularCoeficienteDeAsimetria(processedData.result, variableType));
            return {
                ...processedData,
                estadisticas: calcularEstadisticas(processedData.result, variableType),
                cuartiles : calcularMedidasDePosicion(processedData.result, variableType),
                asimetria: calcularCoeficienteDeAsimetria(processedData.result, variableType)
            };

        case 'cuantitativa_discreta':
            processedData = processDiscreteOrQualitativeData(dataArray, variableType);
            return {
                ...processedData,
                estadisticas: calcularEstadisticas(dataArray, variableType),
                cuartiles: calcularMedidasDePosicion(dataArray, variableType),
                asimetria : calcularCoeficienteDeAsimetria(dataArray, variableType),
            };

        case 'cualitativa':
            processedData = processDiscreteOrQualitativeData(dataArray, variableType);
            return processedData;

        default:
            throw new Error('Tipo de variable no reconocido');
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

export function escogerPrecision() {
    let select = parseInt(document.getElementById("presicion").value);
    return select
}

// Procesar variables cuantitativas continuas con intervalos
function processContinuousData(dataArray) {
    
    let totalPorcentaje = 0;
    let totalRelativeFrequency = 0;

    const numericData = dataArray.map(item => item === "" ? 0 : Number(item)).filter(item => !isNaN(item));
    let maxDecimals = getMaxDecimals(numericData);
    console.log('decimales maximos: '+ maxDecimals);
    const min = Math.min(...numericData);
    const max = Math.max(...numericData);
    console.log('max: '+ max);
    console.log('min: ' + min);
    const range = max - min;
    console.log('rango: ' + range);
    
    const n = numericData.length;
    const rawK = 1 + 3.322 * Math.log10(n); // Regla de Sturges

   
    const k = roundingUp(rawK,0)

    console.log('itervaLOS: ' + k);

    const intervalWidth = (range / k);
    console.log('Intervalos antes: '+intervalWidth);

    let intervalWidthFinal = intervalWidth;

    if((intervalWidth - Math.round(intervalWidth ) ) !== 0){

        intervalWidthFinal = roundingUp(intervalWidth,maxDecimals);
        console.log('entrooooooo');
    }else{
        intervalWidthFinal = intervalWidthFinal + 0.1;
        maxDecimals += 1;
        console.log('maxdecimal'+ maxDecimals);
        console.log('onioooo: ' + intervalWidthFinal);
    }
 console.log('intervalos redondeadps: ' + intervalWidthFinal);

    const intervals = [];

    let start = min;

    for (let i = 0; i < k; i++) {
        let end = start + intervalWidthFinal;
        console.log(end);

        end = roundingUp(end,3);

        intervals.push({ 
            m: i + 1,
            Li: start.toFixed(maxDecimals),
            Ls: end.toFixed(maxDecimals),
            xi: ((start + end) / 2).toFixed(maxDecimals),
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
            relativeFrequency: relativeFrequency.toFixed(maxDecimals),
            cumulativeRelativeFrequency: cumulativeRelativeFrequency.toFixed(maxDecimals),
            percentage: (relativeFrequency * 100).toFixed(maxDecimals),
            cumulativePercentage: (cumulativeRelativeFrequency * 100).toFixed(maxDecimals)
        };
    });

        totalPorcentaje = totalPorcentaje.toFixed(maxDecimals) 
        totalRelativeFrequency =  totalRelativeFrequency.toFixed(maxDecimals)
    return { result, totalFrequency: n , totalRelativeFrequency, totalPorcentaje};
}
