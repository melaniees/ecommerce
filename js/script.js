let titleH2 = document.getElementById("titleH2");
titleH2.innerHTML = "Nuestros productos";

let shopContent = document.getElementById("shopContent");

async function fetchData(){
    const apiURL = './json/product.json';
    try{
        const response = await fetch(apiURL);
        const data = await response.json();
        renderProducts(data);
        return data;
    }catch(error){
        return "Error";
    }
}

function renderProducts(data){
    data.forEach((product) => {
        let content = document.createElement("div");
        content.classList.add("productBox");
        content.innerHTML = `
            <span class="productId">${product.id}</span>
            <img  class="productImg" src="${product.img}" alt="${product.nombre}">
            <h2 class="productTitle">${product.title}</h2>
            <span class="productPric">$</span>
            <span class="productPrice">${product.precio}</span>
            <i class="addCart bx bx-shopping-bag"></i>
        `;
        shopContent.append(content);
    });
    initCart();
}

fetchData()
.then((result) => initCart(result))
.catch((error) => console.log("Error",error));

