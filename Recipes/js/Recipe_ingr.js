/**
 * Created by timox on 29.10.2016.
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

var recipes_ingr = JSON.parse(getRest('recipes', 'recipes_ingr')); //server answer
var recipes_ingrElement = document.getElementById('recipes_ingr');
var addIngrBtn = document.getElementById('addIngrBtn');

recipes_ingrElement.addEventListener('click', actionChooser);
addIngrBtn.addEventListener('click', actionChooser);
cancelIngrBtn.addEventListener('click', tableRecipesIngrRender);



putInTable(recipes_ingr);
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

        td1.innerHTML = items[i].id_recipe;
        td2.innerHTML = items[i].id_product;

        recipes_ingrElement.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(editBtn);
        td3.appendChild(deleteBtn);
    }
}
function editAction(id) {
    for (var i = 0; i < recipes_ingr.valueOf().length; i++) {
        if (recipes_ingr[i].id == id) {
            data = {
                id:recipes_ingr[i].id,
                id_recipe: recipes_ingr[i].id_recipe,
                id_product: recipes_ingr[i].id_product

            };
            break;
        }
    }
    addIngrBtn.value = 'UPDATE';
    addIngrBtn.id = 'updateBtn';
    IdIngrInput.value = data.id_recipe;
    IdProductInput.value = data.id_product;
}

function addAction() {
    data = {
        id_recipe: IdIngrInput.value,
        id_product: IdProductInput.value
    };

    postRest('recipes', 'recipes_ingr', data);
}

function updateAction() {
    data = {
        id: data.id,
        id_recipe: IdIngrInput.value,
        id_product: IdProductInput.value

    };

    putRest('recipes', 'recipes_ingr', data, data.id);
}

function actionChooser(event) {
    var id = event.target.id;

    if (event.target.className.indexOf('deleteBtn') + 1) {
        deleteRest('recipes', 'recipes_ingr', id);
        tableRecipesIngrRender();
    }
    if (event.target.className.indexOf('editBtn') + 1) {
        editAction(id);

    }
    if (event.target.id.indexOf('addIngrBtn') + 1) {
        addAction();
        tableRecipesIngrRender();
    }
    if (event.target.id.indexOf('updateBtn') + 1) {
        updateAction();
        tableRecipesIngrRender();
    }


}

function tableRecipesIngrRender () {

    recipes_ingr = JSON.parse(getRest('recipes', 'recipes_ingr'));
    recipes_ingrElement.innerHTML = '';
    addIngrBtn.value = 'ADD';
    addIngrBtn.id = 'addIngrBtn';
    IdIngrInput.value = '';
    IdProductInput.value = '';
    data = {};

    putInTable(recipes_ingr);
}