export function readExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            resolve(jsonData);
        };
        reader.onerror = () => reject('Error al leer el archivo Excel');
        reader.readAsArrayBuffer(file);
    });
}

export function getColumnDataByName(excelData, columnName) {
    const headerRow = excelData[0];
    const columnIndex = headerRow.findIndex(header => header && header.toString().toLowerCase() === columnName.toLowerCase());
    if (columnIndex === -1) {
        throw new Error(`La columna "${columnName}" no fue encontrada en el archivo.`);
    }
    return excelData.slice(1).map(row => row[columnIndex]).filter(value => value !== undefined && value !== null);
}
