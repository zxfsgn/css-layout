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

    breakpoints: {
        320: {

        },
    }

});

new Swiper('.products__slider')
