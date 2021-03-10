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

//Burger
$(document).ready(function () {
  $('.icon-menu').click(function (event) {
    $('.icon-menu, .menu__list').toggleClass('_active');
    $('header').toggleClass('_lock');
  });
});

@@include('files/dynamic_adapt.js', {})
@@include('files/slider.js', {})