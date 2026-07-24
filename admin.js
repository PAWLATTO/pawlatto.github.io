const API =
"https://script.google.com/macros/s/AKfycbwa_V829ZMpOhHVsVzcrsycFtMk8xl6KtvEtUoIbkSkgWanB8K23gDPX7sHbX6zEtH7/exec";

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

    const response = await fetch(API + "?type=orders");

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

<td>

<button
class="update-btn"
onclick="openUpdateModal('${order["order id"]}')"
>

✏️ Update

</button>

</td>

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

// ===========================
// UPDATE ORDER MODAL
// ===========================

const updateModal = document.getElementById("updateModal");

const closeModal = document.getElementById("closeModal");

function openUpdateModal(orderId){

    const order = allOrders.find(o => o["order id"] == orderId);

    document.getElementById("selectedOrderId").value = orderId;

    document.getElementById("paymentStatus").value =
    order["payment status"];

    document.getElementById("orderStatus").value =
    order["order status"];

    document.getElementById("trackingNumber").value =
    order["tracking number"] || "";

    updateModal.style.display = "flex";

}

closeModal.addEventListener("click", () => {

    updateModal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if(e.target === updateModal){

        updateModal.style.display = "none";

    }

});

// ===========================
// SAVE ORDER CHANGES
// ===========================

document.getElementById("saveOrderBtn").addEventListener("click", async () => {

    const orderId = document.getElementById("selectedOrderId").value;

    const paymentStatus =
    document.getElementById("paymentStatus").value;

    const orderStatus =
    document.getElementById("orderStatus").value;

    const trackingNumber =
    document.getElementById("trackingNumber").value;

    const response = await fetch(API, {

        method: "POST",

        body: JSON.stringify({

            action: "updateOrder",

            orderId,

            paymentStatus,

            orderStatus,

            trackingNumber

        })

    });

    const result = await response.json();

    if(result.success){

        alert("Order updated successfully.");

        updateModal.style.display = "none";

        loadOrders();

    }else{

        alert("Failed to update order.");

    }

});
