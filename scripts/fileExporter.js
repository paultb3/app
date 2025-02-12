export function exportToExcelWithName(filename) {
    const table = document.querySelector('#results table');
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Tabla de Frecuencia" });
    XLSX.writeFile(workbook, `${filename}.xlsx`);
}

export function exportAsImageWithName(filename) {
    html2canvas(document.getElementById('frequency-chart')).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${filename}.png`;
        link.click();
    });
}
