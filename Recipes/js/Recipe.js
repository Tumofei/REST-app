/**
 * Created by timox on 28.10.2016.
 */
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


var recipes = JSON.parse(getRest('recipes', 'recipes'));

var recipesElement = document.getElementById('recipes');


var addBtn = document.getElementById('addBtn');

recipesElement.addEventListener('click', actionChooser);
addBtn.addEventListener('click', actionChooser);
cancelBtn.addEventListener('click', tableRecipesRender);

putInTable(recipes);
function putInTable(items) {
    for (var i = 0; i < items.valueOf().length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var deleteBtn = document.createElement('input');
        var editBtn = document.createElement('input');

        deleteBtn.className = 'btn btn-danger col-lg-5  deleteBtn';
        deleteBtn.type = 'button';
        deleteBtn.value = 'Delete';
        deleteBtn.id = items[i].id;

        editBtn.className = 'btn btn-danger col-lg-5 col-lg-offset-1  editBtn';
        editBtn.type = 'button';
        editBtn.value = 'Edit';
        editBtn.id = items[i].id;

        td1.innerHTML = items[i].id;
        td2.innerHTML = items[i].name;

        recipesElement.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(editBtn);
        td3.appendChild(deleteBtn);
    }
}


function editAction(id) {
    for (var i = 0; i < recipes.valueOf().length; i++) {
        if (recipes[i].id == id) {
            data = {
                id: recipes[i].id,
                name: recipes[i].name

            };
            break;
        }
    }
    addBtn.value = 'UPDATE';
    addBtn.id = 'updateBtn';
    IdInput.value = data.id;
    NameInput.value = data.name;
}

function addAction() {
    data = {
        id: IdInput.value,
        name: NameInput.value
    };

    postRest('recipes', 'recipes', data);
}

function updateAction() {
    data = {
        id: data.id,
        name: NameInput.value

    };

    putRest('recipes', 'recipes', data, data.id);
}

function actionChooser(event) {
    var id = event.target.id;

    if (event.target.className.indexOf('deleteBtn') + 1) {
        deleteRest('recipes', 'recipes', id);
        tableRecipesRender();
    }
    if (event.target.className.indexOf('editBtn') + 1) {
        editAction(id);

    }
    if (event.target.id.indexOf('addBtn') + 1) {
        addAction();
        tableRecipesRender();
    }
    if (event.target.id.indexOf('updateBtn') + 1) {
        updateAction();
        tableRecipesRender();
    }


}

function tableRecipesRender () {

    recipes = JSON.parse(getRest('recipes', 'recipes'));
    recipesElement.innerHTML = '';
    addBtn.value = 'ADD';
    addBtn.id = 'addBtn';
    IdInput.value = '';
    NameInput.value = '';
    data = {};

    putInTable(recipes);
}