const cartIcon = document.querySelector("#cartIcon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cartClose");
let backgroundColor="RED";
let backgroundColorNone= "transparent";

closeCart.addEventListener("click", () =>{
    cart.classList.remove("active");
}); 

let itemsAdded = JSON.parse(localStorage.getItem("itemsAdded")) ||[];

function initCart(){    
let addCart_btns = document.querySelectorAll(".addCart");
    cartIcon.addEventListener("click", () =>{
        cart.classList.add("active");
        itemsAdded = JSON.parse(localStorage.getItem("itemsAdded"));
        console.log(itemsAdded);
        loadCart();
        actionsCart();
    });
    addCart_btns.forEach((btn) => {
        btn.addEventListener('click', handle_addCartItem);
    });
   function handle_addCartItem(){
        let product = this.parentElement;
        let id = product.querySelector(".productId").innerHTML;
        let title = product.querySelector(".productTitle").innerHTML;
        let price = product.querySelector(".productPrice").innerHTML;
        let imgSrc = product.querySelector(".productImg").src;
        let quantity = "1";
        let newToAdd = {id,title,price,imgSrc,quantity};
        newProduct(newToAdd);
    }
    function newProduct(newToAdd){
            let memori = JSON.parse(localStorage.getItem("itemsAdded"));
            if(memori == null ){//memoria vacia
                createProduct(newToAdd);
                itemsAdded.push(newToAdd);
                storageProduct(itemsAdded);
                paintCart(backgroundColor);
                loadCart();
                
            }else{
                let memori = JSON.parse(localStorage.getItem("itemsAdded"));
                const okFind = memori.find((el) => (el.id == newToAdd.id));
                if(okFind){//agrego una unidad al producto
                }else{//agrego el componente en el carrito
                    paintCart(backgroundColor);
                    memori.push(newToAdd);
                    console.log(memori);
                    storageProduct(memori);
                    loadCart();
                }  
            }
    }
    function createProduct(newToAdd){
        let carBoxElement = cartBoxComponent(newToAdd.id,newToAdd.title,newToAdd.price,newToAdd.imgSrc,newToAdd.quantity);  
        let newNode = document.createElement("div");
        newNode.innerHTML = carBoxElement;
        const cartContent = cart.querySelector(".cartContent");
        cartContent.appendChild(newNode);
    }
    function loadCart(){
        const memori = JSON.parse(localStorage.getItem("itemsAdded"));
        if(memori != null){
            const cartContent = cart.querySelector(".cartContent");
                    cartContent.innerHTML = "";
                    memori.forEach((product) => {
                        let carBoxElement = cartBoxComponent(product.id,product.title,product.price,product.imgSrc,product.quantity);  
                        let newNode = document.createElement("div");
                        newNode.innerHTML = carBoxElement;
                        const cartContent = cart.querySelector(".cartContent");
                        cartContent.appendChild(newNode);
                    });
        total(); 
        }else{
            let totalP = document.querySelector(".totalPrice");
            totalP.innerHTML ="$"+ 0;
        }
                       
    }
}

function paintCart(backgroundColor){
    document.getElementById("cartIcon").style.backgroundColor = backgroundColor;
}

function myFunction(val,id) {
    const memoria = JSON.parse(localStorage.getItem("itemsAdded"));
    const elimi = memoria.find((el) => (el.id == id));
    let i= memoria.indexOf(elimi);
    memoria[i].quantity = val;
    localStorage.clear();
    localStorage.setItem("itemsAdded",JSON.stringify(memoria));
    total();
    loadCart();
}
function storageProduct(itemsAdded){
    localStorage.setItem("itemsAdded",JSON.stringify(itemsAdded));  
}
function cartBoxComponent(id,title,price,imgSrc,quantity){
    return `
    <div class="cartBox">
    <span class="productId">${id}</span>
    <img src=${imgSrc} alt="${title}" class="cartImg">
    <div class="detailBox">
    <div class="cartProductTitle">${title}</div>
    <div class="cartPrice">$${price}</div>
    <input type="number" name="pi" value=${quantity} min="1" max="100" class="cartQuantity" onchange="myFunction(this.value,${id})">
    </div> 
    <i class="cartRemove bx bxs-trash-alt" ></i>
    </div>
    `;
}
