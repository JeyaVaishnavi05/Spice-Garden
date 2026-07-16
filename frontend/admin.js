if (!localStorage.getItem("adminToken")) {
  window.location.href = "admin-login.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("adminToken");
  window.location.href = "admin-login.html";
});

const table = document.getElementById("reservationTable");

function loadReservations() {
  table.innerHTML = "";

  fetch("http://localhost:5000/api/reservations")
    .then(res => res.json())
    .then(data => {
      data.forEach(r => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${r.name}</td>
          <td>${r.email}</td>
          <td>${r.date}</td>
          <td>${r.time}</td>
          <td>${r.guests}</td>
          <td>${r.status}</td>
          <td>
            <button onclick="confirmReservation('${r._id}')">✅</button>
            <button onclick="deleteReservation('${r._id}')">🗑️</button>
          </td>
        `;

        table.appendChild(row);
      });
    });
}

function confirmReservation(id) {
  fetch(`http://localhost:5000/api/reservations/${id}`, {
    method: "PUT"
  }).then(loadReservations);
}

function deleteReservation(id) {
  fetch(`http://localhost:5000/api/reservations/${id}`, {
    method: "DELETE"
  }).then(loadReservations);
}

loadReservations();

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