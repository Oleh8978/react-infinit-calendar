export default (sum, isInteger = false) => sum
  ?.toString()
  .replace(/(\.\d{1,2})\d*/g, isInteger ? '' : '$1')
  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0; // 1500.3498 => 1,500.34
