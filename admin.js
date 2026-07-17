const API =
"https://script.google.com/macros/s/AKfycbzWtEsPubhMfh0OR8n-v4LH1fkoWSYI7piWa38fU5iTdzKaDxiguGKVvLZPBmdkglGP/exec";

const ordersTable =
document.getElementById("ordersTable");

const totalOrders =
document.getElementById("totalOrders");

const pendingOrders =
document.getElementById("pendingOrders");

const processingOrders =
document.getElementById("processingOrders");

const completedOrders =
document.getElementById("completedOrders");

let allOrders = [];

async function loadOrders(){

    const response = await fetch(API);

    allOrders = await response.json();

    renderOrders(allOrders);

}

function renderOrders(orders){

    ordersTable.innerHTML = "";

    let pending = 0;
    let processing = 0;
    let completed = 0;

    orders.forEach(order => {

        if(order["order status"] === "Pending") pending++;

        if(order["order status"] === "Processing") processing++;

        if(order["order status"] === "Delivered") completed++;

        ordersTable.innerHTML += `

        <tr>

            <td>${order["order id"]}</td>

            <td>${order["date"]}</td>

            <td>${order["full name"]}</td>

            <td>R${order["total"]}</td>

            <td>${order["payment status"]}</td>

            <td>${order["order status"]}</td>

        </tr>

        `;

    });

    totalOrders.textContent = orders.length;

    pendingOrders.textContent = pending;

    processingOrders.textContent = processing;

    completedOrders.textContent = completed;

}

document
.getElementById("searchOrders")
.addEventListener("input", function(){

    const value =
    this.value.toLowerCase();

    const filtered = allOrders.filter(order =>

    String(order["order id"]).toLowerCase().includes(value) ||

    String(order["full name"]).toLowerCase().includes(value)

);

    renderOrders(filtered);

});

loadOrders();
