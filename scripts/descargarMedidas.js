import { exportToExcelWithName } from './fileExporter.js';

export function configurarDescargaEstadisticas(estadisticas) {
    document.getElementById("btn-descargar-excel").addEventListener("click", function() {
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

        // Llamamos a la función que exporta a Excel
        exportToExcelWithName(datos, "Estadisticas");
    });
}
