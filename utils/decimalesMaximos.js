export function getMaxDecimals(dataArray) {
  let maxDecimals = 0;

  dataArray.forEach(value => {
    if (value !== null && value !== undefined && !isNaN(value)) {
      const valueStr = value.toString();
      if (valueStr.includes('.')) {
        const decimals = valueStr.split('.')[1].length;
        if (decimals > maxDecimals) {
          maxDecimals = decimals;
        }
      }
    }
  });

  return maxDecimals;
}
