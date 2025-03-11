
const nombre = document.getElementById('column-name-input');

export function tablaDeFrecuencia() {
    const tablaFrecuencias = document.getElementById('results');

    if (!tablaFrecuencias) {
        alert("No hay tabla de frecuencias disponible para exportar.");
        return;
    }

    const frequencyData = [];
    tablaFrecuencias.querySelectorAll("tr").forEach((row, rowIndex) => {
        const cols = row.querySelectorAll("td, th");
        const rowData = Array.from(cols).map(col => col.innerText);
        
        // Asegurar que la fila tenga el número correcto de columnas según el tipo de variable
        if (rowIndex === 0 || rowData.length >= 7) { // Mantener encabezados y filas completas
            frequencyData.push(rowData);
        }
    });

    // Crear y exportar el archivo Excel con toda la tabla de frecuencias
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(frequencyData);
    XLSX.utils.book_append_sheet(wb, ws, "Tabla de Frecuencias");


    XLSX.writeFile(wb, `Tabla_frecuencia_de_${nombre.value}.xlsx`);
}

// Función para descargar las medidas de resumen en Excel
export function medidasDeResumen() {
    const estadisticas = document.getElementById("stats-results");

    if (!estadisticas) {
        alert("No hay medidas de resumen disponibles para exportar.");
        return;
    }

    const statsData = [["Medida", "Valor"]];
    estadisticas.querySelectorAll("tr").forEach(row => {
        const cols = row.querySelectorAll("td, th");
        const rowData = Array.from(cols).map(col => col.innerText);
        statsData.push(rowData);
    });

    // Crear y exportar el archivo Excel solo con las medidas de resumen
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(statsData);
    XLSX.utils.book_append_sheet(wb, ws, "Medidas de Resumen");

    XLSX.writeFile(wb, `Medidas_resumen_de_${nombre.value}.xlsx`);
}
// Función para descargar el gráfico como imagen
export function downloadChart() {
    const canvas = document.getElementById("frequency-chart");
    if (!canvas || canvas.style.display === "none") {
        alert("No hay gráfico disponible para descargar.");
        return;
    }

    window.html2canvas(canvas).then(canvas => {
        canvas.toBlob(blob => {
            window.saveAs(blob, `Grafico_barras_de_${nombre.value}.png`);
        });
    });
}
