/**
 * Created by timox on 03.11.2016.
 */
var product = JSON.parse(Rest.getRest('Recipes', 'product'));

var productElement = document.getElementById('product');
var idProductInput = document.getElementById('idProductInput');
var nameProductInput = document.getElementById('nameProductInput');
var cancelProductBtn = document.getElementById('cancelProductBtn');
var addProductBtn = document.getElementById('addProductBtn');

productElement.addEventListener('click', actionProductChooser);
addProductBtn.addEventListener('click', actionProductChooser);
cancelProductBtn.addEventListener('click', tableProductRender);

putInProductTable(product);
function putInProductTable(items) {
    for (var i = 0; i < items.valueOf().length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var deleteBtn = document.createElement('input');
        var editBtn = document.createElement('input');

        deleteBtn.className = 'btn btn-danger col-lg-5  deleteProductBtn';
        deleteBtn.type = 'button';
        deleteBtn.value = 'Delete';
        deleteBtn.id = items[i].id;

        editBtn.className = 'btn btn-danger col-lg-5 col-lg-offset-1  editProductBtn';
        editBtn.type = 'button';
        editBtn.value = 'Edit';
        editBtn.id = items[i].id;

        td1.innerHTML = items[i].id;
        td2.innerHTML = items[i].name;

        productElement.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(editBtn);
        td3.appendChild(deleteBtn);
    }
}


function editProductAction(id) {
    for (var i = 0; i < product.valueOf().length; i++) {
        if (product[i].id == id) {
            data = {
                id: product[i].id,
                name: product[i].name

            };
            break;
        }
    }
    addProductBtn.value = 'UPDATE';
    addProductBtn.id = 'updateProductBtn';
    idProductInput.id = id;
    idProductInput.value = data.id;
    nameProductInput.value = data.name;
}

function addProductAction() {
    if (idProductInput.value) {
        data = {
            id: idProductInput.value,
            name: nameProductInput.value
        };
    } else {
        data = {
            name: nameProductInput.value
        };
    }
    Rest.postRest('recipes', 'Product', data)
}

function updateProductAction() {
    data = {
        id: idProductInput.value,
        name: nameProductInput.value

    };

    Rest.putRest('recipes', 'product', data, idProductInput.id);
}

function actionProductChooser(event) {
    var id = event.target.id;

    if (event.target.className.indexOf('deleteProductBtn') + 1) {
        Rest.deleteRest('recipes', 'product', id);
        tableProductRender();
    }
    if (event.target.className.indexOf('editProductBtn') + 1) {
        editProductAction(id);

    }
    if (event.target.id.indexOf('addProductBtn') + 1) {
        addProductAction();
        tableProductRender();
    }
    if (event.target.id.indexOf('updateProductBtn') + 1) {
        updateProductAction();
        tableProductRender();
    }


}

function tableProductRender () {

    product = JSON.parse(Rest.getRest('recipes', 'product'));
    productElement.innerHTML = '';
    addProductBtn.value = 'ADD';
    addProductBtn.id = 'addProductBtn';
    idProductInput.value = '';
    nameProductInput.value = '';
    data = {};

    putInProductTable(product);
}