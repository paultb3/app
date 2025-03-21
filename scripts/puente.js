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

 import {escogerPrecision} from './dataProcessor.js';

import {
    calcularCuartilesDatosNoAgrupados,
    calcularCuartilesDatosAgrupados,
} from './medidasDePosisionDatosNoAgrupados.js'

import {
    asimetriaBowley,
    asimetriaFisherPearson,
    asimetriaKelly,
    asimetriaPearson,
    kurtosisFisher,
    
} from './calcularCoeficienteDeAsimetria.js'

import {asimetriaBowleyAgrupada,
        asimetriaFisherPearsonAgrupada,
        asimetriaPearsonAgrupada,
        asimetriaKellyAgrupada,
        kurtosisFisherAgrupada
}
from './calcularAsimetriaAgrupados.js'

export function calcularEstadisticas(numeros, variableType) {
    if(variableType ==='cuantitativa_continua' || variableType==='cuantitatita_discreta_intervalos'){
        return {
            media: calcularMedia(numeros, escogerPrecision()),
            mediana: calcularMediana(numeros, escogerPrecision()),
            moda: calcularModa(numeros, escogerPrecision()),
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

export function calcularMedidasDePosicion(numeros, variableType){
    if(variableType==='cuantitativa_discreta'){
        return calcularCuartilesDatosNoAgrupados(numeros)
    }else if(variableType==='cuantitativa_continua'||variableType==='cuantitatita_discreta_intervalos'){
        return calcularCuartilesDatosAgrupados(numeros, escogerPrecision())
    }
}

export function calcularCoeficienteDeAsimetria(numeros,variableType){
    if(variableType==='cuantitativa_discreta'){
        return {
            fisher: asimetriaFisherPearson(numeros, escogerPrecision()),
            bowley : asimetriaBowley(numeros, escogerPrecision()),
            kelly: asimetriaKelly(numeros, escogerPrecision()),
            person: asimetriaPearson(numeros, escogerPrecision()),
            kurtosis: kurtosisFisher(numeros, escogerPrecision()),
        }
    }else if(variableType==='cuantitativa_continua'||variableType==='cuantitatita_discreta_intervalos'){
        return{
            fisher: asimetriaFisherPearsonAgrupada(numeros,escogerPrecision()),
            bowley: asimetriaBowleyAgrupada(numeros,escogerPrecision()),
            kelly: asimetriaKellyAgrupada(numeros, escogerPrecision()),
            person:asimetriaPearsonAgrupada(numeros,escogerPrecision()),
            kurtosis: kurtosisFisherAgrupada(numeros,escogerPrecision()),
        }
    }
}