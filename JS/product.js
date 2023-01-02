const out = (any) => {console.log(any)}
out("I can read javascript file")

                    ///***Handling page title***///
const productTitle = document.querySelector(".productTitle")
productTitle.style.textDecoration = "underline"
productTitle.style.textDecorationColor = "Gray"


                ///***Showing product in table functionalities***///
const productTable = document.querySelector(".productTable");

function fetchingAllProducts(){
    out("Inside fetch all product function")
  return fetch("http://localhost:8080/product").then(response => response.json())
}

async function creatingTblFromFetch(){

    let products = await fetchingAllProducts();
    out(products)
    products.forEach(product => createTable(product))
}
creatingTblFromFetch();

function createTable(product){
    out("I am inside create table function")
    if (!product.id) return;

    let rowCount = productTable.rows.length
    let row = productTable.insertRow(rowCount);

    let cell1 = row.insertCell(0)
    cell1.innerHTML = product.id

    let cell2 = row.insertCell(1)
    cell2.innerHTML = product.name

    let cell3 = row.insertCell(2)
    cell3.innerHTML = product.weight

    let cell4 = row.insertCell(3)
    cell4.innerHTML = product.price

    let cell5 = row.insertCell(4)
    let updateButton = document.createElement("button")
    // updateButton.addEventListener("click",disable_save_btn)

    updateButton.innerHTML = "Update"
    updateButton.className = "updateBtn"
    updateButton.addEventListener("click", function (){
        openPopupProductDivForUpdate(cell1.innerHTML,cell2.innerHTML, cell3.innerHTML, cell4.innerHTML)
        updateProductBtn.addEventListener("click", (product)=> updateProduct(cell1.innerHTML))
        updateProductBtn.addEventListener("click", closePopupProductDiv)
        updateProductBtn.addEventListener("click", () => window.location.href = "product.html")

    })
    cell5.appendChild(updateButton)


    let cell6 = row.insertCell(5)
    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete"
    deleteButton.className = "deleteBtn"
    deleteButton.addEventListener("click", booking => deleteProduct(cell1.innerHTML))
    cell6.appendChild(deleteButton)

}


                             //***Add new product functionalities***//

const popupProductDiv = document.querySelector(".popupProductDiv")
const addProductBtn = document.querySelector(".addProductBtn")

//Attribute from popup
const idInpFld = document.querySelector(".idInpFld")
const nameInpFld = document.querySelector(".nameInpFld")
const weightInpFld = document.querySelector(".weightInpFld")
const priceInpFld = document.querySelector(".priceInpFld")

const productInfoForm = document.querySelector(".productInfoForm")
const saveProductBtn = document.querySelector(".saveProductBtn")
const updateProductBtn = document.querySelector(".updateProductBtn")
const cancelProductBtn = document.querySelector(".cancelProductBtn")


function openPopupProductDiv (){
    popupProductDiv.style.visibility = "visible"
    saveProductBtn.style.visibility = "visible"


}
function closePopupProductDiv (){
    popupProductDiv.style.visibility = "hidden"
    saveProductBtn.style.visibility = "hidden"
    updateProductBtn.style.visibility = "hidden"

    nameInpFld.value = "";
    weightInpFld.value = ""
    priceInpFld.value = ""


}

function saveProduct(event){
    event.preventDefault()

    out("before adding product fetch")
    fetch("http://localhost:8080/product", {
        method: "POST",
        body: JSON.stringify({
            name: nameInpFld.value,
            weight: weightInpFld.value,
            price: priceInpFld.value
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(function (response){
        return response.json()
    }).then(function (bookings){
        window.location.href = "product.html"
    })
}

addProductBtn.addEventListener("click", function (){
    idInpFld.value = "Generating...."
    idInpFld.disabled = true
    updateProductBtn.style.visibility = "hidden"
    openPopupProductDiv()
})
productInfoForm.addEventListener("submit", saveProduct)
saveProductBtn.addEventListener("submit", closePopupProductDiv)
cancelProductBtn.addEventListener("click", closePopupProductDiv)



            //***Update product functionalities***//

function openPopupProductDivForUpdate (id,name, weight, price){
    saveProductBtn.style.visibility = "hidden"
    updateProductBtn.style.visibility = "visible"

    popupProductDiv.style.visibility = "visible"
    idInpFld.value = id
    idInpFld.disabled = true
    nameInpFld.value = name
    weightInpFld.value = weight
    priceInpFld.value = price
}

function updateProduct(id){
    out("before update product fetch")
    fetch("http://localhost:8080/product/" + id, {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            name: nameInpFld.value,
            weight: weightInpFld.value,
            price: priceInpFld.value
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




                //***Delete product functionalities***//

function deleteProduct(product_id){

    out("I am in delete fetching")
    fetch("http://localhost:8080/product/" + product_id , {
        method: "DELETE",
        body :"",
        headers: {
            "Content-type": "application/json"
        }
    }).then(function (response) {
        window.location.href = "product.html"
    })
}

                    //*****Search Function for product*****//
const searchIptFld = document.querySelector(".searchIptFld");

function tableSearch() {
    let filter, tr, td, txtValue;
    //Initializing Variables
    filter = searchIptFld.value.toUpperCase();
    tr = productTable.getElementsByTagName("tr");

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
