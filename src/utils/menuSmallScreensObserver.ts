
const modalWindowTracker = (width, text) => {
    const menu = document.getElementById('menu');
    const modal = document.getElementById('modal');
    if (menu !== null && text === 'open' && width < 650) {
      console.log('inn 1')
      menu.style.display = 'none'
    } else if (menu !== null && text === 'close') {
      console.log('inn 2')
      menu.style.display = 'initial'
    }

  }

  export default modalWindowTracker