let basket  = JSON.parse(localStorage.getItem("data"));
let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart");
console.log(shopItemData)
let cartAmountIcon = document.getElementById("cartIcon");
cartAmountIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
let generateCartItems = () =>{
    if(basket.length !==0){
        return (shoppingCart.innerHTML = basket.
            map((x)=>{
                console.log(x)
                let {id,item}=x;
                let search = shopItemData.find((y)=>y.id===id)||[];
                return `
                 <div class="cartItems">
                 <img src="${search.img}" width="110px" height="120px">
                 <div class="details">
                 <div class="title-price-x">
                <span>${search.name}</span>
                <span class="priceIndi"><i class="uil uil-rupee-sign"></i>${search.price}</span>
                <i onclick = "removeItem(${id})" class="bi bi-x-lg"></i>
                 </div>
                 <div class="buttons">
                 <i class="bi bi-plus-square" onclick="increment(${id})"></i><span id=${id}>${item}</span>
                 <i class="bi bi-dash-square" onclick="decrement(${id})"></i>   
                 </div> 
                <h3><i class="uil uil-rupee-sign"></i>${item*search.price}</h3>
                 </div>
                 </div>
                 `
            }).join(""))
        //console.log("Cart is not empty")
    }
    else{
       console.log("Cart is E m  p  t  y")
       shoppingCart.innerHTML = ``;
       label.innerHTML = `
       <h2>Cart is Empty </h2>
       <a href="index.html">
       <button class="homeBtn">Go to Home </button>
       </a>
      `
    }
}
generateCartItems()
function increment(id){
    let selectedItem = id
    let search = basket.find((x)=> x.id===selectedItem.id)
    if(search===undefined){
    basket.push({
        id:selectedItem.id,
        item: 1
    })
}
else{
    search.item+=1;
}
    
   // console.log(basket);
   //HOW TO STORE DATE IN LOCAL STORAGE SO THAT WHEN WE REFRESH THE PAGE DATA WILL NOT BE RMEOVED 
    generateCartItems()
    update(selectedItem.id)
}
function decrement(id){
    let selectedItem = id;
    let search = basket.find((x)=> x.id===selectedItem.id)
    if(search.item===undefined) return
    else if(search.item===0) return
    else{
        search.item-=1;
    }
    update(selectedItem.id)
    basket = basket.filter((x)=>x.item!==0);
    generateCartItems()
    localStorage.setItem("data",JSON.stringify(basket));
   // console.log(basket)
}
let update = (id) =>{
    let search = basket.find((x)=> x.id===id)
    document.getElementById(id).innerHTML = search.item;
    cartAmount();
    TotalAmount();
}
let cartAmount = () =>{
    let cartIcon = document.getElementById("cartIcon")
    cartIcon.innerHTML=(basket.map((x)=>x.item).reduce((x,y)=>x+y,0))
    console.log("Cart Amount function is running");
}
let removeItem = (id) => {
    let selectedItem = id;
    console.log(selectedItem.id);
    console.log("Remove item function is running")
    basket = basket.filter((x)=>x.id !== selectedItem.id)
    generateCartItems()
    TotalAmount();
    cartAmount();
    localStorage.setItem("data",JSON.stringify(basket))
}
let clearCart = () =>{
    basket = [];
    generateCartItems();
    cartAmount();
    localStorage.setItem("data",JSON.stringify(basket));
}
let TotalAmount  = () =>{
    if(basket.length !== 0){
        let amount = basket.map((x)=>{
            let {item,id} = x;
            let search = shopItemData.find((y)=>y.id===id)||[];
            return item * search.price;
        }).reduce((x,y)=>x+y,0)
        label.innerHTML = `
        <h1>Total Bill : <i class="uil uil-rupee-sign"></i> ${amount} </h1>
        <a href="index.html">
        <button class="checkoutBtn">Checkout <button>
        </a>
        <button class="cancelBtn" onclick = "clearCart()">Cancel Order <button>
        `
    }
   
    else return;
}
TotalAmount();
