export const concatWithUnique = function concatArrayWithUnique<TypeElement>(
  arr1: TypeElement[],
  arr2: TypeElement[],
  property?: string,
  concatItems?: boolean
) {
  const uniqueArray: any[] = [...arr1, ...arr2];
  if (Array.isArray(uniqueArray) && uniqueArray.length) {
    if (property) {
      return Array.from(new Set(uniqueArray.map((i) => i[property]))).map(
        (itemProperty) => {
          if (concatItems) {
            return uniqueArray
              .filter((i) => i[property] === itemProperty)
              .reduce(
                (accumulator, currentValue) => {
                  return {
                  ...accumulator,
                  ...currentValue,
                  }
                },
                {
                  [property]: itemProperty,
                }
              );
          }
          let findObject, index = uniqueArray.length - 1;
          for (; index >= 0; index--) {
            if (uniqueArray[index][property] === itemProperty) {
              findObject = uniqueArray[index];
              break;
            }
          }
          return {
            [property]: itemProperty,
            ...findObject,
          };
        }
      );
    }

    return uniqueArray.filter(
      (value, index, self) => self.indexOf(value) === index
    );
  }
  return uniqueArray;
};