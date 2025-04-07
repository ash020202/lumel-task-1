export const updateSingleRow = (rows, id, newValue, isPercentage) => {
  // console.log(typeof newValue);
  newValue = Number(newValue);
  return rows.map((row) => {
    let oldValue = parseFloat(row.value);
    if (row.id === id) {
      if (isPercentage) {
        const percentageAmount = row.value * (newValue / 100);
        row.value = row.value + percentageAmount;
        if (row.children) {
          row.children.forEach((child) => {
            const percentToAddInChild = child.value * (newValue / 100);
            let childOldValue = child.value;
            child.value = child.value + percentToAddInChild;
            child.variance = calculateVariance(childOldValue, child.value);
          });
        }
      } else {
        const oldRowValue = parseFloat(row.value);
        row.value = newValue;
        if (row.children) {
          row.children.forEach((child) => {
            let oldChildValue = child.value;
            let childContributinPercent = (oldChildValue / oldRowValue) * 100;
            const valueToAddInChild =
              row.value * (childContributinPercent / 100);
            child.value = valueToAddInChild;
            child.variance = calculateVariance(oldChildValue, child.value);
          });
        }
      }
      row.variance = calculateVariance(oldValue, row.value);
    } else if (row.children) {
      row.children = updateSingleRow(row.children, id, newValue, isPercentage);
      const updatedChildrenValue = row.children.reduce(
        (total, child) => total + child.value,
        0
      );
      if (oldValue !== updatedChildrenValue) {
        row.variance = calculateVariance(oldValue, updatedChildrenValue);
      }
      row.value = updatedChildrenValue;
    }
    return row;
  });
};

const calculateVariance = (originalValue, newValue) => {
  return ((newValue - originalValue) / originalValue) * 100;
};

export const calculateOverallTotal = (rows) => {
  let total = 0;
  rows.forEach((row) => {
    total += row.value;
  });
  return total;
};
