function testWebP(callback) {

  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});


const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__list');
if (iconMenu) {
  iconMenu.addEventListener('click', e => {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  })
};

let arrow = document.querySelectorAll('.arrow');

for (i = 0; i < arrow.length; i++) {
  let thisLink = arrow[i].previousElementSibling;
  let subMenu = arrow[i].nextElementSibling;
  let thisArrow = arrow[i];

  thisArrow.onmousedown = function (event) {
    event.preventDefault();
  }
  thisLink.classList.add('parent');
  arrow[i].addEventListener('click', function () {
    subMenu.classList.toggle('open');
    thisArrow.classList.toggle('active');
  });

}
window.addEventListener("click", e => {
  if (!e.target.classList.contains('active')) {
    for (i = 0; i < arrow.length; i++) {
      let subMenu = arrow[i].nextElementSibling;
      if (subMenu.classList.contains('open')) {
        subMenu.classList.remove('open');
        arrow[i].classList.remove('active');
      }
    }
  }
}, true)


@@include('files/dynamic_adapt.js', {})
@@include('files/slider.js', {})
@@include('./serverInteraction.js', {})