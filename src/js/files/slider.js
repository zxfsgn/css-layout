new Swiper('.introducing__slider', {

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  pagination: {
    el: '.swiper-pagination',

    clickable: true,
  },

  spaceBetween: 0,

  /*    autoplay: {
  
          delay: 5000,
      }*/

  speed: 500,

  effect: 'fade',

});

new Swiper('.slider2', {

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  spaceBetween: 30,

  slidesPerView: 1,

  slidesPerGroup: 1,

  breakpoints: {
    453: {
      slidesPerView: 2,
    },
    723: {
      slidesPerGroup: 2,
      slidesPerView: 3,
    },
    943: {
      slidesPerView: 4,
    },
  },

  speed: 500,
})

new Swiper('.slider3', {

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  freeMode: true,

  speed: 500,
})
