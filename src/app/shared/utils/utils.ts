export const getFieldsLocal = (data, field, fieldDescription): any => {
  let grabDataValuesAsArry = [];
  grabDataValuesAsArry = Object.values(data);
  const descriptionMatchedArr = grabDataValuesAsArry.filter(
    (i) => i.name.slice(11) === field
  );
  fieldDescription = descriptionMatchedArr[0].description;
};

export const isString = (value): boolean => {
  return typeof value === 'string';
};
export const isArray = (value: any): boolean => {
  return Array.isArray(value);
};
