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
        const { result, totalFrequency } = processData(columnData, variableType);

        // Mostrar la tabla y el gráfico en la página
        displayResults(result, totalFrequency, variableType);
        generateChart(result, variableType);

        // Exportar tabla y gráfico
        exportToExcelWithName(tableFileName);
        exportAsImageWithName(imageFileName);
    } catch (error) {
        alert(error.message);
    }
});

// Función para mostrar la tabla en la página
function displayResults(data, totalFrequency, variableType) {
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
        ? ['Clase (m)', 'Li', 'Ls', 'Marca de Clase (xi)', 'Frecuencia (fi)', 'Frecuencia Acumulada (Fi)', 
           'Frecuencia Relativa (hi)', 'Frecuencia Relativa Acumulada (Hi)', 'Porcentaje (%)', 'Porcentaje Acumulado (%)']
        : ['Valor', 'Frecuencia (f)', 'Frecuencia Acumulada (F)', 'Frecuencia Relativa (fr)', 
           'Frecuencia Relativa Acumulada (Fr)', 'Porcentaje (%)', 'Porcentaje Acumulado (%)'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

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
