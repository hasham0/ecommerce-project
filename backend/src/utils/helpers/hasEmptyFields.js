const hasEmptyFields = (...fields) =>
  fields.some((item) => typeof item === "string" && item.trim() === "");

export default hasEmptyFields;
