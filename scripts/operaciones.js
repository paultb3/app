//ecuentra n 
function encontrarParImpar(numeros){
    let size = 0;
    
    if(numeros.length%2===0){
        size = numeros.length/2;
    }else{
        size = (numeros.length + 1)/2;
    }
    return size;
}

//extrae el array de frecuencia acumulada

function extraerArray(numeros) {
    return numeros.map(num => num.cumulativeFrequency).sort((a, b) => a - b);
}


export function calculosDeMedia(numeros){
    return{
        parImpar : encontrarParImpar(numeros),
        extraerArray : extraerArray(numeros),
    }
    
};