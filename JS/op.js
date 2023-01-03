const out = (any) => {console.log(any)}
out("I can read javascript file")


                    //***Handling page title***///
const opTitle = document.querySelector(".opTitle")
opTitle.style.textDecoration = "underline"
opTitle.style.textDecorationColor = "Gray"






                    ///***Showing order product in table functionalities***///

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
    cell2.innerHTML = orderProduct.productID.name

    let cell3 = row.insertCell(2)
    cell3.innerHTML = orderProduct.quantity

    let cell4 = row.insertCell(3)
    cell4.innerHTML = orderProduct.totalWeight

    let cell5 = row.insertCell(4)
    cell5.innerHTML = orderProduct.totalPrice

    let cell6 = row.insertCell(5)
    cell6.innerHTML = orderProduct.vanID.vanName

    let cell7 = row.insertCell(6)
    cell7.innerHTML = orderProduct.deliveryInfoID.destination

    let cell8 = row.insertCell(7)
    let updateButton = document.createElement("button")
    // updateButton.addEventListener("click",disable_save_btn)

    updateButton.innerHTML = "Update"
    updateButton.className = "updateBtn"
    updateButton.addEventListener("click", function (){
        openPopupOpDivForUpdate(cell1.innerHTML,cell2.innerHTML, cell3.innerHTML, cell4.innerHTML, cell5.innerHTML, cell6.innerHTML, cell7.innerHTML)
        updateOpBtn.addEventListener("click", (product)=> updateOrderProduct(cell1.innerHTML))
        updateOpBtn.addEventListener("click", closePopupOpDiv)
        updateOpBtn.addEventListener("click", () => window.location.href = "orderProduct.html")

    })
    cell8.appendChild(updateButton)


    let cell9 = row.insertCell(8)
    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete"
    deleteButton.className = "deleteBtn"
    deleteButton.addEventListener("click", booking => deleteOrderProduct(cell1.innerHTML))
    cell9.appendChild(deleteButton)

}






            //***Add new productOrder functionalities***//

const popupOpDiv = document.querySelector(".popupOpDiv")
const addOpBtn = document.querySelector(".addOpBtn")

//Attribute from popup
const opIdInpFld = document.querySelector(".opIdInpFld")
const opQuantityInpFld = document.querySelector(".opQuantityInpFld")
let selectProduct = document.querySelector(".selectProduct")
let opTtlPriceInpFld = document.querySelector(".opTtlPriceInpFld")
let opTtlWeightInpFld = document.querySelector(".opTtlWeightInpFld")
let selectDelivery = document.querySelector(".selectDelivery")
let selectVan = document.querySelector(".selectVan")


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
    selectProduct.value = ""
    opTtlPriceInpFld.value = ""
    selectDelivery.value = ""
    opTtlWeightInpFld.value = ""


}



function saveOrderProduct(event){
    event.preventDefault()

    out("before adding order product fetch")
    out( vanFromDatabase[selectVan.selectedIndex].id)

    fetch("http://localhost:8080/orderProduct", {
        method: "POST",
        body: JSON.stringify({
            quantity: opQuantityInpFld.value,
            totalPrice: opTtlPriceInpFld.value,
            totalWeight: opTtlWeightInpFld.value,
            productID: {
                id: productFromDatabase[selectProduct.selectedIndex].id,
                name: productFromDatabase[selectProduct.selectedIndex].name,
                weight: productFromDatabase[selectProduct.selectedIndex].weight,
                price: productFromDatabase[selectProduct.selectedIndex].price
            },
            deliveryInfoID: {
                id: deliveryInfoFromDatabase[selectDelivery.selectedIndex].id,
                deliveryDate: deliveryInfoFromDatabase[selectDelivery.selectedIndex].deliveryDate,
                fromWarehouse: deliveryInfoFromDatabase[selectDelivery.selectedIndex].fromWarehouse,
                destination: deliveryInfoFromDatabase[selectDelivery.selectedIndex].destination
            },
            vanID: {
                id: vanFromDatabase[selectVan.selectedIndex].id,
                vanName: vanFromDatabase[selectVan.selectedIndex].vanName,
                capacity: vanFromDatabase[selectVan.selectedIndex].capacity
            }
        }),

        headers: {
            "Content-type": "application/json"
        }
    }).then(function (response){
        return response.json()
    }).then(function (orderProduct){
        // out(orderProduct)
        window.location.href = "orderProduct.html"
    })
}

addOpBtn.addEventListener("click", function (){
    opIdInpFld.value = "Generating...."
    opIdInpFld.disabled = true
    opTtlPriceInpFld.disabled = "true"
    opTtlWeightInpFld.disabled = "true"
    updateOpBtn.style.visibility = "hidden"
    opTtlPriceInpFld.value = "0"
    opTtlWeightInpFld.value = "0"
    openPopupOpDiv()
})
opInfoForm.addEventListener("submit", saveOrderProduct)
saveOpBtn.addEventListener("submit", closePopupOpDiv)
cancelOpBtn.addEventListener("click", closePopupOpDiv)






            //***Update OrderProduct functionalities***//

function openPopupOpDivForUpdate (id, product, quantity, totalWeight, totalPrice, van, deliveryDestination){
    saveOpBtn.style.visibility = "hidden"
    updateOpBtn.style.visibility = "visible"

    popupOpDiv.style.visibility = "visible"
    opIdInpFld.value = id
    opIdInpFld.disabled = true
    selectProduct.value = product
    opQuantityInpFld.value = quantity
    opTtlWeightInpFld.value = totalWeight
    opTtlPriceInpFld.value = totalPrice
    out(van)
    selectVan.value = van
    selectDelivery.value = deliveryDestination

    opTtlPriceInpFld.disabled = "true"
    opTtlWeightInpFld.disabled = "true"
}

function updateOrderProduct(id){
    out("before update product fetch")
    fetch("http://localhost:8080/orderProduct/" + id, {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            quantity: opQuantityInpFld.value,
            totalPrice: opTtlPriceInpFld.value,
            totalWeight: opTtlWeightInpFld.value,
            productID: {
                id: productFromDatabase[selectProduct.selectedIndex].id,
                name: productFromDatabase[selectProduct.selectedIndex].name,
                weight: productFromDatabase[selectProduct.selectedIndex].weight,
                price: productFromDatabase[selectProduct.selectedIndex].price
            },
            deliveryInfoID: {
                id: deliveryInfoFromDatabase[selectDelivery.selectedIndex].id,
                deliveryDate: deliveryInfoFromDatabase[selectDelivery.selectedIndex].deliveryDate,
                fromWarehouse: deliveryInfoFromDatabase[selectDelivery.selectedIndex].fromWarehouse,
                destination: deliveryInfoFromDatabase[selectDelivery.selectedIndex].destination
            },
            vanID: {
                id: vanFromDatabase[selectVan.selectedIndex].id,
                vanName: vanFromDatabase[selectVan.selectedIndex].vanName,
                capacity: vanFromDatabase[selectVan.selectedIndex].capacity
            }
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






            ///****adding product as select option*****///

function fetchingAllProducts(){
    out("Inside fetch all product function")
    return fetch("http://localhost:8080/product").then(response => response.json())
}

let productFromDatabase;

async function addingOptionToSelectProduct(){
    productFromDatabase = await fetchingAllProducts();
    out(productFromDatabase)
    getProduct(productFromDatabase)
}
addingOptionToSelectProduct()

function getProduct(products){
    // productFromDatabase = [];
    for(let i=0; i < products.length; i++){
        const option = document.createElement("option");
        option.setAttribute("class", "selectedProduct")
        option.textContent = products[i].name
        selectProduct.appendChild(option)
    }
}






            ///****adding delivery as select option*****///


function fetchingAllDeliveryInfo(){
    out("Inside fetch all delivery function")
    return fetch("http://localhost:8080/delivery").then(response => response.json())
}

let deliveryInfoFromDatabase;

async function addingOptionToSelectDeliveryInfo(){
    deliveryInfoFromDatabase = await fetchingAllDeliveryInfo();
    out(deliveryInfoFromDatabase)
    getDeliveryInfo(deliveryInfoFromDatabase)
}
addingOptionToSelectDeliveryInfo()

function getDeliveryInfo(delivery){
    for(let i=0; i < delivery.length; i++){
        const option = document.createElement("option");
        // option.setAttribute("class", "selectedProduct")
        option.textContent = delivery[i].destination
        selectDelivery.appendChild(option)
    }
}






            ///****adding Van as select option*****///


function fetchingAllVan(){
    out("Inside fetch all delivery function")
    return fetch("http://localhost:8080/van").then(response => response.json())
}

let vanFromDatabase;

async function addingOptionToSelectVan(){

    vanFromDatabase = await fetchingAllVan();
    getVan(vanFromDatabase)

}

addingOptionToSelectVan()


function getVan(van) {
    selectVan.options.length = 0
    for(let i=0; i < van.length; i++){
        if (opQuantityInpFld.value === ""){
            const option = document.createElement("option");
            selectVan.appendChild(option)
            selectVan.options.length = 0
        }
        if (opTtlWeightInpFld.value > 0 && opTtlWeightInpFld.value <= van[i].capacity){
            const option = document.createElement("option");
            option.textContent = van[i].vanName
            selectVan.appendChild(option)
        }
    }
}

opQuantityInpFld.addEventListener("keyup", addingOptionToSelectVan)






                ///***Calculating total price and weight functionalities***///

function calculatingTotalPrice(){
    let totalPrice;
    totalPrice = (opQuantityInpFld.value * productFromDatabase[selectProduct.selectedIndex].price)
    opTtlPriceInpFld.value = totalPrice;

}
opQuantityInpFld.addEventListener("keyup", calculatingTotalPrice)

function calculatingTotalWeight(){
    let totalWeight;
    totalWeight = ((opQuantityInpFld.value * productFromDatabase[selectProduct.selectedIndex].weight) * 0.001)
    opTtlWeightInpFld.value = totalWeight;
}
opQuantityInpFld.addEventListener("keyup", calculatingTotalWeight)






                    //*****Search Function for delivery*****//
const searchIptFld = document.querySelector(".searchIptFld");

function tableSearch() {
    let filter, tr, td, txtValue;
    //Initializing Variables
    filter = searchIptFld.value.toUpperCase();
    tr = opTable.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[6];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}
searchIptFld.addEventListener("keyup", tableSearch)



