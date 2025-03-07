export function mostrarBotonDeProcesar(){
        const resultado = document.getElementById('div-de-botones');
    
        resultado.id = "div-botones-click";
    
        const btnDescargarExcel = generarBoton('button','Descargar Excel', 'btn-descargar-excel');
        const btnDescargarGrafico = generarBoton('button','Descargar grafico','btn-descargar-grafico');
        const calcularDnuevoBtn = generarBotonConEventoDeRecarga('button','Calcular De Nuevo','btn-cargar-denuevo');
    
        resultado.appendChild(btnDescargarExcel);
        resultado.appendChild(btnDescargarGrafico);
        resultado.appendChild(calcularDnuevoBtn);

}


function generarBoton(tipo, nombre,nombreClase){
    const elementoCreado = document.createElement(tipo);
    elementoCreado.textContent = nombre;
    elementoCreado.id = nombreClase;
    elementoCreado.classList = nombreClase;
    return elementoCreado;
}


function generarBotonConEventoDeRecarga(tipo,nombre,nombreClase){
    const elementoCreado = document.createElement(tipo);
    elementoCreado.textContent = nombre;
    elementoCreado.id = nombreClase;
    elementoCreado.classList = nombreClase;
    elementoCreado.addEventListener("click", ()=>{
        location.reload();
    })
    return elementoCreado;
}
