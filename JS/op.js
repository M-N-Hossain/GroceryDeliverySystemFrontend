const out = (any) => {console.log(any)}
out("I can read javascript file")

const opTable = document.querySelector(".opTable");

function fetchingAllOP(){
    out("Inside fetch all product function")
    return fetch("http://localhost:8080/orderProduct").then(response => response.json())
}

async function creatingTblFromOPFetch(){
    let orderProducts = await fetchingAllOP();
    out(orderProducts)
    orderProducts.forEach(orderProduct => createTableForOP(orderProduct))
}
creatingTblFromOPFetch();

function createTableForOP(orderProduct){
    out("I am inside OP create table function")
    if (!orderProduct.id) return;

    let rowCount = opTable.rows.length
    let row = opTable.insertRow(rowCount);

    let cell1 = row.insertCell(0)
    cell1.innerHTML = orderProduct.id

    let cell2 = row.insertCell(1)
    cell2.innerHTML = orderProduct.quantity

    let cell3 = row.insertCell(2)
    cell3.innerHTML = orderProduct.productID

    let cell4 = row.insertCell(3)
    cell4.innerHTML = orderProduct.totalPrice

    let cell5 = row.insertCell(4)
    cell5.innerHTML = orderProduct.deliveryID

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

//***Add new product functionalities***//

const popupOpDiv = document.querySelector(".popupOpDiv")
const addOpBtn = document.querySelector(".addOpBtn")

//Attribute from popup
const opIdInpFld = document.querySelector(".opIdInpFld")
const opQuantityInpFld = document.querySelector(".opQuantityInpFld")
const opProIdInpFld = document.querySelector(".opProIdInpFld")
const opTtlPriceInpFld = document.querySelector(".opTtlPriceInpFld")
const opDeliveryIDInpFld = document.querySelector(".opDeliveryIDInpFld")


const opInfoForm = document.querySelector(".opInfoForm")
const saveOpBtn = document.querySelector(".saveOpBtn")
const updateOpBtn = document.querySelector(".updateOpBtn")
const cancelOpBtn = document.querySelector(".cancelOpBtn")


function openPopupOpDiv (){
    popupOpDiv.style.visibility = "visible"
    saveOpBtn.style.visibility = "visible"


}
function closePopupOpDiv (){
    popupOpDiv.style.visibility = "hidden"
    saveOpBtn.style.visibility = "hidden"
    updateOpBtn.style.visibility = "hidden"
}

function saveOrderProduct(event){
    event.preventDefault()

    out("before adding order product fetch")
    fetch("http://localhost:8080/orderProduct", {
        method: "POST",
        body: JSON.stringify({
            quantity: opQuantityInpFld.value,
            productID: opProIdInpFld.value,
            totalPrice: opTtlPriceInpFld.value,
            deliveryID: opDeliveryIDInpFld.value
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(function (response){
        return response.json()
    }).then(function (OP){
        // bookings.forEach(booking => createTable(booking))
        window.location.href = "orderProduct.html"
    })
}

addOpBtn.addEventListener("click", function (){
    opIdInpFld.value = "Generating...."
    opIdInpFld.disabled = true
    updateOpBtn.style.visibility = "hidden"
    openPopupOpDiv()
})
opInfoForm.addEventListener("submit", saveOrderProduct)
saveOpBtn.addEventListener("submit", closePopupOpDiv)
cancelOpBtn.addEventListener("click", closePopupOpDiv)
