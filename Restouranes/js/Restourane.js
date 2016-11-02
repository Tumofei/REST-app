/**
 * Created by timox on 29.10.2016.
 */
/**
 * Created by timox on 25.10.2016.
 */


var restaurantsItem = document.getElementById('restaurants');
var restaurants = JSON.parse(getRest('restouranes', 'Restouranes')); //server answer
restaurantsItem.addEventListener('click', actionChooser);

addBtn.addEventListener('click', actionChooser);
cancelBtn.addEventListener('click', tableRender);

putInTable(restaurants);

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
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        var tr = document.createElement('tr');
        //var btn = document.createElement('input');

        var deleteBtn = document.createElement('input');
        var editBtn = document.createElement('input');



        deleteBtn.className = 'btn btn-danger col-lg-5 col-lg-offset-1 deleteBtn';
        deleteBtn.type = 'button';
        deleteBtn.value = 'Delete';
        deleteBtn.id = items[i].id;

        editBtn.className = 'btn btn-danger col-lg-5 col-lg-offset-1 editBtn';
        editBtn.type = 'button';
        editBtn.value = 'Edit';
        editBtn.id = items[i].id;

        td1.innerHTML = items[i].name;
        td2.innerHTML = items[i].description;
        td3.innerHTML = items[i].price_category;
        td4.innerHTML = items[i].adress;
        td5.innerHTML = items[i].necessary_dish;

        restaurantsItem.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        td6.appendChild(deleteBtn);
        td6.appendChild(editBtn);
    }
}

function editAction(id) {
    for (var i = 0; i < restaurants.valueOf().length; i++) {
        if (restaurants[i].id == id) {
            data = {
                id: restaurants[i].id,
                name: restaurants[i].name,
                description: restaurants[i].description,
                price_category: restaurants[i].price_category,
                adress: restaurants[i].adress,
                necessary_dish: restaurants[i].necessary_dish
            };
            break;
        }
    }
    addBtn.value = 'UPDATE';
    addBtn.id = 'updateBtn';
    nameInput.value = data.name;
    descriptionInput.value = data.description;
    costInput.value = data.price_category;
    adressInput.value = data.adress;
    dishInput.value = data.necessary_dish;
}

function addAction() {
    data = {
        name: nameInput.value,
        description: descriptionInput.value,
        price_category: costInput.value,
        adress:adressInput.value,
        necessary_dish:dishInput.value
    };

    postRest('restouranes', 'restouranes', data);
}

function updateAction() {
    data = {
        id: data.id,
        name: nameInput.value,
        description: descriptionInput.value,
        price_category: costInput.value,
        adress:adressInput.value,
        necessary_dish:dishInput.value
    };

    putRest('restouranes', 'restouranes', data, data.id);
}

function actionChooser(event) {
    var id = event.target.id;

    if (event.target.className.indexOf('deleteBtn') + 1) {
        deleteRest('restouranes', 'restouranes', id);
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
    restaurants = JSON.parse(getRest('restouranes', 'Restouranes')); //server answer

    restaurantsItem.innerHTML = '';
    addBtn.value = 'ADD';
    addBtn.id = 'addBtn';
    nameInput.value = '';
    descriptionInput.value = '';
    costInput.value = '';
    adressInput.value = '';
    dishInput.value = '';
    data = {};

    putInTable(restaurants);
}

