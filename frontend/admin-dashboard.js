const menuList = document.getElementById("menuList");
const reservationList = document.getElementById("reservationList");


/* LOAD MENU */

function loadMenu(){

fetch("http://localhost:5000/api/menu")

.then(res=>res.json())

.then(data=>{

menuList.innerHTML="";

data.forEach(item=>{

console.log(item._id)


let div=document.createElement("div");

div.className="menu-item";

div.innerHTML=`
${item.name} - ₹${item.price}
<button onclick="deleteMenu('${item._id}')">Delete</button>
`;

menuList.appendChild(div);

});

});

}


/* ADD MENU */

function addMenu(){

let name=document.getElementById("name").value;

let price=document.getElementById("price").value;

let image=document.getElementById("image").value;

let cuisine=document.getElementById("cuisine").value;

fetch("http://localhost:5000/api/menu",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
price,
image,
cuisine
})

})

.then(res=>res.json())

.then(()=>{

alert("Menu item added");

loadMenu();

});

}



/* DELETE MENU */
function deleteMenu(id){

if(!confirm("Are you sure you want to delete this item?")) return;

fetch("http://localhost:5000/api/menu/" + id,{
method:"DELETE"
})
.then(res => res.json())
.then(data => {

if(data.success){
alert("Menu item deleted");
loadMenu();
}
else{
alert("Delete failed");
}

})
.catch(err=>{
console.error(err);
alert("Server error while deleting");
});

}

/* LOAD RESERVATIONS */

function loadReservations(){

fetch("http://localhost:5000/api/reservations")

.then(res=>res.json())

.then(data=>{

reservationList.innerHTML="";

data.forEach(r=>{

let div=document.createElement("div");

div.innerHTML=`
${r.name} | ${r.date} | ${r.guests} guests
`;

reservationList.appendChild(div);

});

});

}


loadMenu();
loadReservations();