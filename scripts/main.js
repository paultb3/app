import { processData } from './dataProcessor.js';
import { exportToExcelWithName, exportAsImageWithName } from './fileExporter.js';
import { readExcelFile, getColumnDataByName } from './excelHandler.js';
import { generateChart } from './chartGenerator.js';

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
        const excelData = await readExcelFile(file);
        const columnData = getColumnDataByName(excelData, columnName);
        const processedData = processData(columnData, variableType);

        displayResults(processedData);
        generateChart(processedData);

        exportToExcelWithName(tableFileName);
        exportAsImageWithName(imageFileName);
    } catch (error) {
        alert(error.message);
    }
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.length === 0) {
        resultsDiv.innerHTML = '<p>No se encontraron datos para procesar.</p>';
        return;
    }

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    ['Valor', 'Frecuencia', 'Frecuencia Acumulada'].forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.value}</td><td>${row.frequency}</td><td>${row.cumulative}</td>`;
        table.appendChild(tr);
    });

    resultsDiv.appendChild(table);
}
