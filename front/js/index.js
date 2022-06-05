// Récupération des informations des produits dans l'API
async function getCouchDataList() {
    // Liste d'objets de canapés
    // [{"colors":["Blue","White","Black"],"_id":"107fb5b75607497b96722bda5b504926","name":"Kanap Sinopé","price":1849,"imageUrl":"http://localhost:3000/images/kanap01.jpeg","description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","altTxt":"Photo d'un canapé bleu, deux places"},{"colors":["Black/Yellow","Black/Red"],"_id":"415b7cacb65d43b2b5c1ff70f3393ad1","name":"Kanap Cyllène","price":4499,"imageUrl":"http://localhost:3000/images/kanap02.jpeg","description":"Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.","altTxt":"Photo d'un canapé jaune et noir, quattre places"},{"colors":["Green","Red","Orange"],"_id":"055743915a544fde83cfdfc904935ee7","name":"Kanap Calycé","price":3199,"imageUrl":"http://localhost:3000/images/kanap03.jpeg","description":"Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.","altTxt":"Photo d'un canapé d'angle, vert, trois places"},{"colors":["Pink","White"],"_id":"a557292fe5814ea2b15c6ef4bd73ed83","name":"Kanap Autonoé","price":1499,"imageUrl":"http://localhost:3000/images/kanap04.jpeg","description":"Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.","altTxt":"Photo d'un canapé rose, une à deux place"},{"colors":["Grey","Purple","Blue"],"_id":"8906dfda133f4c20a9d0e34f18adcf06","name":"Kanap Eurydomé","price":2249,"imageUrl":"http://localhost:3000/images/kanap05.jpeg","description":"Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.","altTxt":"Photo d'un canapé gris, trois places"},{"colors":["Grey","Navy"],"_id":"77711f0e466b4ddf953f677d30b0efc9","name":"Kanap Hélicé","price":999,"imageUrl":"http://localhost:3000/images/kanap06.jpeg","description":"Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.","altTxt":"Photo d'un canapé gris, deux places"},{"colors":["Red","Silver"],"_id":"034707184e8e4eefb46400b5a3774b5f","name":"Kanap Thyoné","price":1999,"imageUrl":"http://localhost:3000/images/kanap07.jpeg","description":"EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.","altTxt":"Photo d'un canapé rouge, deux places"},{"colors":["Pink","Brown","Yellow","White"],"_id":"a6ec5b49bd164d7fbe10f37b6363f9fb","name":"Kanap orthosie","price":3999,"imageUrl":"http://localhost:3000/images/kanap08.jpeg","description":"Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.","altTxt":"Photo d'un canapé rose, trois places"}]
    let couchDataList = await fetch("http://localhost:3000/api/products");
    // Transformation de ma chaine de caractères en Json
    return await couchDataList.json();
}
// A partir des éléments de mon API, je vais créer des éléments en HTML
async function createHtmlElement() {
    let couchDataList = await getCouchDataList();
    couchDataList.forEach(couch => {
        //Travaille de l'objet dans la boucle {"colors":["Blue","White","Black"],"_id":"107fb5b75607497b96722bda5b504926","name":"Kanap Sinopé","price":1849,"imageUrl":"http://localhost:3000/images/kanap01.jpeg","description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","altTxt":"Photo d'un canapé bleu, deux places"},{"colors":["Black/Yellow","Black/Red"],"_id":"415b7cacb65d43b2b5c1ff70f3393ad1","name":"Kanap Cyllène","price":4499,"imageUrl":"http://localhost:3000/images/kanap02.jpeg","description":"Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.","altTxt":"Photo d'un canapé jaune et noir, quattre places"}
        // <!-- <a href="./product.html?id=42">
        //     <article>
        //       <img src="../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
        //       <h3 class="productName">Kanap name1</h3>
        //       <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
        //     </article>
        //    </a>  -->
        let couchRef = document.createElement("a");
        couchRef.href = `./product.html?id=${couch._id}`;
        document.querySelector("#items").appendChild(couchRef);
        console.log(couch);

        let couchArticle = document.createElement("article");
        couchRef.appendChild(couchArticle);

        let couchImage = document.createElement("img");
        couchImage.src = couch.imageUrl;
        couchImage.alt = couch.altTxt;
        couchArticle.appendChild(couchImage);

        let couchTitle = document.createElement("h3");
        couchTitle.classList.add("productName");
        couchTitle.innerHTML = couch.name;
        couchArticle.appendChild(couchTitle);

        let couchDescription = document.createElement("p");
        couchDescription.classList.add("productDescription");
        couchDescription.innerHTML = couch.description;
        couchArticle.appendChild(couchDescription);
    });
}

createHtmlElement();