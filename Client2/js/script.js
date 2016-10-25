/**
 * Created by timox on 25.10.2016.
 */


var restaurantsItem = document.getElementById('restaurants');
/*var cart = [];
var cartElement = document.getElementById('cart');
var cartCostElement = document.getElementById('cartCost');
var cartRecipes = [];
var recipesElement = document.getElementById('recipes');

productsElement.addEventListener('click', toCart);
cartElement.addEventListener('click', toCart);*/

var restaurants = JSON.parse(getRest('restouranes', 'Restouranes')); //server answer
var dishes = JSON.parse(getRest('recipes', 'dish'));

putInTable(restaurants);



function getRest(server, table) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('GET', 'http://rest/' + server + '/index.php/' + table, false);

    xhr.send();

    return xhr.responseText;
}

function putInTable(items) {
    for (var i = 0; i < items.valueOf().length; i++) {
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var tr = document.createElement('tr');
        var btn = document.createElement('input');

        btn.className = 'btn btn-default';
        btn.type = 'button';
        btn.value = 'Посмотреть рецепты';
        btn.id = items[i].id;
        btn.addEventListener('click', showDish);
        td1.innerHTML = items[i].name;
        td2.innerHTML = items[i].description;
        td3.innerHTML = items[i].price_category;
        td4.innerHTML = items[i].adress;

        restaurantsItem.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        td5.appendChild(btn);
    }
}

function showDish() {
    console.log('ok baby');
}
/*function toCart(event) {
    var id = event.target.id;
    if (event.target.tagName === 'INPUT') {
        for (var i = 0; i < products.valueOf().length; i++) {
            if (products[i].id == id ) {
                cart.push(products[i]);
            }
        }
    }
    if (event.target.tagName === 'SPAN') {
        for (var j = 0; j < cart.length; j++) {
            if (cart[j].id == id) {
                cart.splice(j, 1);
                break;
            }
        }
    }
    cartRender();
    recipeRender();
}

function cartRender () {
    cartElement.innerHTML = 'Корзина </br>';
    cartCostElement.innerHTML = '';
    var cost = 0;
    for (var i = 0; i < cart.length; i++) {
        var span = document.createElement('span');
        span.id = cart[i].id;
        span.innerHTML = span.innerHTML + cart[i].name + '</br>';
        cartElement.appendChild(span);
        cost += +cart[i].cost;
        cartCostElement.innerHTML = 'Цена </br>' + cost;
    }
}

function recipeRender () {
    findRecipes();

    recipesElement.innerHTML = 'Рецепты блюд:</br>';
    for (var i = 0; i < cartRecipes.length; i++) {
        var span = document.createElement('span');
        var ingridients = cartRecipes[i].ingridients.split(', ');
        //ingridients.join(' + ');
        span.innerHTML = ingridients.join(' + ') + ' = ' + cartRecipes[i].name + '</br>';
        recipesElement.appendChild(span);
    }
}

function findRecipes () {
    cartRecipes = [];
    for (var i = 0; i < recipes.valueOf().length; i++) {
        var ingridients = recipes[i].ingridients.split(', ');
        var count = 0;
        for (var j = 0; j < cart.length; j++){
            var index = ingridients.indexOf(cart[j].name);
            if (index >= 0) {
                ingridients.splice(index, 1);
                count++
            }
        }
        if (ingridients == 0) {
            cartRecipes.push(recipes[i]);
        }
    }
}*/