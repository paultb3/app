export function medidasDeTendeciCentral(estadisticas) {
    const statsDiv = document.getElementById('stats-results');
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
    `;
}

export function Mostrarcuartiles(cuartiles) {
    const cuartilesDiv = document.getElementById('cuartiles-result');
    cuartilesDiv.innerHTML = `
        <h3>Cuartiles</h3>
        <table>
            <tr><td>Q1 (25%):</td><td>${cuartiles[0]}</td></tr>
            <tr><td>Q2 (50%):</td><td>${cuartiles[1]}</td></tr>
            <tr><td>Q3 (75%):</td><td>${cuartiles[2]}</td></tr>
        </table>
    `;
}

// Función para mostrar la tabla en la página
export function displayResults(data, totalFrequency, totalRelativeFrequency, totalPorcentaje, variableType, estadisticas, cuartiles) {
    const nombreDeColumna = document.querySelector('#column-name-input').value;

    // Limpiar TODO antes de mostrar lo nuevo
    const resultsDiv = document.getElementById('results');
    const statsDiv = document.getElementById('stats-results');
    const cuartilesDiv = document.getElementById('cuartiles-result');
    const canvas = document.getElementById('frequency-chart');

    resultsDiv.innerHTML = '';
    statsDiv.innerHTML = '';
    cuartilesDiv.innerHTML = '';

    // Limpiar gráfico anterior si existe
    const chartInstance = Chart.getChart(canvas);
    if (chartInstance) {
        chartInstance.destroy();
    }
    canvas.style.display = 'none';

    if (data.length === 0) {
        resultsDiv.innerHTML = '<p>No se encontraron datos para procesar.</p>';
        return;
    }

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // Encabezados según el tipo de variable
    const headers = (variableType === 'cuantitativa_continua' || variableType === 'cuantitatita_discreta_intervalos') 
        ? [nombreDeColumna, 'Li', 'Ls', 'Marca de Clase (xi)', 'Frecuencia Absoluta (fi)', 'Frecuencia Acumulada (Fi)', 
           'Frecuencia Relativa (hi)', 'Frecuencia Relativa Acumulada (Hi)', 'hi%', 'Hi%']
        : [nombreDeColumna, 'Frecuencia Absoluta (fi)', 'Frecuencia Acumulada (Fi)', 'Frecuencia Relativa (hi)', 
           'Frecuencia Relativa Acumulada (Hi)', 'hi%', 'Hi%'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Insertar los datos en la tabla
    data.forEach(row => {
        const tr = document.createElement('tr');
        if (variableType === 'cuantitativa_continua' || variableType === 'cuantitatita_discreta_intervalos') {
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
        ${variableType === 'cuantitativa_continua' || variableType === 'cuantitatita_discreta_intervalos' ? '<td></td><td></td><td></td>' : ''}
        <td><strong>${totalFrequency}</strong></td>
        <td></td>
        <td><strong>${totalRelativeFrequency}</strong></td>
        <td></td>
        <td><strong>${totalPorcentaje}%</strong></td>
        <td></td>
    `;
    table.appendChild(footerRow);
    resultsDiv.appendChild(table);

    // Mostrar estadísticas SOLO si no es cualitativa
    if (estadisticas && variableType !== 'cualitativa') {
        medidasDeTendeciCentral(estadisticas);
    }

    // Mostrar cuartiles si hay
    if (cuartiles) {
        Mostrarcuartiles(cuartiles);
    }
}
