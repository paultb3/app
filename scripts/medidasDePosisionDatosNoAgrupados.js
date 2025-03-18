export function calcularCuartilesDatosNoAgrupados(dataArray) {
    const sorted = [...dataArray].sort((a, b) => a - b);
    const total = sorted.length;
    const cuartiles = [];

    for (let k = 1; k <= 3; k++) {
        const pos = k * (total + 1) / 4;

        if (Number.isInteger(pos)) {
            // Si es entero, tomar el valor en esa posición (recordá que el índice es pos-1)
            cuartiles.push(sorted[pos - 1]);
        } else {
            // Si no es entero, interpolar entre los valores
            const lowerIndex = Math.floor(pos) - 1;
            const upperIndex = Math.ceil(pos) - 1;
            const interpolado = sorted[lowerIndex] + (pos - Math.floor(pos)) * (sorted[upperIndex] - sorted[lowerIndex]);
            cuartiles.push(Number(interpolado.toFixed(0)));
        }
    }
    return cuartiles;
}
  
export function calcularCuartilesDatosAgrupados(arrayClases, precision) {
    const totalFrecuencia = arrayClases.reduce((acc, obj) => acc + obj.frequency, 0);
    const cuartiles = [];

    for (let k = 1; k <= 3; k++) {
        const posicion = (k * totalFrecuencia) / 4;
        let frecuenciaAcumulada = 0;

        for (let i = 0; i < arrayClases.length; i++) {
            const clase = arrayClases[i];
            const frecuenciaAnterior = frecuenciaAcumulada;
            frecuenciaAcumulada += clase.frequency;

            if (frecuenciaAcumulada >= posicion) {
                const Li = parseFloat(clase.Li);
                console.log(Li);
                const Ls = parseFloat(clase.Ls);
                const fi = clase.frequency;
                const A = Ls - Li;

                const valorSinRedondear = Li + ((posicion - frecuenciaAnterior) / fi) * A;

                // Redondear a la precisión deseada, manteniendo como número
                const factor = Math.pow(10, precision);
                const Qk = Math.round(valorSinRedondear * factor) / factor;

                cuartiles.push(Qk);

                console.log(`Q${k} sin redondear: ${valorSinRedondear}`);
                console.log(`Q${k} redondeado: ${Qk}`);
                break;
            }
        }
    }

    return cuartiles;
}


