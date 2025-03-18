export function calcularMedia(numeros, precision) {
    if (numeros.length === 0) throw new Error("El array no puede estar vacío.");

    let suma = 0;
    let totalFrecuecnia = 0;

    for(let i=0;i<numeros.length;i++){
        suma += numeros[i].xi * numeros[i].frequency;
        totalFrecuecnia += numeros[i].frequency ;
    }

    if ( totalFrecuecnia=== 0) throw new Error("La suma de frecuencias no puede ser cero.");

    return parseFloat((suma / totalFrecuecnia).toFixed(precision));
}

export function calcularMediana(numeros,precision) {
    if (numeros.length === 0) throw new Error("El array no puede estar vacío.");

    let total = numeros.reduce((acc, element) => acc + element.frequency, 0);
    let size = total % 2 === 0 ? total / 2 : (total + 1) / 2;

    for(let i = 0;i<numeros.length;i++){
        let media = 0;
        let Li = Number(numeros[i].Li); // Convertir a número
        let Ls = Number(numeros[i].Ls); // Convertir a número
        let frecuencia = numeros[i].frequency;
        let amplitud = Ls - Li;
        
        if(size<numeros[i].cumulativeFrequency){
            
            let anteriorCF = i> 0? numeros[i-1].cumulativeFrequency : 0;
            media = Li + (size - anteriorCF)/frecuencia*amplitud;
    
            return parseFloat(media.toFixed(precision));
            break;
        }
     }
}



export function calcularModa(numeros, precision) {
    if (numeros.length === 0) throw new Error("El array no puede estar vacío.");

    let maxFrecuencia = Math.max(...numeros.map(n => n.frequency));
    let modalClass = numeros.find(n => n.frequency === maxFrecuencia);
    
    if (!modalClass) return null;

    let Li = parseFloat(modalClass.Li);
    let d1 = maxFrecuencia - (modalClass.m > 1 ? numeros[modalClass.m - 2].frequency : 0);
    let d2 = maxFrecuencia - (modalClass.m < numeros.length ? numeros[modalClass.m].frequency : 0);
    let amplitud = parseFloat(modalClass.Ls) - Li;
  
    return parseFloat((Li + (d1 / (d1 + d2)) * amplitud).toFixed(precision));
}

export function calcularMediaArmonica(numeros, precision) {
    if (numeros.length === 0) throw new Error("El array no puede estar vacío.");
    let sumaInversa = numeros.reduce((acc, num) => acc + (num.frequency / parseFloat(num.xi)), 0);
    let totalFrecuencia = numeros.reduce((acc, num) => acc + num.frequency, 0);
    return parseFloat((totalFrecuencia / sumaInversa).toFixed(precision));
}

export function calcularMediaGeometrica(numeros, precision) {
    if (numeros.length === 0) throw new Error("El array no puede estar vacío.");
    let productoLogaritmos = numeros.reduce((acc, num) => acc + (num.frequency * Math.log(parseFloat(num.xi))), 0);
    let totalFrecuencia = numeros.reduce((acc, num) => acc + num.frequency, 0);
    return parseFloat(Math.exp(productoLogaritmos / totalFrecuencia).toFixed(precision));
}

export function calcularVarianza(numeros, precision) {
    if (numeros.length < 2) throw new Error("Se necesita al menos dos valores para calcular la varianza.");
    
    const media = calcularMedia(numeros, 10);
    const sumaCuadrados = numeros.reduce((acc, num) => acc + Math.pow(parseFloat(num.xi) - media, 2) * num.frequency, 0);
    const totalFrecuencia = numeros.reduce((acc, num) => acc + num.frequency, 0);
    return parseFloat((sumaCuadrados / (totalFrecuencia - 1)).toFixed(precision));
}

export function calcularDesviacionEstandar(numeros, precision) {
    return parseFloat(Math.sqrt(calcularVarianza(numeros, 10)).toFixed(precision));
}

export function calcularCoeficienteVariacion(numeros, precision) {
    const media = calcularMedia(numeros, 10);
    if (media === 0) throw new Error("La media no puede ser cero para calcular el coeficiente de variación.");
    return parseFloat(((calcularDesviacionEstandar(numeros, 10) / media) * 100).toFixed(precision));
}
