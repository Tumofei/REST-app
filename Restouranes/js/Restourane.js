var restaurantsItem = document.getElementById('restaurants');
var restaurants = JSON.parse(Rest.getRest('restouranes', 'Restouranes')); //server answer
var dish = JSON.parse(Rest.getRest('restouranes', 'dish'));
var recipes = JSON.parse(Rest.getRest('recipes', 'recipes'));

restaurantsItem.addEventListener('click', actionChooser);
var addBtn = document.getElementById('addBtn');
var cancelBtn = document.getElementById('cancelBtn');

addBtn.addEventListener('click', actionChooser);
cancelBtn.addEventListener('click', tableRender);

putInTable(restaurants);

function searchDishId(id) {
    var name = [];
    for (var i = 0; i < dish.valueOf().length; i++) {
        if (id == dish[i].id_restourane) {
            name.push(searchDishName(dish[i].id_recipe));
        }
    }
    return name;
}

function searchDishName(id) {
    for (var i = 0; i < recipes.valueOf().length; i++) {
        if (id == recipes[i].id) {
            return recipes[i].name;
        }
    }
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
        //td5.innerHTML = items[i].necessary_dish;
        td5.innerHTML = searchDishId(i + 1);

        restaurantsItem.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        td6.appendChild(editBtn);
        td6.appendChild(deleteBtn);
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
        adress: adressInput.value,
        necessary_dish: dishInput.value
    };

    Rest.postRest('restouranes', 'restouranes', data);
}

function updateAction() {
    data = {
        id: data.id,
        name: nameInput.value,
        description: descriptionInput.value,
        price_category: costInput.value,
        adress: adressInput.value,
        necessary_dish: dishInput.value
    };

    Rest.putRest('restouranes', 'restouranes', data, data.id);
}

function actionChooser(event) {
    var id = event.target.id;

    if (event.target.className.indexOf('deleteBtn') + 1) {
        Rest.deleteRest('restouranes', 'restouranes', id);
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

function tableRender() {
    restaurants = JSON.parse(Rest.getRest('restouranes', 'Restouranes')); //server answer

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
