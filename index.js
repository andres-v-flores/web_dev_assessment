import product from './product.js';
// the thing that will be loaded
/************ For Image Carousel **************/
let currDisplay = document.querySelector('.image-carousel-card');
let carImages = document.querySelectorAll('.carousel-img');
let leftArrow = document.getElementById('left-arrow');
let rightArrow = document.getElementById('right-arrow');
let currentImage = 1;
// current image for the carousel
let step = carImages[0].clientWidth; 
// get the current widht of an image to move
window.addEventListener('resize', () => {
    step = carImages[0].clientWidth;
})

currDisplay.style.transform = 'translateX(' + (-step * (currentImage)) + "px )";
rightArrow.addEventListener('click', rightClick);
leftArrow.addEventListener('click',leftClick);
function rightClick(){
    if(currentImage >=5){return}
    currentImage++;
    currDisplay.style.transform = 'translateX(' + (-step * currentImage) + "px )";
}
function leftClick(){
    if(currentImage <= 0){return}
    currentImage--;
    currDisplay.style.transform = 'translateX(' + (-step * currentImage) + "px )";
}

let modal = document.getElementById('shop-cart');
modal.addEventListener('click', showCart);
let shop = document.getElementById("shop-section");
// target the div that will display the product
let cart = {};
// if cx adds to cart item will display here
let show = false;
let cartCount = document.getElementById("cart-count")
let cartItems = 0;
// show number of items added to cart

/************ For Product Display **************/
for (let i = 0; i<product.length; i++){
    // loop through the whole inventory
    let cardItem = document.createElement("div");
    cardItem.classList.add('card');
    // create div with a class of card


    let imgContainer = document.createElement('div');
    imgContainer.classList.add("image-container");
    // create div with a class of image-container that will hold images

    if (product[i]["special"]){
        let specImg = document.createElement("img");
        specImg.src = product[i]["specImg"];
        specImg.classList.add("promo-sticker")
        if (product[i]["specImg"] === "./images/new.png"){
            specImg.classList.add("new");
        }
        imgContainer.appendChild(specImg);
    }
    // check if product has a special deal

    let cardImg = document.createElement("img");
    cardImg.src = product[i]['imgSrc'];
    cardImg.classList.add("card-image")
    // create img with source accourding to object
    imgContainer.appendChild(cardImg);
    // add cardimg as a child of imgContainer

    cardItem.appendChild(imgContainer);
    // add the imgcontainer as a child of cardItem

    let cardTitle = document.createElement("h3");
    cardTitle.classList.add('card-title');
    cardTitle.appendChild(document.createTextNode(product[i]["name"]));
    // create an h3 element of the card title and ad its title name
    cardItem.appendChild(cardTitle);
    // add cardTitle as a child of cardItem

    let cardPriceCont = document.createElement('div');
    cardPriceCont.classList.add("card-price-buy");
    // create a div with a class card-price-buy to hold price and button

    let cardPrice = document.createElement('h4');
    cardPrice.classList.add('card-price');
    cardPrice.appendChild(document.createTextNode("₱ "+ product[i]["price"] +".00"));
    cardPriceCont.appendChild(cardPrice);
    // create an h4 element with a class of card-price and the text will be on the value of product[n]['price']
    // add the title as a child
    cardItem.appendChild(cardPriceCont);
    // add the cardpricecont as a child of cardItem

    let cardBtn = document.createElement('button');
    cardBtn.classList.add("card-btn");
    cardBtn.value = i.toString();
    cardBtn.appendChild(document.createTextNode("Order"));
    cardBtn.addEventListener('click', displayClick);
    // create a button element with a class of card-btn and a text of Order
    cardPriceCont.appendChild(cardBtn);
    // add the cardbtn as a child 
    shop.appendChild(cardItem);
    // add the whole card to the shop-section
}

/************ For Adding Products  to cart **************/
function displayClick(e) {
    let trigger = product[e.target.value]['name']
    cartItems++;
    cartCount.innerHTML = cartItems;
    cartCount.classList.remove('none');
    if (cart.hasOwnProperty(trigger)){
        cart[trigger].count += 1;
    } else{
        cart[trigger] = {"count": 1, 'imgSrc': product[e.target.value]["imgSrc"], 'price':product[e.target.value]['price']};
    }
}
// the display will be added an the shop list per click
// but cx doesnt know until check out

/************ For Checking out Items from cart **************/
function showCart(){
    if (cartItems === 0){return};
    // if there is no item in cart dont display
    let modalView = document.getElementById('modal-view');
    let shopList = document.getElementById('shop-list');
    modalView.classList.toggle('none');
    let cartKeys = Object.keys(cart);
    if (!show){
        // generate added to cart
        let priceTag = document.getElementById('total-price');
        let totalAmt = 0;
        for ( let i = 0; i< cartKeys.length; i++){
            let card = document.createElement('div');
            card.classList.add('col-card');
            card.id = cartKeys[i];
            // create a card for modal with a class of col-card and an id of the key
            let imgModal = document.createElement('img');
            imgModal.src = cart[cartKeys[i]]["imgSrc"];
            imgModal.classList.add('modal-img');
            card.appendChild(imgModal);
            // create card img with src and class then append as child of card
            let itemTitle = document.createElement('h5');
            itemTitle.appendChild(document.createTextNode(cartKeys[i]));
            itemTitle.classList.add("modal-title");
            card.appendChild(itemTitle);
            // the key will be the name of the item
            let numItem = document.createElement('h5');
            let numbering = cart[cartKeys[i]]["count"];
            numItem.appendChild(document.createTextNode(cart[cartKeys[i]]["count"]+"x"));
            numItem.classList.add("modal-title");
            card.appendChild(numItem);
            // instead of repeating the item on checkout just get the number of repeated item
            // append the num of peices as a child of card
            let priceItem = document.createElement('h5');
            let pricing = cart[cartKeys[i]]['price']
            let totalPriceSticker = pricing * numbering;
            priceItem.appendChild(document.createTextNode("₱ "+ pricing + ".00"));
            priceItem.classList.add('modal-title');
            card.appendChild(priceItem);
            // get total number by multiplying num of pieces and price of item
            totalAmt += totalPriceSticker;
            shopList.appendChild(card);
        } 
        priceTag.innerHTML = "₱ " + totalAmt + ".00";
        // create a div
        // 
    } else {
        // remove all element generated
        for(let i =0; i<cartKeys.length; i++){
            let modalItem = document.getElementById(cartKeys[i]);
            modalItem.remove();
        }
        console.log('closing modal')
    }
    show = !show;
    
}

