let shop = document.getElementById('shop')
let shopItemsData=[{
    id:"jdwbc",
    name:"Matar Paneer",
    price: 300,
    img: "images/image1.jpg",
    desc: "Matar paneer is a traditional North Indian dish of creamy paneer and peas swimming in a mildly spiced tomato sauce."
},{
    id:"ojbdwbjd",
    name:"Roti",
    img: "images/image2.jpeg",
    desc: "It's a flatbread made with whole wheat and traditionally cooked in tandoor (cylindrical clay oven) hence the name tandoori.",
    price: 15
},{
    id:"dakjbvhs",
    name: "Rajma Chawal",
    img: "images/image5.jpg",
    desc: "Rajma chawal is a favorite combo in many North Indian households where rajma masala is served with chawal.",
    price: 220

},{
    id:"iweufbkhbqre",
    name:"Dal Makhani",
    img: "images/image6.jpg",
    desc: "Dal makhani is a dish originating in New Delhi, India. It is a modern take on the age-old urad ki dal.",
    price: 175
},
{
    id:"qjbvawjkd",
    name: "Rajma",
    img: "images/image3.jpg",
    desc :"Rajma is a traditional North indian food made from authentic masalas and kidney beans",
    price: 200
},
{
    id:"iworebrjk",
    name: "Naan",
    img: "images/image4.jpg",
    desc :"Naan is a leavened, oven-baked or tawa-fried flatbread which is found in the cuisines mainly of Western Asia, Central Asia",
    price: 20
},
{
    id:"qkqernvjb",
    name: "Palak Paneer",
    img: "images/image14.jpg",
    desc :"Palak paneer is a classic curried dish from North Indian cuisine made with fresh spinach, spices, paneer and herbs.",
    price: 275
},
{
    id:"alkndfjkbfkljfdk",
    name: "Aloo Gobhi",
    img: "images/image13.jpg",
    desc :"Aloo gobi is a vegetarian dish from the Indian subcontinent made with potatoes, cauliflower and spices",
    price: 150 
},
{
    id:"oenrtjnfjdbjbb",
    name: "Rasgulla",
    img: "images/image11.jpg",
    desc :"Rasgulla, also known in Rosogolla, Rasagola, or Rosogola is a syrupy dessert popular in the Indian subcontinent",
    price: 20
},
{
    id:"iojtojkdfklmdbbndz",
    name: "Gulaab Jamun",
    img: "images/image10.jpg",
    desc :"Gulab jamun is a sweet, originating in the Indian subcontinent and a type of mithai popular in India, Pakistan, Nepal",
    price: 25
},
{
    id:"yuiopiiojflernrjkabkd",
    name: "Soan Papdi",
    img: "images/image12.jpg",
    desc :"Soan papdi is a popular dessert in the India. The term sohan is of Persian origin.served as flakes, and has a crisp and flaky texture.",
    price: 15
},
{
    id:"jafljkbndkblbsdf",
    name: "Kalakand",
    img: "images/image15.jpg",
    desc :"Kalakand is an Indian sweet made out of solidified, sweetened milk called Khoa. It is different from the sweet milk cake.",
    price: 25 
}
]
let basket = JSON.parse(localStorage.getItem("data"))||[];
let generateShop = () =>{
    return (shop.innerHTML=shopItemsData.map((x)=>{
        let {id, name, img, desc, price} = x;
        let search = basket.find((x)=>x.id===id)||[];
        return `
        <div id=product-id-${id} class="item">
        <img src="${img}" alt="no-text-available">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
           
        </div>
        <div class="price">
            <h2> <i class="uil uil-rupee-sign"></i> ${price}</h2>
            <div class="buttons">
            <i class="bi bi-plus-square" onclick="increment(${id})"></i><span id="${id}">${search.item===undefined?0:search.item}</span>
            <i class="bi bi-dash-square" onclick="decrement(${id})"></i>   
            </div>     
        </div>
    </div>`
    }).join(""))
}
generateShop()
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
    update(selectedItem.id)
    localStorage.setItem("data",JSON.stringify(basket))
}
function decrement(id){
    let selectedItem = id;
    let search = basket.find((x)=> x.id===selectedItem.id)
    if(search.item===0) return
    else{
    search.item-=1
    }
    
    update(selectedItem.id)
    basket = basket.filter((x)=>x.item!==0);
    localStorage.setItem("data",JSON.stringify(basket));
   // console.log(basket)
}
let update = (id) =>{
    let search = basket.find((x)=> x.id===id)
    document.getElementById(id).innerHTML = search.item;
    cartAmount();
}
let cartAmount = () =>{
    let cartIcon = document.getElementById("cartIcon")
    cartIcon.innerHTML=(basket.map((x)=>x.item).reduce((x,y)=>x+y,0))
    console.log("Cart Amount function is running");
}
cartAmount();