export function calcularMedia(numeros) {
    if (numeros.length === 0) throw new Error("El array no puede estar vacío.");
    const suma = numeros.reduce((a, b) => a + b, 0);
    return suma / numeros.length;
}

export function calcularMediana(numeros) {
    if (numeros.length === 0) throw new Error("El array no puede estar vacío.");
    const ordenados = [...numeros].sort((a, b) => a - b);
    const mitad = Math.floor(ordenados.length / 2);
    return ordenados.length % 2 === 0 ? (ordenados[mitad - 1] + ordenados[mitad]) / 2 : ordenados[mitad];
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
    if (numeros.length === 0 || numeros.some(num => num <= 0)) {
        throw new Error("La media armónica no se puede calcular con valores negativos o ceros.");
    }
    const sumaInversa = numeros.reduce((acc, num) => acc + (1 / num), 0);
    return numeros.length / sumaInversa;
}

export function calcularMediaGeometrica(numeros) {
    if (numeros.length === 0 || numeros.some(num => num <= 0)) {
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
