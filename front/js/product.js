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
    .then(async function (resultApi) {
        item = await resultApi;
        console.table(item);
        if (item){
            getPost(item);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}

function getPost(item){

    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = item.imageUrl;
    productImg.alt = item.altTxt;

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
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(item);
}