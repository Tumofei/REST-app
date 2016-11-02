var dish = JSON.parse(Rest.getRest('restouranes', 'dish')); //server answer
var recipes = JSON.parse(Rest.getRest('recipes', 'recipes'));
var restouranes = JSON.parse(Rest.getRest('restouranes', 'restouranes'));

var dishElement = document.getElementById('dish');
var addDishBtn = document.getElementById('addDishBtn');
var cancelDishBtn = document.getElementById('cancelDishBtn');

var idRestourane = document.getElementById('idRestourane');
var idDish = document.getElementById('idDish');


dishElement.addEventListener('click', actionDishChooser);
addDishBtn.addEventListener('click', actionDishChooser);
cancelDishBtn.addEventListener('click', tableDishRender);



putDishTable(dish);

function  putInputs() {
    for (var i = 0; i < restouranes.valueOf().length; i++) {
        var restouraneOptions = document.createElement('option');

        restouraneOptions.value = restouranes[i].id;
        restouraneOptions.innerHTML = restouranes[i].id + ' : ' + restouranes[i].name;

        idRestourane.appendChild(restouraneOptions);
    }
    for (var j = 0; j < recipes.valueOf().length; j++) {
        var recipeOption = document.createElement('option');

        recipeOption.value = recipes[j].id;
        recipeOption.innerHTML = recipes[j].id + ' : ' + recipes[j].name;

        idDish.appendChild(recipeOption);
    }
}

function putDishTable(items) {
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

        td1.innerHTML = items[i].id_restourane;
        td2.innerHTML = items[i].id_recipe;

        dishElement.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(editBtn);
        td3.appendChild(deleteBtn);
    }
    putInputs();
}

function editDishAction(id) {
    for (var i = 0; i < dish.valueOf().length; i++) {
        if (dish[i].id == id) {
            data = {
                id:dish[i].id,
                id_restourane: dish[i].id_restourane,
                id_recipe: dish[i].id_recipe

            };
            break;
        }
    }
    addIngrBtn.value = 'UPDATE';
    addIngrBtn.id = 'updateBtn';
    //idRestourane.id = id;
    idRestourane.value = data.id_restourane;
    idDish.value = data.id_recipe;
}

function addDishAction() {
    data = {
        id_restourane: idRestourane.value,
        id_recipe: idDish.value
    };
    Rest.postRest('restouranes', 'dish', data);
}

function updateDishAction() {
    data = {
        id: data.id,
        id_restourane: idRestourane.value,
        id_recipe: idDish.value

    };

    Rest.putRest('restouranes', 'dish', data, data.id);
}

function actionDishChooser(event) {
    var id = event.target.id;

    if (event.target.className.indexOf('deleteBtn') + 1) {
        Rest.deleteRest('restouranes', 'dish', id);
        tableDishRender();
    }
    if (event.target.className.indexOf('editBtn') + 1) {
        editDishAction(id);

    }
    if (event.target.id.indexOf('addDishBtn') + 1) {
        addDishAction();
        tableDishRender();
    }
    if (event.target.id.indexOf('updateBtn') + 1) {
        updateDishAction();
        tableDishRender();
    }


}

function tableDishRender () {

    dish = JSON.parse(Rest.getRest('restouranes', 'dish'));
    dishElement.innerHTML = '';
    addDishBtn.value = 'ADD';
    addDishBtn.id = 'addDishBtn';
    idRestourane.value = '';
    idDish.value = '';
    idRestourane.innerHTML = '';
    idDish.innerHTML = '';
    data = {};
    putDishTable(dish);
}/**
 * Created by Борис on 02.11.2016.
 */
