const hamburgerIcon = document.querySelector('.header__menu-btn'),
  sideMenu = document.querySelector('.header__nav--menu'),
  overlay = document.querySelector('.overlay'),
  closeBtn = document.querySelector('.header__close-btn'),
  // mobile slider image
  mobSliderImg = document.getElementsByClassName('slider__img')[1],
  // desktop slider image
  modalSliderImg = document.querySelectorAll('.slider__img')[0],
  // mobile slider arrows
  mobnextBtn = document.querySelectorAll('.arrow--right')[1],
  mobpreBtn = document.querySelectorAll('.arrow--left')[1],
  // desktop slider arrows
  modalnextBtn = document.querySelectorAll('.arrow--right')[0],
  modalPreBtn = document.querySelectorAll('.arrow--left')[0],
  // product inc/dec btns
  decrementBtn = document.querySelector('.decrement-btn'),
  incrementBtn = document.querySelector('.increment-btn'),
  // product slider
  modalImageGallary = document.querySelectorAll('.img--gallary')[0],
  imageGallary = document.querySelectorAll('.img--gallary')[1],
  // modal close btn
  closeModal = document.querySelector('.modal__btn--close'),
  productSlider = document.querySelector('.product--slider'),
  // add cart btn
  addCart = document.querySelector('.product--addcart-btn'),
  headerCart = document.querySelector('.header--cart'),
  emptyMsg = document.querySelector('.cart__msg-empty'),
  cartProduct = document.querySelector('.product--cart-content'),
  cartProducts = document.querySelector('.cart--product-number'),
  productDeleteBtn = document.querySelector('.btn--delete'),
  productContent = document.querySelector('.product--content'),
  prodcutPrice = document.querySelector('.product--price'),
  modal = document.querySelector('.modal')

// product number notification
productNumberNotification = document.querySelector('.products--cart-counter');
cartBtn = document.querySelector('.product--cart-btn')

// slider images
images = [
  '/images/image-product-1.jpg',
  '/images/image-product-2.jpg',
  '/images/image-product-3.jpg',
  '/images/image-product-4.jpg'
];

let imgIndex = 0,
  productQty = document.querySelector('.product--qty');

// show menu on click hamburger btn
hamburgerIcon.addEventListener('click', () => {
  overlay.style.display = 'unset'
  sideMenu.style.inset = '0'
})

// hide menu on click close btn
closeBtn.addEventListener('click', () => {
  sideMenu.style.inset = '0 -250px'
  overlay.style.display = 'none'
})

// mobile next img slider
mobnextBtn.addEventListener('click', () => {
  imgIndex++
  if (imgIndex === 3) {
    imgIndex = 0
    mobSliderImg.style.background = `url(${images[0]})`
  } else {
    mobSliderImg.style.background = `url(${images[imgIndex]})`
  }
})

// mobile previous img slider
mobpreBtn.addEventListener('click', () => {
  if (imgIndex <= 0) {
    imgIndex = 3
    mobSliderImg.style.background = `url(${[images[3]]})`
  } else {
    imgIndex--
    mobSliderImg.style.background = `url(${[images[imgIndex]]})`
  }
})

// product increment btn
incrementBtn.addEventListener('click', () => {
  toString(Number(productQty.value++))
})

// product decrement btn
decrementBtn.addEventListener('click', () => {
  if (productQty.value > '0') {
    toString(Number(productQty.value--))
  } else {
    return;
  }
})

// desktop slider
imageGallary.addEventListener('click', e => {
  let clickedImg = e.target,
    thumbnailImgs = Array.from(imageGallary.children),
    clickedImgId = thumbnailImgs.indexOf(clickedImg)
  if (e.target.nodeName === 'DIV') {
    // enlarge clicked image in slider
    mobSliderImg.style.background = `url(${images[clickedImgId]})`
    // active clicked thumbnail image
    for (i = 0; i < thumbnailImgs.length; i++) {
      if (thumbnailImgs[i].classList.contains('active')) {
        thumbnailImgs[i].classList.remove('active')
        thumbnailImgs[clickedImgId].classList.add('active')
      }
    }
  }
})

// close modal
closeModal.addEventListener('click', () => {
  overlay.style.display = 'none'
  productSlider.style.display = 'none'
})

// modal right arrow
modalnextBtn.addEventListener('click', () => {
  let thumbnailImgs = Array.from(modalImageGallary.children),
    previousId = imgIndex
  imgIndex++;
  let nextId = imgIndex
  if (nextId >= 4) {
    nextId = 0
    imgIndex = 0
    thumbnailImgs[3].classList.remove('active')
    thumbnailImgs[0].classList.add('active')
    modalSliderImg.style.background = `url(${images[0]})`
  } else {
    thumbnailImgs[previousId].classList.remove('active')
    thumbnailImgs[nextId].classList.add('active')
    modalSliderImg.style.background = `url(${images[nextId]})`
  }
})

// modal left arrow
modalPreBtn.addEventListener('click', () => {
  let thumbnailImgs = Array.from(modalImageGallary.children);
  let previousId = imgIndex;
  imgIndex--
  let nextId = imgIndex

  if (previousId <= 0) {
    previousId = 3
    imgIndex = 3
    thumbnailImgs[3].classList.add('active')
    thumbnailImgs[0].classList.remove('active')
    modalSliderImg.style.background = `url(${images[previousId]})`
  } else {
    thumbnailImgs[previousId].classList.remove('active')
    thumbnailImgs[nextId].classList.add('active')
    modalSliderImg.style.background = `url(${images[nextId]})`
  }
})

// add product to cart
addCart.addEventListener('click', () => {
  emptyMsg.style.display = 'none'
  let product = document.createElement('div')
  product.classList.add('product--content')
  product.innerHTML = `
  <div class="cart--product">
  <div class="cart__img--product"></div>
  <div class="product--cart-info">
  <p class="product--cart-title">
                Autumn Limited Edition...
              </p>
              <p class="product--cart-details">
                <span class="cart--product-price">125.00 x</span>
                <span class="cart--product-number">${productQty.value == 0 ? productQty.value = 1 : productQty.value}</span>
                <span class="cart--product-total">$${parseFloat(productQty.value * 125).toFixed(2)}</span>
              </p>
            </div>
            <button type="button" class="btn btn--delete" onclick='removeProduct()'>
              <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                  <path
                    d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                    id="a"></path>
                </defs>
                <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"></use>
              </svg>
            </button>
          </div>
          <button type="button" class="btn primary btn--checkout">checkout</button>
        `
  if (cartProduct.children.length === 0) {
    cartProduct.appendChild(product);
    cartProduct.style.display = 'flex'
    productNumberNotification.style.display = 'block'
    productNumberNotification.innerText = productQty.value;
    productQty.value = 0;
  } else {
    productNumberNotification.style.display = 'none'
    return null
  }
})

// delete product from cart
let removeProduct = function () {
  cartProduct.children[0].remove()
  cartProduct.style.display = 'none'
  emptyMsg.style.display = 'flex'
  productNumberNotification.style.display = 'none'
}

// toggle cart menu
cartBtn.addEventListener('click', () => {
  headerCart.classList.toggle('hide')
})

// enlarge slider image on desktop version only
mobSliderImg.addEventListener('click', () => {
  if (window.innerWidth >= 1440) {
    modal.style.display = 'flex'
    overlay.style.display = 'flex'
  }
})