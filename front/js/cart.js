//Initialisation du local storage
let productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(productLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart(){
    if (productLocalStorage === null || productLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
        productLocalStorage.forEach(product => {
            console.log(product);
            // Insertion de l'élément "article"
            let productItem = document.createElement("article");
            productItem.className = "cart__item";
            productItem.setAttribute('data-id', product.idProduct);
            document.querySelector("#cart__items").appendChild(productItem);
            
            // Insertion de l'élément "div"
            let productDivImg = document.createElement("div");
            productDivImg.className = "cart__item__img";
            productItem.appendChild(productDivImg);
            
            // Insertion de l'image
            let productImg = document.createElement("img");
            productImg.src = product.productImg;
            productImg.alt = product.altProductImg;
            productDivImg.appendChild(productImg);
            console.log(productImg);
            // Insertion de l'élément "div"
            let productItemContent = document.createElement("div");
            productItemContent.className = "cart__item__content";
            productItem.appendChild(productItemContent);
            
            // Insertion de l'élément "div"
            let productItemContentTitlePrice = document.createElement("div");
            productItemContentTitlePrice.className = "cart__item__content__titlePrice";
            productItemContent.appendChild(productItemContentTitlePrice);
            
            // Insertion du titre h3
            let productTitle = document.createElement("h2");
            productTitle.innerHTML = product.productName;
            productItemContentTitlePrice.appendChild(productTitle);
            
            // Insertion de la couleur
            let productColor = document.createElement("p");
            productColor.innerHTML = product.productColor;
            productTitle.appendChild(productColor);
            
            // Insertion du prix
            let productPrice = document.createElement("p");
            productPrice.innerHTML = product.productPrice + "€";
            productItemContentTitlePrice.appendChild(productPrice);
            
            // Insertion de l'élément "div"
            let productItemContentSettings = document.createElement("div");
            productItemContentSettings.className = "cart__item__content__settings";
            productItemContent.appendChild(productItemContentSettings);
            
            // Insertion de l'élément "div"
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            
            // Insertion de "Qté : "
            let productQty = document.createElement("p");
            productQty.innerHTML = "Qté : ";
            productItemContentSettingsQuantity.appendChild(productQty);
            
            // Insertion de la quantité
            let productQuantity = document.createElement("input");
            productQuantity.value = product.productQuantity;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");
            productItemContentSettingsQuantity.appendChild(productQuantity);
            
            // Insertion de l'élément "div"
            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
            
            // Insertion de "p" supprimer
            let deleteProduct = document.createElement("p");
            deleteProduct.className = "deleteItem";
            deleteProduct.innerHTML = "Supprimer";
            attachRemoveEventToButton(deleteProduct, product.idProduct, product.productColor);
            productItemContentSettingsDelete.appendChild(deleteProduct);
        })
    }
}
getCart();

// Attacher l'évènement au bouton supprimer

function attachRemoveEventToButton(_deleteProduct, _idProduct, _productColor) {
    console.log(_deleteProduct);
    
    // couchDelete.forEach((couchDelete) => {
    _deleteProduct.addEventListener("click", () => {
        
        let cart = JSON.parse(localStorage.getItem("product"));
        console.log(cart);
        
        // const tableau = [ "string1", "string2" ];
        // tableau.forEach( (tata, toto) => {
        //     console.log("element du tableau => ", tata)
        //     console.log("index du tableau => ", toto)
        // } )


        cart.forEach((element, i) => {
            console.log(element)
            if (element.idProduct === _idProduct &&
                element.productColor === _productColor)
                {
                    const num = [i];
                    cart.splice(num, 1);
                    localStorage.setItem("product", JSON.stringify(cart));
                    location.reload();
                }
                

        })
    });
}

// Récupérer le prix total des canapés ainsi que le total des quantités 

function getTotals(){
    
    // Total des quantités
    let couchQuantity = document.getElementsByClassName('itemQuantity');
    let myLength = couchQuantity.length,
    totalQuantity = 0;
    
    for (let i = 0; i < myLength; ++i) {
        totalQuantity += couchQuantity[i].valueAsNumber;
        
    }
    
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQuantity;
    
    // Prix total    
    totalPrice = 0;
    
    for (let i = 0; i < myLength; ++i) {
        totalPrice += (couchQuantity[i].valueAsNumber * productLocalStorage[i].productPrice);
    }
    
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}
getTotals();

// Modification de la quantité d'un produit
function modifyingQuantity() {
    let modifyingQty = document.querySelectorAll(".itemQuantity");
    
    for (let k = 0; k < modifyingQty.length; k++){
        modifyingQty[k].addEventListener("change" , (event) => {
            event.preventDefault();
            
            let modifyingElement = productLocalStorage[k].productQuantity;
            let modifyingValue = modifyingQty[k].valueAsNumber;
            
            const resultFind = productLocalStorage.find((el) => el.modifyingValue !== modifyingElement);
            
            resultFind.productQuantity = modifyingValue;
            productLocalStorage[k].productQuantity = resultFind.productQuantity;
            
            localStorage.setItem("product", JSON.stringify(productLocalStorage));
            location.reload();
        })
    }
}
modifyingQuantity();





// idProduct: ...,
//         productColor: ..,
//         productQuantity: ...,
//         productName: ...,
//         productPrice: ...
//         productDescription: ...,
//         productImg: ...,
//         altProductImg: ...