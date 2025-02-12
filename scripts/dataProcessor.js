export function processData(dataArray, variableType) {
    const frequencyMap = {};

    dataArray.forEach(item => {
        let value = item;
        if (variableType === 'cuantitativa_discreta' || variableType === 'cuantitativa_continua') {
            value = parseFloat(item);
            if (isNaN(value)) return;
        }
        frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });

    const sortedData = Object.keys(frequencyMap).sort((a, b) => {
        if (variableType.startsWith('cuantitativa')) {
            return parseFloat(a) - parseFloat(b);
        } else {
            return a.localeCompare(b);
        }
    });

    let cumulativeFrequency = 0;
    const result = sortedData.map(value => {
        cumulativeFrequency += frequencyMap[value];
        return {
            value,
            frequency: frequencyMap[value],
            cumulative: cumulativeFrequency
        };
    });

    return result;
}
