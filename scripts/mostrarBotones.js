export function mostrarBotonDeProcesar(){
        const resultado = document.getElementById('div-de-botones');

        if(!document.getElementById('btn-descargar-excel')){
            
        const btnDescargarExcel = generarBoton('button','Descargar Data Procesada', 'btn-descargar-excel');
        const btnDescargarGrafico = generarBoton('button','Descargar grafico','btn-descargar-grafico');

        resultado.appendChild(btnDescargarExcel);
        resultado.appendChild(btnDescargarGrafico);
        }
}

function generarBoton(tipo, nombre,nombreClase){
    const elementoCreado = document.createElement(tipo);
    elementoCreado.textContent = nombre;
    elementoCreado.id = nombreClase;
    elementoCreado.classList = nombreClase;
    return elementoCreado;
}
