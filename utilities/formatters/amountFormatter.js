export default (value, setter, fraction = 2) => {
  const newValue = value
      .replace(',', '.')
      .replace(/[^/.\d]/, '')
      .replace(/\.\d+/, (match) => match.slice(0, fraction + 1));
  setter(newValue);
  return newValue;
};
