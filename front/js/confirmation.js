function confirmation(){
    const orderId = document.getElementById("orderId");
    orderId.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}

confirmation();