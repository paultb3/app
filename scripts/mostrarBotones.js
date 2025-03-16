import { downloadChart, tablaDeFrecuencia, medidasDeResumen} from "./donwloadHandler.js";


export function mostrarBotonDeProcesar(variableType){
        const resultado = document.getElementById('botones-descarga');

            // Limpiar solo los botones de descarga, no el botón procesar
        resultado.innerHTML = ''; 
        
        const btnDescargarExcel = generarBoton('button','Descargar medidas de resumen', 'btn-descargar-excel');
        const btnDescargarTabla = generarBoton('button','Descargar tabla ', 'btn-descargar-tabla');
        const btnDescargarGrafico = generarBoton('button','Descargar grafico','btn-descargar-grafico');

        if(variableType==='cualitativa'){
            resultado.appendChild(btnDescargarTabla);
            resultado.appendChild(btnDescargarGrafico);
        }else{
        resultado.appendChild(btnDescargarTabla);
        resultado.appendChild(btnDescargarExcel);
        resultado.appendChild(btnDescargarGrafico);
        }

        // ✅ Asignar eventos aquí en lugar de `DOMContentLoaded`
        btnDescargarTabla.addEventListener("click", tablaDeFrecuencia);
        btnDescargarExcel.addEventListener("click", medidasDeResumen);
        btnDescargarGrafico.addEventListener("click", downloadChart);
}

function generarBoton(tipo, nombre,nombreClase){
    const elementoCreado = document.createElement(tipo);
    elementoCreado.textContent = nombre;
    elementoCreado.id = nombreClase;
    elementoCreado.classList = nombreClase;
    return elementoCreado;
}
