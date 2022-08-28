function confirmation(){
    const params = new URLSearchParams(window.location.search);
    params.get("orderId");
    const orderId = document.getElementById("orderId");
    orderId.innerText = params.get("orderId");
    localStorage.clear();
}

confirmation();