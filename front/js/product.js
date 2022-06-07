// http://localhost:3000/api/products/055743915a544fde83cfdfc904935ee7
// {"colors":["Green","Red","Orange"],"_id":"055743915a544fde83cfdfc904935ee7","name":"Kanap Calycé","price":3199,"imageUrl":"http://localhost:3000/images/kanap03.jpeg","description":"Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.","altTxt":"Photo d'un canapé d'angle, vert, trois places"}

let str = window.location.href;
let url = new URL(str);
let idCouch = URLSearchParams.get("id");
console.log(idCouch);

// Récupération des informations des produits dans l'API

async function getCouchDataList() {
    let couchDataList = await fetch("http://localhost:3000/api/products" + idCouch);
    return await couchDataList.json();
}

// A partir des éléments de mon API, je vais créer le contenu des pages pour mes différents canapés. (Img, titre, prix...)

async function pageContent() {
    let couchDataList = await getCouchDataList();
    couchDataList.forEach(couch => {

// Ajout de l'image

let couchImage = document.createElement("img");
couchImage.src = couch.imageUrl;
couchImage.alt = couch.altTxt;
document.querySelector("#item__img").appendChild(couchImage);

// Création du titre "h1"

let couchTitle = document.getElementById('title');
couchTitle.innerHTML = couch.name;

// Ajout du prix

let couchPrice = document.getElementById('price');
couchPrice.innerHTML = couch.price;

// Création de la description

let couchDescription = document.getElementById('description');
couchDescription.innerHTML = couch.description;

// Ajout des options de couleurs

for (let colors of couch.colors){
    console.table(colors);
    let couchColors = document.createElement("option");
    couchColors.value = colors;
    couchColors.innerHTML = colors;
    document.querySelector("#colors").appendChild(couchColors);
}
})
}

pageContent();