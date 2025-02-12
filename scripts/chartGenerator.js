export function generateChart(data) {
    const ctx = document.getElementById('frequency-chart').getContext('2d');
    document.getElementById('frequency-chart').style.display = 'block';

    const labels = data.map(item => item.value);
    const frequencies = data.map(item => item.frequency);

    if (window.frequencyChart) {
        window.frequencyChart.destroy();
    }

    window.frequencyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Frecuencia Absoluta',
                data: frequencies,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
