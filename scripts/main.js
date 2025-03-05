import { processData } from './dataProcessor.js';
import { exportToExcelWithName, exportAsImageWithName } from './fileExporter.js';
import { readExcelFile, getColumnDataByName } from './excelHandler.js';
import { generateChart } from './chartGenerator.js';


// Evento principal para procesar los datos
document.getElementById('process-data-btn').addEventListener('click', async () => {
    const file = document.getElementById('file-input').files[0];
    const columnName = document.getElementById('column-name-input').value.trim();
    const tableFileName = document.getElementById('table-filename').value.trim() || 'tabla_frecuencia';
    const imageFileName = document.getElementById('image-filename').value.trim() || 'grafico_frecuencia';
    const variableType = document.getElementById('variable-type').value;

    if (!file || !columnName) {
        alert('Por favor sube un archivo Excel e introduce el nombre de la columna.');
        return;
    }

    try {
        // Leer y procesar el archivo Excel
        const excelData = await readExcelFile(file);
        const columnData = getColumnDataByName(excelData, columnName);
        const processedData = processData(columnData, variableType);
        const { result, totalFrequency, estadisticas } = processedData;

        // Mostrar la tabla de frecuencias y estadísticas en la página
        displayResults(result, totalFrequency, variableType, estadisticas);
        generateChart(result, variableType);

        // Exportar tabla y gráfico
        exportToExcelWithName(tableFileName);
        exportAsImageWithName(imageFileName);
    
    
    } catch (error) {
        alert(error.message);
    }
});

// Función para mostrar la tabla en la página
function displayResults(data, totalFrequency, variableType, estadisticas) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';  // Limpiar resultados previos

    if (data.length === 0) {
        resultsDiv.innerHTML = '<p>No se encontraron datos para procesar.</p>';
        return;
    }

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // Encabezados según el tipo de variable
    const headers = (variableType === 'cuantitativa_continua') 
        ? ['Clase (mi)', 'Li', 'Ls', 'Marca de Clase (xi)', 'Frecuencia absoluta simple (fi)', 'Frecuencia Absoluta Acumulada (Fi)', 
           'Frecuencia Relativa (hi)', 'Frecuencia Relativa Acumulada (Hi)', 'Frecuencia Relativa Porcentual (hi%)', 'Frecuencia Relativa Porcentual acumulada (Hi%)']
        : ['Valor', 'Frecuencia (f)', 'Frecuencia Acumulada (F)', 'Frecuencia Relativa (fr)', 
           'Frecuencia Relativa Acumulada (Fr)', 'Porcentaje (%)', 'Porcentaje Acumulado (%)'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Nueva tabla de estadísticas
    if (estadisticas) {
        const statsDiv = document.createElement('div');
        statsDiv.id = "stats-results";
        statsDiv.innerHTML = `
            <h3>Medidas Estadísticas</h3>
            <table>
                <tr><td>Media:</td><td>${estadisticas.media}</td></tr>
                <tr><td>Mediana:</td><td>${estadisticas.mediana}</td></tr>
                <tr><td>Moda:</td><td>${estadisticas.moda.join(', ')}</td></tr>
                <tr><td>Media Armónica:</td><td>${estadisticas.mediaArmonica.toFixed(4)}</td></tr>
                <tr><td>Media Geométrica:</td><td>${estadisticas.mediaGeometrica.toFixed(4)}</td></tr>
                <tr><td>Varianza:</td><td>${estadisticas.varianza.toFixed(4)}</td></tr>
                <tr><td>Desviación Estándar:</td><td>${estadisticas.desviacionEstandar.toFixed(4)}</td></tr>
                <tr><td>Coeficiente de Variación (%):</td><td>${estadisticas.coeficienteVariacion.toFixed(4)}%</td></tr>
            </table>
            <button id="descargarExcel">Descargar Excel</button>
        `;
    
        resultsDiv.appendChild(statsDiv);
    
        // Evento del botón para descargar en Excel
        document.getElementById("descargarExcel").addEventListener("click", function() {
            const datos = [
                ["Medida", "Valor"],
                ["Media", estadisticas.media],
                ["Mediana", estadisticas.mediana],
                ["Moda", estadisticas.moda.join(', ')],
                ["Media Armónica", estadisticas.mediaArmonica.toFixed(4)],
                ["Media Geométrica", estadisticas.mediaGeometrica.toFixed(4)],
                ["Varianza", estadisticas.varianza.toFixed(4)],
                ["Desviación Estándar", estadisticas.desviacionEstandar.toFixed(4)],
                ["Coeficiente de Variación (%)", estadisticas.coeficienteVariacion.toFixed(4)]
            ];
    
            // Crear un libro de Excel
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(datos); // Convertir array a hoja
            XLSX.utils.book_append_sheet(wb, ws, "Estadísticas");
    
            // Guardar el archivo Excel
            XLSX.writeFile(wb, "Estadisticas.xlsx");
        });
    }
    

    // Insertar los datos en la tabla
    data.forEach(row => {
        const tr = document.createElement('tr');
        if (variableType === 'cuantitativa_continua') {
            tr.innerHTML = `
                <td>${row.m}</td>
                <td>${row.Li}</td>
                <td>${row.Ls}</td>
                <td>${row.xi}</td>
                <td>${row.frequency}</td>
                <td>${row.cumulativeFrequency}</td>
                <td>${row.relativeFrequency}</td>
                <td>${row.cumulativeRelativeFrequency}</td>
                <td>${row.percentage}%</td>
                <td>${row.cumulativePercentage}%</td>
            `;
        } else {
            tr.innerHTML = `
                <td>${row.value}</td>
                <td>${row.frequency}</td>
                <td>${row.cumulativeFrequency}</td>
                <td>${row.relativeFrequency}</td>
                <td>${row.cumulativeRelativeFrequency}</td>
                <td>${row.percentage}%</td>
                <td>${row.cumulativePercentage}%</td>
            `;
        }
        table.appendChild(tr);
    });

    // Pie de tabla con totales
    const footerRow = document.createElement('tr');
    footerRow.innerHTML = `
        <td><strong>Total</strong></td>
        ${variableType === 'cuantitativa_continua' ? '<td></td><td></td><td></td>' : ''}
        <td><strong>${totalFrequency}</strong></td>
        <td></td>
        <td><strong>1.0000</strong></td>
        <td><strong>1.0000</strong></td>
        <td><strong>100%</strong></td>
        <td><strong>100%</strong></td>
    `;
    table.appendChild(footerRow);

    resultsDiv.appendChild(table);
}
