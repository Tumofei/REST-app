/**
 * Created by timox on 28.10.2016.
 */


var recipes = JSON.parse(Rest.getRest('recipes', 'recipes'));

var recipesElement = document.getElementById('recipes');
var idInput = document.getElementById('idInput');
var nameInput = document.getElementById('nameInput');

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
    idInput.id = id;
    idInput.value = data.id;
    nameInput.value = data.name;
}

function addAction() {
    if (idInput.value) {
        data = {
            id: idInput.value,
            name: nameInput.value
        };
    } else {
        data = {
            name: nameInput.value
        };
    }
    Rest.postRest('recipes', 'recipes', data)
}

function updateAction() {
    data = {
        id: idInput.value,
        name: nameInput.value

    };

    Rest.putRest('recipes', 'recipes', data, idInput.id);
}

function actionChooser(event) {
    var id = event.target.id;

    if (event.target.className.indexOf('deleteBtn') + 1) {
        Rest.deleteRest('recipes', 'recipes', id);
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

    recipes = JSON.parse(Rest.getRest('recipes', 'recipes'));
    recipesElement.innerHTML = '';
    addBtn.value = 'ADD';
    addBtn.id = 'addBtn';
    idInput.value = '';
    nameInput.value = '';
    data = {};

    putInTable(recipes);
}