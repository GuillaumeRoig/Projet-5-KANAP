//Initialisation du local storage
let productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(productLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart(){
    if (productLocalStorage === null || productLocalStorage === 0) {
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
    // let modifyingQty = document.querySelectorAll(".itemQuantity");
    
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

//Instauration formulaire
function getForm() {
    let form = document.querySelector(".cart__order__form");
    
    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    
    // Ecoute des différentes modification : Prénom, nom, adresses, mail
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });
    
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });
    
    form.address.addEventListener('change', function() {
        validAddress(this);
    });
    
    form.city.addEventListener('change', function() {
        validCity(this);
    });
    
    form.email.addEventListener('change', function() {
        validEmail(this);
    });
    
    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;
        
        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    
    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;
        
        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    
    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;
        
        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    
    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;
        
        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    
    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;
        
        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
}
getForm();


//Envoi des informations client au localstorage
function postForm(){
    const btn_order = document.getElementById("order");
    
    btn_order.addEventListener("click", (event)=>{
        
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');
        
        let idProducts = [];
        for (let i = 0; i<productLocalStorage.length;i++) {
            idProducts.push(productLocalStorage[i].idProduct);
        }
        console.log(idProducts);
        
        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 
        
        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };
    })
}
postForm();





// idProduct: ...,
//         productColor: ..,
//         productQuantity: ...,
//         productName: ...,
//         productPrice: ...
//         productDescription: ...,
//         productImg: ...,
//         altProductImg: ...