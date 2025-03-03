import { calculosDeMedia } from "./operaciones.js";


export function calcularMedia(numeros) {
    if (numeros.length === 0) throw new Error("El array no puede estar vacío.");

    let suma = 0;
    let totalFrecuecnia = 0;

    for(let i=0;i<numeros.length;i++){
        suma += numeros[i].xi * numeros[i].frequency;
        totalFrecuecnia += numeros[i].frequency ;
    }

    if ( totalFrecuecnia=== 0) throw new Error("La suma de frecuencias no puede ser cero.");

    return parseFloat((suma / totalFrecuecnia).toFixed(4));
}

export function calcularMediana(numeros) {
    if (numeros.length === 0) throw new Error("El array no puede estar vacío.");
    
    let encontrarParImpar = calculosDeMedia(numeros).parImpar;
    const datosOrdenados = calculosDeMedia(numeros).extraerArray;
    
}

export function calcularModa(numeros) {
    if (numeros.length === 0) throw new Error("El array no puede estar vacío.");
    const frecuencia = {};
    let maxFrecuencia = 0;
    let modas = [];

    numeros.forEach(num => {
        frecuencia[num] = (frecuencia[num] || 0) + 1;
        if (frecuencia[num] > maxFrecuencia) {
            maxFrecuencia = frecuencia[num];
            modas = [num];
        } else if (frecuencia[num] === maxFrecuencia && !modas.includes(num)) {
            modas.push(num);
        }
    });

    return modas.length === numeros.length ? [] : modas; // Si todos los valores tienen la misma frecuencia, no hay moda
}

export function calcularMediaArmonica(numeros) {
    if (numeros.length === 0 ) {
        throw new Error("La media armónica no se puede calcular con valores negativos o ceros.");
    }
    const sumaInversa = numeros.reduce((acc, num) => acc + (1 / num), 0);
    return numeros.length / sumaInversa;
}

export function calcularMediaGeometrica(numeros) {
    if (numeros.length === 0) {
        throw new Error("La media geométrica no se puede calcular con valores negativos o ceros.");
    }
    
    // Sumar logaritmos en lugar de multiplicar directamente
    const sumaLogaritmos = numeros.reduce((acc, num) => acc + Math.log(num), 0);
    
    // Aplicar la fórmula con exponencial
    return Math.exp(sumaLogaritmos / numeros.length);
}

export function calcularVarianza(numeros) {
    if (numeros.length < 2) throw new Error("Se necesita al menos dos valores para calcular la varianza.");
    const media = calcularMedia(numeros);
    const sumaCuadrados = numeros.reduce((acc, num) => acc + Math.pow(num - media, 2), 0);
    return sumaCuadrados / (numeros.length - 1); // Usar n-1 para varianza muestral
}

export function calcularDesviacionEstandar(numeros) {
    return Math.sqrt(calcularVarianza(numeros));
}

export function calcularCoeficienteVariacion(numeros) {
    const media = calcularMedia(numeros);
    if (media === 0) throw new Error("La media no puede ser cero para calcular el coeficiente de variación.");
    return (calcularDesviacionEstandar(numeros) / media) * 100;
}
