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

import {calcularCuartilesDatosNoAgrupados} from '../medidasDePosisionDatosNoAgrupados.js'

export function calcularEstadisticas(numeros, variableType) {
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

export function calcularMedidasDePosicion(numeros, variableType){
    if(!(variableType==='cuantitaiva')){
        cuartiles : calcularCuartilesDatosNoAgrupados(numeros)
    }
}
