/* ================================
   ELEMENT REFERENCES
================================ */

const menuDiv = document.getElementById("menuContainer");
const eventsDiv = document.getElementById("events-list");


/* ================================
   LOAD MENU FROM BACKEND (MongoDB)
================================ */

fetch("http://localhost:5000/api/menu")

.then(res => res.json())

.then(menuItems => {

menuDiv.innerHTML = "";

menuItems.forEach(item => {

const card = document.createElement("div");

card.className = "card";

card.setAttribute("data-cuisine", item.cuisine);

card.innerHTML = `
<img 
src="images/${item.image}" 
alt="${item.name}"
onerror="this.src='images/default-food.jpg'"
>

<div class="card-body">

<h3>${item.name}</h3>

<p class="price">₹${item.price}</p>

<p>${item.cuisine}</p>

</div>
`;

menuDiv.appendChild(card);

});

})

.catch(err => {

console.error(err);

menuDiv.innerHTML = "<p>⚠️ Unable to load menu</p>";

});


/* ================================
   SEARCH FUNCTION
================================ */

function searchFood(){

let input = document
.getElementById("searchBar")
.value
.toLowerCase();

let cards = document.querySelectorAll(".card");

cards.forEach(card => {

let name = card
.querySelector("h3")
.innerText
.toLowerCase();

if(name.includes(input)){
card.style.display="block";
}
else{
card.style.display="none";
}

});

}


/* ================================
   CUISINE FILTER
================================ */

function filterCuisine(){

let category = document.getElementById("filter").value;

let cards = document.querySelectorAll(".card");

cards.forEach(card=>{

let cuisine = card.getAttribute("data-cuisine");

if(category==="all" || cuisine===category){
card.style.display="block";
}
else{
card.style.display="none";
}

});

}


/* ================================
   EVENTS
================================ */
/* ================================
   EVENTS SECTION WITH IMAGES
================================ */

const events = [

{
title:"Live Music Night 🎵",
date:"Every Friday",
image:"livemusic.jpg"
},

{
title:"Weekend Buffet 🍽️",
date:"Saturday & Sunday",
image:"buffet.jpg"
},

{
title:"Festive Special Menu 🎉",
date:"Limited Time",
image:"festival.jpg"
}

];


events.forEach(event=>{

const div = document.createElement("div");

div.className = "event-card";

div.innerHTML = `

<img 
src="images/${event.image}" 
alt="${event.title}"
onerror="this.src='images/default-food.jpg'"
>

<div class="event-info">

<h3>${event.title}</h3>

<p>${event.date}</p>

</div>

`;

eventsDiv.appendChild(div);

});

/* ================================
   RESERVATION FORM
================================ */

document
.getElementById("reservationForm")
.addEventListener("submit",function(e){

e.preventDefault();

const reservationData = {

name:this.elements["name"].value,

email:this.elements["email"].value,

date:this.elements["date"].value,

time:this.elements["time"].value,

guests:Number(this.elements["guests"].value)

};

fetch("http://localhost:5000/api/reservations",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(reservationData)

})

.then(res=>res.json())

.then(()=>{

alert("✅ Reservation confirmed!");

this.reset();

})

.catch(err=>{

console.error(err);

alert("❌ Failed to reserve table");

});

});

/* =========================
DARK MODE TOGGLE
========================= */

const darkBtn = document.getElementById("darkToggle");

darkBtn.addEventListener("click", () => {

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){
darkBtn.innerText = "☀️";
}
else{
darkBtn.innerText = "🌙";
}

});