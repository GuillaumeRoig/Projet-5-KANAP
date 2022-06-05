let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
console.log(idProduct);
let item = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getItem();

// Récupération des articles de l'API
function getItem() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(function (resultApi) {
        console.table(resultApi);
        getPost(resultApi);
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}

function getPost(item){
    if (!item) {
        return;
    }

    // Insertion de l'image
    let productImg = document.createElement("img");
    productImg.src = item.imageUrl;
    productImg.alt = item.altTxt;
    document.querySelector(".item__img").appendChild(productImg);

    // Modification du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = item.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = item.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = item.description;

    // Insertion des options de couleurs
    for (let colors of item.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        productColors.value = colors;
        productColors.innerHTML = colors;
        document.querySelector("#colors").appendChild(productColors);
    }
    addToCart(item);
}

//Gestion du panier
function addToCart(item) {
    const btn_addToCart = document.querySelector("#addToCart");

    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    btn_addToCart.addEventListener("click", (event)=>{
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

    //Recupération du choix de la couleur
    let colorChoice = colorPicked.value;
                
    //Recupération du choix de la quantité
    let quantityChoice = quantityPicked.value;

    //Récupération des options de l'article à ajouter au panier
    let productOptions = {
        idProduit: item._id,
        productColor: colorChoice,
        productQuantity: Number(quantityChoice),
        productName: item.name,
        productPrice: item.price,
        productDescription: item.description,
        productImg: item.imageUrl,
        altProductImg: item.altTxt
    };

    //Initialisation du local storage
    let productLocalStorage = JSON.parse(localStorage.getItem("produit"));

    //fenêtre pop-up
    const popupConfirmation =() =>{
        if(window.confirm(`Votre commande de ${quantityChoice} ${item.name} ${colorChoice} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    //Importation dans le local storage

    //Si le panier comporte déjà au moins 1 article
    if (productLocalStorage) {
    const resultFind = productLocalStorage.find(
        (el) => el.idProduit === idProduct && el.productColor === colorChoice);
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
            let newQuantity =
            parseInt(productOptions.productQuantity) + parseInt(resultFind.productQuantity);
            resultFind.productQuantity = newQuantity;
            localStorage.setItem("produit", JSON.stringify(productLocalStorage));
            console.table(productLocalStorage);
            popupConfirmation();
        //Si le produit commandé n'est pas dans le panier
        } else {
            productLocalStorage.push(productOptions);
            localStorage.setItem("produit", JSON.stringify(productLocalStorage));
            console.table(productLocalStorage);
            popupConfirmation();
        }
    //Si le panier est vide
    } else {
        productLocalStorage =[];
        productLocalStorage.push(productOptions);
        localStorage.setItem("produit", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
        popupConfirmation();
    }}
    });
}