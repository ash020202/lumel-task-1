export const updateSingleRow = (rows, id, newValue, isPercentage) => {
  return rows.map((row) => {
    var oldValue = row.value;
    if (row.id === id) {
      if (isPercentage) {
        row.value = row.value + row.value * (newValue / 100);
        if (row.children) {
          row.children.map((child) => {
            const percentToAddInChild = Number(child.value * (newValue / 100));
            let childOldValue = child.value;
            child.value += percentToAddInChild;
            child.variance = calculateVariance(childOldValue, child.value);
          });
        }
      } else {
        const oldRowValue = row.value;
        row.value = newValue;
        if (row.children) {
          row.children.map((child) => {
            let oldChildValue = child.value;
            let childContributinPercent = (oldChildValue / oldRowValue) * 100;
            const valueToAddInChild =
              row.value * (childContributinPercent / 100);
            child.value = valueToAddInChild.toFixed(2);
            console.log(oldChildValue, Number(child.value));

            child.variance = calculateVariance(
              oldChildValue,
              Number(child.value)
            );
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
      row.value = updatedChildrenValue;
      row.variance = calculateVariance(oldValue, row.value);
    }
    return row;
  });
};

const calculateVariance = (originalValue, newValue) => {
  return ((newValue - originalValue) / originalValue) * 100;
};
