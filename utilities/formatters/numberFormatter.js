export default (value, setter) => {
  const newValue = value
      .replace(/[^\d,+]/g, '');
  setter(newValue);
  return newValue;
};
