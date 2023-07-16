var product = {
  plainBurger: {
    name: "Гамбургер простой",
    cost: 10000,
    kcall: 400,
    amount: 0,
    get summ() {
      return this.cost * this.amount;
    },
    get sumkcall() {
      return this.kcall * this.amount;
    },
  },
  freshBurger: {
    name: "Гамбургер FRESH",
    cost: 20500,
    kcall: 500,
    amount: 0,
    get summ() {
      return this.cost * this.amount;
    },
    get sumkcall() {
      return this.kcall * this.amount;
    },
  },
  freshCombo: {
    name: "FRESH COMBO",
    cost: 31900,
    kcall: 700,
    amount: 0,
    get summ() {
      return this.cost * this.amount;
    },
    get sumkcall() {
      return this.kcall * this.amount;
    },
  },
};

var extraProduct = {
  doubleMayonnaise: {
    name: 'Двойной майонез',
    cost: 500,
    kcall: 60,
  },
  lettuce: {
    name: 'Салатный лист',
    cost: 300,
    kcall: 20,
  },
  cheese: {
    name: 'Сыр',
    cost: 700,
    kcall: 100,
  },
}


const btns = document.querySelectorAll('.main__product-btn');

btns.forEach(el => {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    add(this);
  })
})

// el.getAttribute('name') - Вернет значение атрибута
// el.setAttribute('name', value) - Добавит атрибут и значение для него
// el.hasAttribute('name') - Проверяет наличие атрибута
// el.removeAttribute('name') - Удалит атрибут

function add(btn) {
  let simbol = btn.getAttribute('data-symbol');
  let parent = btn.closest('.main__product');
  let parentId = parent.getAttribute('id');

  if (simbol == '+') {
    product[parentId].amount++;
  } else if (product[parentId].amount > 0) {
    product[parentId].amount--;
  }

  let productNum = parent.querySelector('.main__product-num');
  let productPrice = parent.querySelector('.main__product-price span');
  let productKcall = parent.querySelector('.main__product-kcall span');

  productNum.innerHTML = product[parentId].amount;
  productPrice.innerHTML = product[parentId].summ;
  productKcall.innerHTML = product[parentId].sumkcall;
}

const productCheckbox = document.querySelectorAll('.main__product-checkbox');

productCheckbox.forEach(el => {
  el.addEventListener('click', function () {
    addIngredient(this);
  })
})

function addIngredient(checkbox) {
  let parent = checkbox.closest('.main__product');
  let parenId = parent.getAttribute('id');
  let checkboxId = checkbox.getAttribute('data-extra');
  let checked = checkbox.checked;

  product[parenId][checkboxId] = checked;

  if (product[parenId][checkboxId] == true) {
    product[parenId].cost += extraProduct[checkboxId].cost;
    product[parenId].kcall += extraProduct[checkboxId].kcall;
  } else {
    product[parenId].cost -= extraProduct[checkboxId].cost;
    product[parenId].kcall -= extraProduct[checkboxId].kcall;
  }

  let productPrice = parent.querySelector('.main__product-price span');
  let productKcall = parent.querySelector('.main__product-kcall span');

  productPrice.innerHTML = product[parenId].summ;
  productKcall.innerHTML = product[parenId].sumkcall;

}


const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const windowOut = document.querySelector('.receipt__window-out');
const windowBtn = document.querySelector('.receipt__window-btn');

let arrProduct = [];
let totalName = '';
let totalKcall = null;
let totalPrice = 9000;

addCart.addEventListener('click', () => {

  for (const key in product) {

    let el = product[key];

    if (el.amount > 0) {
      arrProduct.push(el);

      for (const key2 in el) {
        if (el[key2] === true) {
          el.name += "\n" + extraProduct[key2].name;
        }
      }

    }


  }

  arrProduct.forEach(item => {
    totalName += '\n' + item.name + "\n" + `В количестве: ${item.amount} шт.\n`
    totalPrice += item.summ;
    totalKcall += item.sumkcall;
  })

  windowOut.innerHTML = `Вы заказали: \n${totalName}\nОбщая калорийность: ${totalKcall}\nОбщая стоимость с доставкой 9000 т: ${totalPrice} сумм`

  if (arrProduct.length > 0) {

    receipt.style.display = 'flex';

    setTimeout(() => {
      receipt.style.opacity = 1;
      receiptWindow.style.top = '50%';
      receiptWindow.style.transform = 'translateY(-50%)';
    }, 100);
    document.body.style.overflow = 'hidden';

    let productNum = document.querySelectorAll('.main__product-num');
    let productPrice = document.querySelectorAll('.main__product-price span');
    let productKcall = document.querySelectorAll('.main__product-kcall span');

    console.log(productNum);

    productNum.forEach((el, i) => {
      el.innerHTML = 0;
      productPrice[i].innerHTML = 0;
      productKcall[i].innerHTML = 0;
    });
  }
});

windowBtn.addEventListener('click', () => {
  window.location.reload()
})


let timerExtra = document.querySelector('.header__timer-extra');

function start(time) {

  setTimeout(() => {

    if (timerExtra.innerHTML >= 0 && timerExtra.innerHTML < 50) {
      timerExtra.innerHTML++
      start(10)
    }
    else if (timerExtra.innerHTML >= 50 && timerExtra.innerHTML < 70) {
      timerExtra.innerHTML++
      start(50)
    }
    else if (timerExtra.innerHTML >= 70 && timerExtra.innerHTML < 90) {
      timerExtra.innerHTML++
      start(80)
    }
    else if (timerExtra.innerHTML >= 90 && timerExtra.innerHTML < 97) {
      timerExtra.innerHTML++
      start(130)
    }
    else if (timerExtra.innerHTML >= 97 && timerExtra.innerHTML < 100) {
      timerExtra.innerHTML++
      start(200)
    }

  }, time);

}

start()

const productInfo = document.querySelectorAll('.main__product-info');
const view = document.querySelector('.view');
const viewImg = document.querySelector('.view img');
const viewClose = document.querySelector('.view__close');

productInfo.forEach(el => {
  el.addEventListener('dblclick', function (){
    openImg(this)
  })
})

function openImg(item) {  
  view.classList.add('active');
  let img = item.querySelector('.main__product-info img');
  let imgSrc = img.getAttribute('src');
  viewImg.setAttribute('src', imgSrc);
}

viewClose.addEventListener('click', ()=> {
  view.classList.remove('active');
})