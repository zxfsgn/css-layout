let popup = document.querySelector('.auth')
let popup2 = document.querySelector('.reg')
let link = document.querySelector('.middle-header__login')
let link2 = document.querySelector('.middle-header__registr')


link.addEventListener('click', (e) => {
  e.preventDefault()
  popup.classList.add('open')
})

document.addEventListener('click', (e) => {
  if (!e.target.closest('.auth') && e.target != link) {
    popup.classList.remove('open')
  }
})

link2.addEventListener('click', (e) => {
  e.preventDefault()
  popup2.classList.add('open')
})

document.addEventListener('click', (e) => {
  if (!e.target.closest('.reg__body') && e.target != link2) {
    popup2.classList.remove('open')
  }
})