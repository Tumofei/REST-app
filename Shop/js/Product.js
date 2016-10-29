/**
 * Created by timox on 29.10.2016.
 */
/**
 * Created by Борис on 21.10.2016.
 */

var shopServer = 'shop';
var shopTable = 'product';

var productsElement = document.getElementById('products');
var addBtn = document.getElementById('addBtn');
var cancelBtn = document.getElementById('cancelBtn');
var nameInput = document.getElementById('nameInput');
var costInput = document.getElementById('costInput');
var data = {};

productsElement.addEventListener('click', actionChooser);

addBtn.addEventListener('click', actionChooser);
cancelBtn.addEventListener('click', tableRender);

var products = JSON.parse(getRest(shopServer, shopTable)); //server answer


putInTable(products);

function getRest(server, table) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('GET', 'http://rest/' + server + '/index.php/' + table, false);
    xhr.send();

    return xhr.responseText;
}

function deleteRest(server, table, id) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('DELETE', 'http://rest/' + server + '/index.php/' + table + '/' + id, false);
    xhr.send();
}

function postRest(server, table, data) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', 'http://rest/' + server + '/index.php/' + table, false);
    xhr.send(JSON.stringify(data));
}

function putRest(server, table, data, id) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('PUT', 'http://rest/' + server + '/index.php/' + table + '/' + id, false);
    xhr.send(JSON.stringify(data));
}

function putInTable(items) {
    for (var i = 0; i < items.valueOf().length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        var deleteBtn = document.createElement('input');
        var editBtn = document.createElement('input');



        deleteBtn.className = 'btn btn-danger col-lg-4 col-lg-offset-1 deleteBtn';
        deleteBtn.type = 'button';
        deleteBtn.value = 'Delete';
        deleteBtn.id = items[i].id;

        editBtn.className = 'btn btn-danger col-lg-4 col-lg-offset-2 editBtn';
        editBtn.type = 'button';
        editBtn.value = 'Edit';
        editBtn.id = items[i].id;

        td1.innerHTML = items[i].name;
        td2.innerHTML = items[i].cost;

        productsElement.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(editBtn);
        td3.appendChild(deleteBtn);
    }
}


function editAction(id) {
    for (var i = 0; i < products.valueOf().length; i++) {
        if (products[i].id == id) {
            data = {
                id: products[i].id,
                name: products[i].name,
                cost: products[i].cost
            };
            break;
        }
    }
    addBtn.value = 'UPDATE';
    addBtn.id = 'updateBtn';
    nameInput.value = data.name;
    costInput.value = data.cost;
}

function addAction() {
    data = {
        name: nameInput.value,
        cost: costInput.value
    };

    postRest(shopServer, shopTable, data);
}

function updateAction() {
    data = {
        id: data.id,
        name: nameInput.value,
        cost: costInput.value
    };

    putRest(shopServer, shopTable, data, data.id);
}

function actionChooser(event) {
    var id = event.target.id;

    if (event.target.className.indexOf('deleteBtn') + 1) {
        deleteRest(shopServer, shopTable, id);
        tableRender();
    }
    if (event.target.className.indexOf('editBtn') + 1) {
        editAction(id);
    }
    if (event.target.id.indexOf('addBtn') + 1) {
        addAction();
        tableRender();
    }
    if (event.target.id.indexOf('updateBtn') + 1) {
        updateAction();
        tableRender();
    }

}

function tableRender () {
    products = JSON.parse(getRest(shopServer, shopTable)); //server answer

    productsElement.innerHTML = '';
    addBtn.value = 'ADD';
    addBtn.id = 'addBtn';
    nameInput.value = '';
    costInput.value = '';
    data = {};

    putInTable(products);
}

