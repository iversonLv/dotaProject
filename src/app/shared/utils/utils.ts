export const getFieldsLocal = (data, field, fieldDescription): any => {
  let grabDataValuesAsArry = [];
  grabDataValuesAsArry = Object.values(data);
  const descriptionMatchedArr = grabDataValuesAsArry.filter(i => i.name.slice(11) === field);
  fieldDescription = descriptionMatchedArr[0].description;
};
