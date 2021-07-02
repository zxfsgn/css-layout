scroll = document.querySelector('.scroll')

window.addEventListener('scroll', (e) => {
  if (window.pageYOffset > 300) {
    scroll.classList.add('visible')
  }
  if (window.pageYOffset < 300) {
    scroll.classList.remove('visible')
  }
})

scroll.addEventListener('click', (e) => {
  window.scrollTo(0, 0)
})