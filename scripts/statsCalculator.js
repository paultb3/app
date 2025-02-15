
export function calcularMedia(numeros) {
    const suma = numeros.reduce((a, b) => a + b, 0);
    return suma / numeros.length;
}

export function calcularMediana(numeros) {
    numeros.sort((a, b) => a - b);
    const mitad = Math.floor(numeros.length / 2);
    return numeros.length % 2 === 0 ? (numeros[mitad - 1] + numeros[mitad]) / 2 : numeros[mitad];
}

export function calcularModa(numeros) {
    const frecuencia = {};
    let maxFrecuencia = 0;
    let modas = [];

    numeros.forEach(num => {
        frecuencia[num] = (frecuencia[num] || 0) + 1;
        if (frecuencia[num] > maxFrecuencia) {
            maxFrecuencia = frecuencia[num];
            modas = [num];
        } else if (frecuencia[num] === maxFrecuencia) {
            modas.push(num);
        }
    });
    return modas;
}

export function calcularMediaArmonica(numeros) {
    const sumaInversa = numeros.reduce((acc, num) => acc + (1 / num), 0);
    return numeros.length / sumaInversa;
}

export function calcularMediaGeometrica(numeros) {
    const producto = numeros.reduce((acc, num) => acc * num, 1);
    return Math.pow(producto, 1 / numeros.length);
}

export function calcularVarianza(numeros) {
    const media = calcularMedia(numeros);
    const sumaCuadrados = numeros.reduce((acc, num) => acc + Math.pow(num - media, 2), 0);
    return sumaCuadrados / numeros.length;
}

export function calcularDesviacionEstandar(numeros) {
    return Math.sqrt(calcularVarianza(numeros));
}

export function calcularCoeficienteVariacion(numeros) {
    return (calcularDesviacionEstandar(numeros) / calcularMedia(numeros)) * 100;
}
