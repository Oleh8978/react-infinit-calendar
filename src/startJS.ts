export const startJs = () => {
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    const vhFull = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vhFull', `${vhFull}px`);
  });
  window.addEventListener('DOMContentLoaded', () => {
    const vh = window.innerHeight * 0.01;
    const vhFull = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vhFull', `${vhFull}px`);
  });
};
