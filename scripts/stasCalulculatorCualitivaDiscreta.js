export function calcularMediaDiscreta(numbers,precision){
    let suma = 0
    for (const num of numbers) {
        suma += num;
    }

    return parseFloat((suma/numbers.length).toFixed(precision));
}

export function calcularMedianaDiscreta(numbers,precision){

    numbers.sort((a, b) => a - b);

    for (let index = 1; index <= numbers.length; index++) {

        let total = numbers.length;
        let index = Math.floor(total/2)

        if(total%2===0){
            return (numbers[index] + numbers[index-1])/2;
        }else{
            return parseFloat((numbers[index]).toFixed(precision));
        }
    }
}

export function calcularModaDiscreta(numbers){
    if (numbers.length === 0) return null;

    const frecuencia = {};
    let maxFrecuencia = 0;

    // Contar las frecuencias de cada número
    numbers.forEach(num => {
        frecuencia[num] = (frecuencia[num] || 0) + 1;
        if (frecuencia[num] > maxFrecuencia) {
            maxFrecuencia = frecuencia[num];
        }
    });

    // Encontrar los valores con la máxima frecuencia
    const modas = Object.keys(frecuencia)
        .filter(num => frecuencia[num] === maxFrecuencia)
        .map(Number);

    // Si todas las frecuencias son iguales, no hay moda
    const valoresUnicos = Object.values(frecuencia);
    if (valoresUnicos.every(frec => frec === maxFrecuencia)) {
        return null;
    }

    return modas.length === 1 ? modas[0] : modas;
}
export function calcularMediaArmonicaDiscreta(numbers, precision) {
    let suma = 0;
    
    for (const element of numbers) {
        if (element === 0) {
            return "Indeterminado";
        }
        suma += 1 / element;
    }

    return suma === 0 ? "Error: División por cero." : (numbers.length / suma).toFixed(precision);
}

export function calcularMediaGeometricaDiscreta(numbers, precision = 2) {
    if (numbers.length === 0) {
        return "Error: La lista de números no puede estar vacía."
    }

    let sumaLogaritmos = 0;

    for (const element of numbers) {
        if (element < 0) {
            return "Error: La media geométrica solo se define para números positivos y mayores a cero.";
        }
        sumaLogaritmos += Math.log(element); // Sumamos logaritmos en lugar de multiplicar
    }

    let mediaGeometrica = Math.exp(sumaLogaritmos / numbers.length); // Tomamos la exponencial

    return mediaGeometrica.toFixed(precision);
}



export function calcularVarianzaDiscreta(numbers, precision = 2) {
    if (numbers.length < 2) {
        return "Error: Se necesitan al menos 2 datos para calcular la varianza muestral.";
    }

    let n = numbers.length;

    // Calcular la media muestral
    let media = numbers.reduce((acc, num) => acc + num, 0) / n;

    // Calcular la sumatoria de (Xi - X̄)²
    let sumatoria = numbers.reduce((acc, num) => acc + Math.pow(num - media, 2), 0);

    // Calcular la varianza muestral
    let varianza = sumatoria / (n - 1);

    return varianza.toFixed(precision);
}


export function calcularDesviacionEstandarDiscreta(numbers, precision = 2) {
    if (numbers.length < 2) {
        return "Error: Se necesitan al menos 2 datos para calcular la desviación estándar.";
    }

    // Calcular la varianza usando la función anterior
    let varianza = calcularVarianzaDiscreta(numbers, precision);
    
    // Si la varianza no es un número, devolver el error
    if (isNaN(varianza)) {
        return varianza;
    }

    // Calcular la desviación estándar
    let desviacionEstandar = Math.sqrt(parseFloat(varianza));

    return desviacionEstandar.toFixed(precision);
}

export function calcularCoeficienteVariacionDiscreta(numbers, precision = 2) {
    if (numbers.length < 2) {
        return "Error: Se necesitan al menos 2 datos para calcular el coeficiente de variación.";
    }

    // Calcular la media muestral
    let media = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;

    if (media === 0) {
        return "Error: La media es 0, no se puede calcular el coeficiente de variación.";
    }

    // Calcular la desviación estándar
    let desviacionEstandar = calcularDesviacionEstandarDiscreta(numbers, precision);

    // Si la desviación estándar no es un número, devolver el error
    if (isNaN(desviacionEstandar)) {
        return desviacionEstandar;
    }

    // Calcular el coeficiente de variación porcentual
    let coefVariacion = (parseFloat(desviacionEstandar) / media);
    return (coefVariacion* 100).toFixed(precision);
}
