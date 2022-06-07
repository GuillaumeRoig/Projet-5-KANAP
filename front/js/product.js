// http://localhost:3000/api/products/055743915a544fde83cfdfc904935ee7
// {"colors":["Green","Red","Orange"],"_id":"055743915a544fde83cfdfc904935ee7","name":"Kanap Calycé","price":3199,"imageUrl":"http://localhost:3000/images/kanap03.jpeg","description":"Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.","altTxt":"Photo d'un canapé d'angle, vert, trois places"}

let str = window.location.href;
let url = new URL(str);
let idCouch = URLSearchParams.get("id");
console.log(idCouch);

