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


    let cell5 = row.insertCell(4)
    let updateButton = document.createElement("button")
    // updateButton.addEventListener("click",disable_save_btn)

    updateButton.innerHTML = "Update"
    updateButton.className = "updateBtn"
    updateButton.addEventListener("click", function (){
        openPopupDeliveryDivForUpdate(cell1.innerHTML,cell2.innerHTML, cell3.innerHTML, cell4.innerHTML)
        updateDeliveryBtn.addEventListener("click", (product)=> updateDeliveryInfo(cell1.innerHTML))
        updateDeliveryBtn.addEventListener("click", closePopupDeliveryDiv)
        updateDeliveryBtn.addEventListener("click", () => window.location.href = "delivery.html")

    })
    cell5.appendChild(updateButton)

    let cell6 = row.insertCell(5)
    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete"
    deleteButton.className = "deleteBtn"
    deleteButton.addEventListener("click", booking => deleteDeliveryInfo(cell1.innerHTML))
    cell6.appendChild(deleteButton)

}

//***Add new productOrder functionalities***//

const popupDeliveryDiv = document.querySelector(".popupDeliveryDiv")
const addDeliveryBtn = document.querySelector(".addDeliveryBtn")

//Attribute from popup
const deliveryIdInpFld = document.querySelector(".deliveryIdInpFld")
const deliveryDestinationInpFld = document.querySelector(".deliveryDestinationInpFld")
const deliveryFrWarehouseInpFld = document.querySelector(".deliveryFrWarehouseInpFld")
const deliveryDateInpFld = document.querySelector(".deliveryDateInpFld")


const deliveryInfoForm = document.querySelector(".deliveryInfoForm")
const saveDeliveryBtn = document.querySelector(".saveDeliveryBtn")
const updateDeliveryBtn = document.querySelector(".updateDeliveryBtn")
const cancelDeliveryBtn = document.querySelector(".cancelDeliveryBtn")


function openPopupDeliveryDiv (){
    popupDeliveryDiv.style.visibility = "visible"
    saveDeliveryBtn.style.visibility = "visible"


}
function closePopupDeliveryDiv (){
    popupDeliveryDiv.style.visibility = "hidden"
    saveDeliveryBtn.style.visibility = "hidden"
    updateDeliveryBtn.style.visibility = "hidden"

    deliveryDestinationInpFld.value = ""
    deliveryFrWarehouseInpFld.value = ""
    deliveryFrWarehouseInpFld.value = ""

}

function saveDeliveryInfo(event){
    event.preventDefault()

    out("before adding delivery info fetch")
    fetch("http://localhost:8080/delivery", {
        method: "POST",
        body: JSON.stringify({
            destination: deliveryDestinationInpFld.value,
            fromWarehouse: deliveryFrWarehouseInpFld.value,
            deliveryDate: deliveryDateInpFld.value
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(function (response){
        return response.json()
    }).then(function (delivery){
        window.location.href = "delivery.html"
    })
}

addDeliveryBtn.addEventListener("click", function (){
    deliveryIdInpFld.value = "Generating...."
    deliveryIdInpFld.disabled = true
    updateDeliveryBtn.style.visibility = "hidden"
    openPopupDeliveryDiv()
})
deliveryInfoForm.addEventListener("submit", saveDeliveryInfo)
saveDeliveryBtn.addEventListener("submit", closePopupDeliveryDiv)
cancelDeliveryBtn.addEventListener("click", closePopupDeliveryDiv)


            //***Update deliver info functionalities***//

function openPopupDeliveryDivForUpdate (id,destination, fromWarehouse, deliveryDate){
    saveDeliveryBtn.style.visibility = "hidden"
    updateDeliveryBtn.style.visibility = "visible"

    popupDeliveryDiv.style.visibility = "visible"
    deliveryIdInpFld.value = id
    deliveryIdInpFld.disabled = true
    deliveryDestinationInpFld.value = destination
    deliveryFrWarehouseInpFld.value = fromWarehouse
    deliveryDateInpFld.value = deliveryDate
}

function updateDeliveryInfo(id){
    out("before update delivery info fetch")
    fetch("http://localhost:8080/delivery/" + id, {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            destination: deliveryDestinationInpFld.value,
            fromWarehouse: deliveryFrWarehouseInpFld.value,
            deliveryDate: deliveryDateInpFld.value
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



            //***Delete delivery info functionalities***//

function deleteDeliveryInfo(id){

    out("I am in delete fetching")
    fetch("http://localhost:8080/delivery/" + id , {
        method: "DELETE",
        body :"",
        headers: {
            "Content-type": "application/json"
        }
    }).then(function (response) {
        window.location.href = "delivery.html"
    })
}

        //*****Search Function for delivery*****//
const searchIptFld = document.querySelector(".searchIptFld");

function tableSearch() {
    let filter, tr, td, txtValue;
    //Initializing Variables
    filter = searchIptFld.value.toUpperCase();
    tr = deliveryTable.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
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


