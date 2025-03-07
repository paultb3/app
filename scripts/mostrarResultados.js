export function medidasDeTendeciCentral(estadisticas){
    const statsDiv = document.createElement('div');
        statsDiv.id = "stats-results";
        statsDiv.innerHTML = `
            <h3>Medidas Estadísticas</h3>
            <table>
                <tr><td>Media:</td><td>${estadisticas.media}</td></tr>
                <tr><td>Mediana:</td><td>${estadisticas.mediana}</td></tr>
                <tr><td>Moda:</td><td>${estadisticas.moda}</td></tr>
                <tr><td>Media Armónica:</td><td>${estadisticas.mediaArmonica}</td></tr>
                <tr><td>Media Geométrica:</td><td>${estadisticas.mediaGeometrica}</td></tr>
                <tr><td>Varianza:</td><td>${estadisticas.varianza}</td></tr>
                <tr><td>Desviación Estándar:</td><td>${estadisticas.desviacionEstandar}</td></tr>
                <tr><td>Coeficiente de Variación (%):</td><td>${estadisticas.coeficienteVariacion}%</td></tr>
            </table>
            <button id="descargarExcel">Descargar Excel</button>
        `;
    
        return statsDiv;
}