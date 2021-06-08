export const compareArrays = function<t>(array1?: t[], array2?: t[]) {
  // if the other array is a falsy value, return
  if (!array1 || !array2)
    return false;

  // compare lengths - can save a lot of time
  if (array1.length !== array2.length)
    return false;

  for (let i = 0, l = array1.length; i < l; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}