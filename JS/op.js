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

    let cell6 = row.insertCell(5)
    let updateButton = document.createElement("button")
    // updateButton.addEventListener("click",disable_save_btn)

    updateButton.innerHTML = "Update"
    updateButton.className = "updateBtn"
    updateButton.addEventListener("click", function (){
        openPopupOpDivForUpdate(cell1.innerHTML,cell2.innerHTML, cell3.innerHTML, cell4.innerHTML, cell5.innerHTML)
        updateOpBtn.addEventListener("click", (product)=> updateOrderProduct(cell1.innerHTML))
        updateOpBtn.addEventListener("click", closePopupOpDiv)
        updateOpBtn.addEventListener("click", () => window.location.href = "orderProduct.html")

    })
    cell6.appendChild(updateButton)


    let cell7 = row.insertCell(6)
    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete"
    deleteButton.className = "deleteBtn"
    deleteButton.addEventListener("click", booking => deleteOrderProduct(cell1.innerHTML))
    cell7.appendChild(deleteButton)

}

            //***Add new productOrder functionalities***//

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

    opQuantityInpFld.value = ""
    opProIdInpFld.value = ""
    opTtlPriceInpFld.value = ""
    opDeliveryIDInpFld.value = ""


}

function saveOrderProduct(event){
    event.preventDefault()

    out("before adding order product fetch")
    fetch("http://localhost:8080/orderProduct", {
        method: "POST",
        body: JSON.stringify({
            quantity: opQuantityInpFld.value,
            totalPrice: opTtlPriceInpFld.value,
            productID: opProIdInpFld.value,
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



            //***Update OrderProduct functionalities***//

function openPopupOpDivForUpdate (id,quantity, proId, totalPrice, deliveryDate){
    saveOpBtn.style.visibility = "hidden"
    updateOpBtn.style.visibility = "visible"

    popupOpDiv.style.visibility = "visible"
    opIdInpFld.value = id
    opIdInpFld.disabled = true
    opQuantityInpFld.value = quantity
    opProIdInpFld.value = proId
    opTtlPriceInpFld.value = totalPrice
    opDeliveryIDInpFld.value = deliveryDate
}

function updateOrderProduct(id){
    out("before update product fetch")
    fetch("http://localhost:8080/orderProduct/" + id, {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            quantity: opQuantityInpFld.value,
            totalPrice: opTtlPriceInpFld.value,
            productID: opProIdInpFld.value,
            deliveryID: opDeliveryIDInpFld.value
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(function (response){
        return response.json()
    }).then(function (data){
        out(data)
    })
}



            //***Delete OP functionalities***//

function deleteOrderProduct(orderProduct_id){

    out("I am in delete fetching")
    fetch("http://localhost:8080/orderProduct/" + orderProduct_id , {
        method: "DELETE",
        body :"",
        headers: {
            "Content-type": "application/json"
        }
    }).then(function (response) {
        window.location.href = "orderProduct.html"
    })
}



            // ****adding product as select option*****///
// const selectProduct = document.querySelector("#selectProduct")
//
// function fetchingAllProducts(){
//     out("Inside fetch all product function")
//     return fetch("http://localhost:8080/product").then(response => response.json())
// }
// fetchingAllProducts().then(r => getProduct(r))
//
// async function addingOptionToSelectProduct(){
//     let products = await fetchingAllProducts();
//     out(products)
//     getProduct(products)
// }
//
//
// function getProduct(products){
//     for(let i=0; i < products.length; i++){
//         const option = document.createElement("option");
//         // option.setAttribute("class", "selectedMonth")
//         option.textContent = JSON.stringify(products[i])
//         selectProduct.appendChild(option)
//     }
// }
