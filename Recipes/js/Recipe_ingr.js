/**
 * Created by timox on 29.10.2016.
 */
var recipes_ingr = JSON.parse(Rest.getRest('recipes', 'recipes_ingr')); //server answer
var recipes_ingrElement = document.getElementById('recipes_ingr');
var addIngrBtn = document.getElementById('addIngrBtn');
var idIngridientsInput = document.getElementById('idIngridientsInput');
var idProductInput = document.getElementById('idProductInput');

recipes_ingrElement.addEventListener('click', actionIngrChooser);
addIngrBtn.addEventListener('click', actionIngrChooser);
cancelIngrBtn.addEventListener('click', tableRecipesIngrRender);



putInIngrTable(recipes_ingr);
function putInIngrTable(items) {
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
function editIngrAction(id) {
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
    idIngridientsInput.id = id;
    idIngridientsInput.value = data.id_recipe;
    idProductInput.value = data.id_product;
}

function addIngrAction() {
    data = {
        id_recipe: idIngridientsInput.value,
        id_product: idProductInput.value
    };
    Rest.postRest('recipes', 'recipes_ingr', data);
}

function updateIngrAction() {
    data = {
        id: data.id,
        id_recipe: idIngridientsInput.value,
        id_product: idProductInput.value

    };

    Rest.putRest('recipes', 'recipes_ingr', data, idIngridientsInput.id);
}

function actionIngrChooser(event) {
    var id = event.target.id;

    if (event.target.className.indexOf('deleteBtn') + 1) {
        Rest.deleteRest('recipes', 'recipes_ingr', id);
        tableRecipesIngrRender();
    }
    if (event.target.className.indexOf('editBtn') + 1) {
        editIngrAction(id);

    }
    if (event.target.id.indexOf('addIngrBtn') + 1) {
        addIngrAction();
        tableRecipesIngrRender();
    }
    if (event.target.id.indexOf('updateBtn') + 1) {
        updateIngrAction();
        tableRecipesIngrRender();
    }


}

function tableRecipesIngrRender () {

    recipes_ingr = JSON.parse(Rest.getRest('recipes', 'recipes_ingr'));
    recipes_ingrElement.innerHTML = '';
    addIngrBtn.value = 'ADD';
    addIngrBtn.id = 'addIngrBtn';
    idIngridientsInput.value = '';
    idProductInput.value = '';
    data = {};

    putInIngrTable(recipes_ingr);
}