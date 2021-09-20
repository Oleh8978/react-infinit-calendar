export default (value, setter = (v) => v) => {
  const newValue = value.replace(/\D/g, '').match(/\d{0,5}/);
  setter(newValue[0]);
  return newValue[0];
};
