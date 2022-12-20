const out = (any) => {console.log(any)}
out("I can read javascript file")

const deliveryTable = document.querySelector(".deliveryTable");

function fetchingAllDeliveries(){
    out("Inside fetch all delivery function")
    return fetch("http://localhost:8080/delivery").then(response => response.json())
}

async function creatingTblFromDeliveryFetch(){
    let deliveries = await fetchingAllDeliveries();
    out(deliveries)
    deliveries.forEach(delivery => createTableForDelivery(delivery))
}
creatingTblFromDeliveryFetch();

function createTableForDelivery(delivery){
    out("I am inside delivery create table function")
    if (!delivery.id) return;

    let rowCount = deliveryTable.rows.length
    let row = deliveryTable.insertRow(rowCount);

    let cell1 = row.insertCell(0)
    cell1.innerHTML = delivery.id

    let cell2 = row.insertCell(1)
    cell2.innerHTML = delivery.destination

    let cell3 = row.insertCell(2)
    cell3.innerHTML = delivery.fromWarehouse

    let cell4 = row.insertCell(3)
    cell4.innerHTML = delivery.deliveryDate


    // let cell5 = row.insertCell(4)
    // let updateButton = document.createElement("button")
    // // updateButton.addEventListener("click",disable_save_btn)
    //
    // updateButton.innerHTML = "Update"
    // updateButton.className = "updateBtn"
    // updateButton.addEventListener("click", function (){
    //     openPopupProductDivForUpdate(cell1.innerHTML,cell2.innerHTML, cell3.innerHTML, cell4.innerHTML)
    //     updateProductBtn.addEventListener("click", (product)=> updateProduct(cell1.innerHTML))
    //     updateProductBtn.addEventListener("click", closePopupProductDiv)
    //     updateProductBtn.addEventListener("click", () => window.location.href = "product.html")
    //
    // })
    // cell5.appendChild(updateButton)
    //
    //
    // let cell6 = row.insertCell(5)
    // let deleteButton = document.createElement("button")
    // deleteButton.innerHTML = "Delete"
    // deleteButton.className = "deleteBtn"
    // deleteButton.addEventListener("click", booking => deleteProduct(cell1.innerHTML))
    // cell6.appendChild(deleteButton)

}