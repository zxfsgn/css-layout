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


  arrow[i].addEventListener('click', function (e) {
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



// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();
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

async function CreateUser(email, password) {
  await fetch("http://localhost:5000/api/auth/register/", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password
    })
  })
}

document.forms["registration"].addEventListener("submit", e => {
  e.preventDefault();
  const form = document.forms["registration"];
  const email = form.elements["email"].value;
  const password = form.elements["password"].value;
  CreateUser(email, password)
  document.querySelector('.reg').classList.remove('open')
  document.querySelector('.auth').classList.add('open')
  localStorage.removeItem('password')
  localStorage.removeItem('email')
  logForm.elements["email"].value = email
  logForm.elements["password"].value = password
  logForm.elements['agreement'].checked = false
})

let exit = document.querySelector('.middle-header__exit')
exit.onclick = () => {
  localStorage.removeItem('user')
}

let AdminConfirmed = () => {
  document.querySelector(".middle-header__exit").insertAdjacentHTML("beforebegin", "<a href='editing.html' class='editing'>Редактирование </a>")
  document.forms["registration"].setAttribute('hidden', true)
  document.forms["login"].setAttribute('hidden', true)
  document.querySelector('.middle-header__registr').setAttribute('hidden', true)
  document.querySelector('.middle-header__login').setAttribute('hidden', true)
  exit.style.display = "inline"
}

async function Login(email, password) {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password
    })
  })
  if (response.ok) {
    AdminConfirmed()
    localStorage.setItem('user', 'admin')
  }
}

document.forms["login"].addEventListener("submit", e => {
  e.preventDefault();
  const form = document.forms["login"];
  const email = form.elements["email"].value;
  const password = form.elements["password"].value;
  Login(email, password)
  if (form.elements["agreement"].checked) {
    localStorage.setItem('password', password)
    localStorage.setItem('email', email)
  } else {
    localStorage.removeItem('password')
    localStorage.removeItem('email')
  }
  //if email is contained in localStorage then make autocomplete password
})

let logForm = document.forms["login"]

if (localStorage.getItem('password')) {
  logForm.elements["email"].value = localStorage.getItem('email')
  logForm.elements["password"].value = localStorage.getItem('password')
  logForm.elements['agreement'].checked = true
}

if (localStorage.getItem('user')) {
  AdminConfirmed()
}

async function GetProducts() {
  const response = await fetch("http://localhost:5000/api/products", {
    method: "GET",
    headers: { "Accept": "application/json" }
  })
  if (response.ok) {
    const products = await response.json()
    products.forEach((item) => {
      let template = document.querySelector('.item-product').cloneNode(true)
      template.querySelector('img').setAttribute('src', `http://localhost:5000/${item.img}`)
      template.querySelector('picture > source').setAttribute('srcset', `http://localhost:5000/${item.img}`)
      template.querySelector('.item-product__price > span').innerHTML = item.price
      template.querySelector('.item-product__header').innerHTML = item.name
      document.querySelector('.slider2__wrapper').prepend(template)
    })
  }
}

GetProducts()
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