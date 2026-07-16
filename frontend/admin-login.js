document
.getElementById("adminLoginForm")
.addEventListener("submit", function (e) {

e.preventDefault();

const data = {

email: this.elements["email"].value,
password: this.elements["password"].value

};

fetch("http://localhost:5000/api/admin/login", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify(data)

})

.then(res => res.json())

.then(result => {

if (result.success) {

localStorage.setItem("adminToken", result.token);

/* redirect after login */

window.location.href = "admin.html";

}

else{

alert("❌ Invalid credentials");

}

});

});


/* =========================
DARK MODE TOGGLE
========================= */

const darkBtn = document.getElementById("darkToggle");

if(darkBtn){

darkBtn.addEventListener("click", () => {

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){
darkBtn.innerText = "☀️";
}
else{
darkBtn.innerText = "🌙";
}

});

}