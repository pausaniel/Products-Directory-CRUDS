var selectedRow = null;

function FormSubmit(e) {
    e.preventDefault();
    var formData = readFormData();
    if (selectedRow === null) {
        insertNewRecord(formData);
    } else {
        upRecord(formData);
    }
    delForm();
}

function readFormData() {
    var formData = {};
    formData["productID"] = document.getElementById("productID").value;
    formData["productName"] = document.getElementById("productName").value;
    formData["quantity"] = document.getElementById("quantity").value;
    formData["price"] = document.getElementById("price").value;
    return formData;
}

function insertNewRecord(formData) {
    var table = document.getElementById("dataList").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.rows.length);
    
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.productID;
    
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.productName;
    
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.quantity;
    
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = `₱${parseFloat(formData.price).toFixed(2)}`;
    
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button onclick='onEdit(this)' class='btn edit'>Edit</button> 
                       <button onclick='onDelete(this)' class='btn delete'>Delete</button>`;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("productID").value = selectedRow.cells[0].innerHTML;
    document.getElementById("productName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("quantity").value = selectedRow.cells[2].innerHTML;
    document.getElementById("price").value = selectedRow.cells[3].innerHTML;
}

function upRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.productID;
    selectedRow.cells[1].innerHTML = formData.productName;
    selectedRow.cells[2].innerHTML = formData.quantity;
    selectedRow.cells[3].innerHTML = `₱${parseFloat(formData.price).toFixed(2)}`;
    selectedRow = null;
}

function onDelete(td) {
    if (confirm("Do you want to delete this product?")) {
        var row = td.parentElement.parentElement;
        document.getElementById("dataList").deleteRow(row.rowIndex);
        delForm();
    }
}

function delForm() {
    document.getElementById("productID").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
    selectedRow = null;
}

function searchTable() {
    var input = document.getElementById("search").value.toLowerCase();
    var table = document.getElementById("dataList").getElementsByTagName("tbody")[0];
    var rows = table.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var productID = rows[i].cells[0].textContent.toLowerCase();
        var productName = rows[i].cells[1].textContent.toLowerCase();

        if (productID.includes(input) || productName.includes(input)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

