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
        article = await resultApi;
        console.table(item);
        if (item){
            getPost(item);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}