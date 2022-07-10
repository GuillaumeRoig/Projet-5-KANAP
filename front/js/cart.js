//Initialisation du local storage
let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
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
            attachRemoveEventToButton(deleteProduct);
            productItemContentSettingsDelete.appendChild(deleteProduct);
        })
    }
}
getCart();

// Attacher l'évènement au bouton supprimer

function attachRemoveEventToButton(_deleteProduct){
    console.log(_deleteProduct);
    const couchDelete = document.querySelectorAll(".cart__item .deleteItem");
    
    couchDelete.forEach((couchDelete) => {
        couchDelete.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("panierRéservé"));
            console.log(couchDelete);
            for (let i = 0, c = cart.length; i < c; i++)
            if (
                cart[i]._id === couchDelete.dataset.id &&
                cart[i].couleur === couchDelete.dataset.couleur
                ) {
                    const num = [i];
                    let newCart = JSON.parse(localStorage.getItem("panierRéservé"));
                    newCart.splice(num, 1);
                    if (newCart && newCart.length == 0) {
                        document.querySelector("#totalQuantity").innerHTML = "0";
                        document.querySelector("#totalPrice").innerHTML = "0";
                        document.querySelector("h1").innerHTML =
                        "Vous n'avez pas d'article dans votre panier";
                    }
                    localStorage.panierRéservé = JSON.stringify(newCart);
                    totalProduct();
                    return location.reload();
                }
            }
            );
        }
        );
}









// idProduct: ...,
//         productColor: ..,
//         productQuantity: ...,
//         productName: ...,
//         productPrice: ...
//         productDescription: ...,
//         productImg: ...,
//         altProductImg: ...