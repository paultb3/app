import { processData } from './dataProcessor.js';
import { readExcelFile, getColumnDataByName } from './excelHandler.js';
import { generateChart } from './chartGenerator.js';
import { mostrarBotonDeProcesar } from './mostrarBotones.js';
import {displayResults} from './mostrarResultados.js';


// Mostrar u ocultar el input de precisión según tipo de variable
const variableTypeSelect = document.getElementById('variable-type');
const precisionDiv = document.getElementById('div-presicion');

variableTypeSelect.addEventListener('change', () => {
    const selectedType = variableTypeSelect.value;
    if (selectedType === 'cualitativa') {
        precisionDiv.style.display = 'none';
    } else {
        precisionDiv.style.display = 'block';
    }
});

// Evento principal para procesar los datos
document.getElementById('process-data-btn').addEventListener('click', async () => {
    const loadingOverlay = document.getElementById("loading-overlay");
    const file = document.getElementById('file-input').files[0];
    const columnName = document.getElementById('column-name-input').value.trim();
    const variableType = document.getElementById('variable-type').value;

    if (!file || !columnName) {
        alert('Por favor sube un archivo Excel e introduce el nombre de la columna.');
        return;
    }

    try {

        loadingOverlay.style.display = "flex";


        // Leer y procesar el archivo Excel
        const excelData = await readExcelFile(file);
        const columnData = getColumnDataByName(excelData, columnName);

        const processedData = processData(columnData, variableType);
        const { result, totalFrequency,totalRelativeFrequency,totalPorcentaje, estadisticas, cuartiles, asimetria } = processedData;
        // Mostrar la   tabla de frecuencias y estadísticas en la página
        displayResults(result, totalFrequency,totalRelativeFrequency,totalPorcentaje, variableType, estadisticas, cuartiles, asimetria);
        mostrarBotonDeProcesar(variableType);
        generateChart(result, variableType);

        loadingOverlay.style.display = "none";


    } catch (error) {
        alert(error.message);
    } finally{
        loadingOverlay.style.display = "none";
    }
});
