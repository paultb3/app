// ✅ Primero registrás el plugin, SOLO UNA VEZ
Chart.register(ChartDataLabels);

// Después definís tu función
export function generateChart(data, variableType) {
    const ctx = document.getElementById('frequency-chart').getContext('2d');
    const nombreDeColumna = document.querySelector('#column-name-input').value;

    document.getElementById('frequency-chart').style.display = 'block';

    let labels, chartType, backgroundColors;

    if (variableType === 'cualitativa' || variableType === 'cuantitativa_discreta') {
        labels = data.map(item => item.value);
        chartType = 'pie';
        backgroundColors = labels.map(() => getRandomColor());
    } else if (variableType === 'cuantitativa_continua' || variableType==='cuantitatita_discreta_intervalos') {
        labels = data.map(item => `${item.Li} - ${item.Ls}`);
        chartType = 'bar';
        backgroundColors = 'rgba(153, 102, 255, 0.6)';
    }

    const frequencies = data.map(item => item.frequency);

    if (window.frequencyChart) {
        window.frequencyChart.destroy();
    }

    window.frequencyChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: `Histograma de ${nombreDeColumna}`,
                data: frequencies,
                backgroundColor: backgroundColors,
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Distribución de ${nombreDeColumna}`,
                    font: {
                        size: 18
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const data = context.chart.data.datasets[0].data;
                            const total = data.reduce((acc, curr) => acc + curr, 0);
                            const value = context.raw;
                            return `${value} `;
                        }
                    }
                },
                datalabels: chartType === 'pie' ? {
                    formatter: function(value, context) {
                        const data = context.chart.data.datasets[0].data;
                        const total = data.reduce((acc, curr) => acc + curr, 0);
                        const percentage = (value / total * 100).toFixed(1) + '%';
                        return percentage;
                    },
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    anchor: 'center',
                    align: 'center'
                } : false
            },
            scales: chartType === 'bar' ? {
                x: {
                    title: {
                        display: true,
                        text: nombreDeColumna
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
