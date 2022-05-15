fillSection();

// Récupération des articles de l'API
async function getItems() {
    let itemsCatch = await fetch("http://localhost:3000/api/products")
    return await itemsCatch.json();
}

 // Répartition des données de l'API dans le DOM
 async function fillSection() {
    let result = await getItems()
    .then(function (resultApi){
        const items = resultApi;
        for (let item in items) {

            // Insertion de l'élément "a"
            let productLink = document.createElement("a");
            productLink.href = `product.html?id=${resultApi[item]._id}`;
            document.querySelector(".items").appendChild(productLink);

            // Insertion de l'élément "article"
            let productItem = document.createElement("article");
            productLink.appendChild(productItem);

            // Insertion de l'image
            let productImg = document.createElement("img");
            productImg.src = resultApi[item].imageUrl;
            productImg.alt = resultApi[item].altTxt;
            productItem.appendChild(productImg);

            // Insertion du titre "h3"
            let productName = document.createElement("h3");
            productName.classList.add("productName");
            productItem.appendChild(productName);
            productName.innerHTML = resultApi[item].name;

            // Insertion de la description "p"
            let productDescription = document.createElement("p");
            productDescription.classList.add("productName");
            productItem.appendChild(productDescription);
            productDescription.innerHTML = resultApi[item].description;
        }
    })

    .catch (function(error){
        return error;
    });
}