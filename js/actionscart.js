function actionsCart(){
   let cartRemove_btns = document.querySelectorAll(".cartRemove");
   cartRemove_btns.forEach((btn) => {
       btn.addEventListener('click', handle_removeCartItem);
   });
   function handle_removeCartItem(){
        let product = this.parentElement;
        this.parentElement.remove();
        let title = product.querySelector(".cartProductTitle").innerHTML;
        const memoria = JSON.parse(localStorage.getItem("itemsAdded"));
        console.log(memoria); 
        const elimi = memoria.find((el) => (el.title == title));
        let leng = memoria.length;
        console.log(leng);
        let indi= memoria.indexOf(elimi);
        memoria.splice(indi,1);
        localStorage.clear();
        localStorage.setItem("itemsAdded",JSON.stringify(memoria));
        itemsAdded = memoria;
        if(memoria.length == 0){
            paintCart(backgroundColorNone);
        }
        total();
        initCart();
   };   
  
}
function loadCart(){
    const memori = JSON.parse(localStorage.getItem("itemsAdded"));
    if(memori){
        const cartContent = cart.querySelector(".cartContent");
                cartContent.innerHTML = "";
                memori.forEach((product) => {
                    let carBoxElement = cartBoxComponent(product.id,product.title,product.price,product.imgSrc,product.quantity);  
                    let newNode = document.createElement("div");
                    newNode.innerHTML = carBoxElement;
                    const cartContent = cart.querySelector(".cartContent");
                    cartContent.appendChild(newNode);
                });
    }
    total();                
}

let cartRemove_btns = document.querySelectorAll(".cartRemove");
cartRemove_btns.forEach((btn) => {
    btn.addEventListener('click', handle_removeCartItem);
});

let btnBuy = document.querySelector(".btnBuy");
    btnBuy.addEventListener("click", () =>{
        const memori = JSON.parse(localStorage.getItem("itemsAdded"));
        const cartContent = cart.querySelector(".cartContent");
        cartContent.innerHTML = "";
        localStorage.clear();
        itemsAdded = [];
        localStorage.setItem("itemsAdded",JSON.stringify(itemsAdded));
        Swal.fire("¡Gracias por su compra!"); 
        loadCart(); 
        paintCart(backgroundColorC);

    });

function total(){
    const memory = JSON.parse(localStorage.getItem("itemsAdded"));
        if(memory){
                    const nodeList = document.querySelectorAll(".cartQuantity");
                    let tot = 0, i = 0;
                    memory.forEach((product) => {
                        const r = (nodeList[i].value) * parseInt(product.price);
                        tot = tot + r;
                        i++;
                    });
                    let totalP = document.querySelector(".totalPrice");
                    totalP.innerHTML ="$"+ tot;
        }
}