// http://localhost:3000/api/products/055743915a544fde83cfdfc904935ee7
// {"colors":["Green","Red","Orange"],"_id":"055743915a544fde83cfdfc904935ee7","name":"Kanap Calycé","price":3199,"imageUrl":"http://localhost:3000/images/kanap03.jpeg","description":"Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.","altTxt":"Photo d'un canapé d'angle, vert, trois places"}

let str = window.location.href;
let url = new URL(str);
let idCouch = url.searchParams.get("id");
console.log(idCouch);

// Récupération des informations des produits dans l'API

async function getCouchData() {
  let couchData = await fetch(`http://localhost:3000/api/products/${idCouch}`);
  return await couchData.json();
}

// A partir des éléments de mon API, je vais créer le contenu des pages pour mes différents canapés. (Img, titre, prix...)

async function pageContent() {
  let couchData = await getCouchData();
  
  // Ajout de l'image
  
  let couchImage = document.createElement("img");
  couchImage.src = couchData.imageUrl;
  couchImage.alt = couchData.altTxt;
  document.querySelector("#item__img").appendChild(couchImage);
  
  // Création du titre "h1"
  
  let couchTitle = document.getElementById("title");
  couchTitle.innerHTML = couchData.name;
  
  // Ajout du prix
  
  let couchPrice = document.getElementById("price");
  couchPrice.innerHTML = couchData.price;
  
  // Création de la description
  
  let couchDescription = document.getElementById("description");
  couchDescription.innerHTML = couchData.description;
  
  // Ajout des options de couleurs
  
  for (let colors of couchData.colors) {
    console.table(colors);
    let couchColors = document.createElement("option");
    couchColors.value = colors;
    couchColors.innerHTML = colors;
    document.querySelector("#colors").appendChild(couchColors);
  }
}

pageContent();

// Bouton du panier
function addToCart(item) {
  const btn_addToCart = document.querySelector("#addToCart");
  
  //Ecouter le panier
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
          }
          //Si le produit commandé n'est pas dans le panier
          else {
            productLocalStorage.push(productOptions);
            localStorage.setItem("produit", JSON.stringify(productLocalStorage));
            console.table(productLocalStorage);
            popupConfirmation();
          }
        }
        //Si le panier est vide
        else {
          productLocalStorage =[];
          productLocalStorage.push(productOptions);
          localStorage.setItem("produit", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
          popupConfirmation();
        }}
      });
    }