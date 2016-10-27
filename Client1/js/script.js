/**
 * Created by Борис on 21.10.2016.
 */

var shopServer = 'shop';
var shopTable = 'product';

var productsElement = document.getElementById('products');
var cart = [];
var cartElement = document.getElementById('cart');
var cartCostElement = document.getElementById('cartCost');
var cartRecipes = [];
var recipesElement = document.getElementById('recipes');

productsElement.addEventListener('click', actionChooser);
cartElement.addEventListener('click', actionChooser);

var products = JSON.parse(getRest(shopServer, shopTable)); //server answer
var recipes = JSON.parse(getRest('recipes', 'dish'));

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
    xhr.data = data; //{"id":9, "name":"Ananas", "cost":"10"}
    xhr.send();
}

function putRest(server, table, data, id) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('PUT', 'http://rest/' + server + '/index.php/' + table + '/' + id, false);
    xhr.data = data;
    xhr.send();
}

function putInTable(items) {
    for (var i = 0; i < items.valueOf().length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var addToCartBtn = document.createElement('input');
        var deleteBtn = document.createElement('input');
        var editBtn = document.createElement('input');

        addToCartBtn.className = 'btn btn-success col-lg-3 cartBtn';
        addToCartBtn.type = 'button';
        addToCartBtn.value = 'В корзину';
        addToCartBtn.id = items[i].id;

        deleteBtn.className = 'btn btn-danger col-lg-3 col-lg-offset-1 deleteBtn';
        deleteBtn.type = 'button';
        deleteBtn.value = 'Delete';
        deleteBtn.id = items[i].id;

        editBtn.className = 'btn btn-danger col-lg-3 col-lg-offset-1 editBtn';
        editBtn.type = 'button';
        editBtn.value = 'Edit';
        editBtn.id = items[i].id;

        td1.innerHTML = items[i].name;
        td2.innerHTML = items[i].cost;

        productsElement.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(addToCartBtn);
        td3.appendChild(editBtn);
        td3.appendChild(deleteBtn);
    }
}

function actionChooser(event) {
    var id = event.target.id;
    //toCart
    if (event.target.className.indexOf('cartBtn') + 1) {
        for (var i = 0; i < products.valueOf().length; i++) {
            if (products[i].id == id ) {
                cart.push(products[i]);
            }
        }
    }
    //outCart
    if (event.target.tagName === 'SPAN') {
        for (var j = 0; j < cart.length; j++) {
            if (cart[j].id == id) {
                cart.splice(j, 1);
                break;
            }
        }
    }
    //delete
    if (event.target.className.indexOf('deleteBtn') + 1) {
        deleteRest(shopServer, shopTable, id);
        tableRender();
    }

    cartRender();
    recipeRender();
}

function cartRender () {
    cartElement.innerHTML = 'Список добавленных продуктов: </br>';
    cartCostElement.innerHTML = '';
    var cost = 0;
    for (var i = 0; i < cart.length; i++) {
        var span = document.createElement('span');
        span.id = cart[i].id;
        span.className = 'text-info';
        span.innerHTML = span.innerHTML + cart[i].name + ';'+'</br>';
        cartElement.appendChild(span);
        cost += +cart[i].cost;
        cartCostElement.innerHTML = 'Сумма к оплате: ' + cost + '$';
    }
}

function recipeRender () {
    findRecipes();

    recipesElement.innerHTML = 'Найденные рецепты блюд: </br>';
    for (var i = 0; i < cartRecipes.length; i++) {
        var span = document.createElement('span');
        var ingridients = cartRecipes[i].ingridients.split(', ');
        //ingridients.join(' + ');
        span.innerHTML = '</br>' + ingridients.join(' + ') + ' = ' + cartRecipes[i].name + '</br>';
        recipesElement.appendChild(span);
    }
}

function tableRender () {
    products = JSON.parse(getRest(shopServer, shopTable)); //server answer
    productsElement.innerHTML = '';
    putInTable(products);
}

function findRecipes () {
    cartRecipes = [];
    for (var i = 0; i < recipes.valueOf().length; i++) {
        var ingridients = recipes[i].ingridients.split(', ');
        for (var j = 0; j < cart.length; j++){
            var index = ingridients.indexOf(cart[j].name);
            if (index >= 0) {
                ingridients.splice(index, 1);
            }
        }
        if (ingridients == 0) {
            cartRecipes.push(recipes[i]);
        }
    }
}