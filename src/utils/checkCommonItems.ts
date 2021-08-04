export const checkCommonItems = function <type = string>(
  arr1: type[],
  arr2: type[],
) {
  if (arr2.length === 0) return true;
  return arr1.some((item) => arr2.includes(item));
};
