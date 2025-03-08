export function generateChart(data, variableType) {
    const ctx = document.getElementById('frequency-chart').getContext('2d');
    const nombreDeColumna = document.querySelector('#column-name-input').value;

    document.getElementById('frequency-chart').style.display = 'block';

    let labels, chartType, backgroundColors;

    if (variableType === 'cualitativa' || variableType === 'cuantitativa_discreta') {
        // Gráfico de pastel para variables cualitativas
        labels = data.map(item => item.value);
        chartType = 'pie';
        backgroundColors = labels.map(() => getRandomColor());
    } else if (variableType === 'cuantitativa_discreta') {
        // Gráfico de barras para cuantitativas discretas
        labels = data.map(item => item.value);
        chartType = 'pie';
        backgroundColors = labels.map(() => getRandomColor());
    } else if (variableType === 'cuantitativa_continua' || variableType==='cuantitatita_discreta_intervalos') {
        // Histograma (gráfico de barras) para cuantitativas continuas
        labels = data.map(item => `${item.Li} - ${item.Ls}`);
        chartType = 'bar';
        backgroundColors = 'rgba(153, 102, 255, 0.6)';
    }

    const frequencies = data.map(item => item.frequency);

    if (window.frequencyChart) {
        window.frequencyChart.destroy(); // Destruir el gráfico anterior si existe
    }

    window.frequencyChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: `Histograma de ${nombreDeColumna}`, // Asigna un nombre en caso de "undefined"
                data: frequencies,
                backgroundColor: backgroundColors,
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.raw;
                        }
                    }
                }
            },
            scales: chartType === 'bar' ? {
                x: {
                    title: {
                        display: true,
                        text: (variableType === 'cuantitativa_continua' || variableType==='cuantitatita_discreta_intervalos') ?  nombreDeColumna : nombreDeColumna
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frecuencia Absoluta'
                    },
                    ticks: {
                        stepSize: 1
                    }
                }
            } : {}
        }
    });
}

// Generar colores aleatorios para el gráfico de pastel
function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
}
