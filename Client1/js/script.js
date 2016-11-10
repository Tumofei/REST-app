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
var data = {};

productsElement.addEventListener('click', actionChooser);
cartElement.addEventListener('click', actionChooser);

var products = JSON.parse(getRest(shopServer, shopTable)); //server answer
var recipes = JSON.parse(getRest('recipes', 'recipes_ingr'));

putInTable(products);

function getRest(server, table) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('GET', 'http://rest/' + server + '/index.php/' + table, false);
    xhr.send();

    return xhr.responseText;
}

function putInTable(items) {
    for (var i = 0; i < items.valueOf().length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var addToCartBtn = document.createElement('input');
        var countItem = document.createElement('input');

        countItem.id = 'value' + items[i].id;

        addToCartBtn.className = 'btn btn-success col-lg-8 cartBtn';
        addToCartBtn.type = 'button';
        addToCartBtn.value = 'To cart';
        addToCartBtn.id = items[i].id;

        td1.innerHTML = items[i].name;
        td2.innerHTML = items[i].cost;

        productsElement.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        td3.appendChild(countItem);
        td4.appendChild(addToCartBtn);
    }
}

function toCartAction(id) {
    for (var i = 0; i < products.valueOf().length; i++) {
        if (products[i].id == id ) {
            //cart.push(products[i]);
            cart.push(JSON.stringify(products[i]));
            cart[cart.length - 1] = JSON.parse(cart[cart.length - 1]);
            var valueElement = document.getElementById('value' + id);
            if (valueElement.value){
                cart[cart.length - 1].value = valueElement.value;
            }
        }
    }
}

function outCartAction(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart.splice(i, 1);
            break;
        }
    }
}

function actionChooser(event) {
    var id = event.target.id;
    if (event.target.className.indexOf('cartBtn') + 1) {
        toCartAction(id);
    }
    if (event.target.tagName === 'SPAN') {
        outCartAction(id);
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
        span.innerHTML = 'x' + cart[i].value + ' ' + cart[i].name + ';'+'</br>';
        cartElement.appendChild(span);
        cost += +cart[i].cost * cart[i].value;
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

function findRecipes () {
    cartRecipes = [];
    //for (var i = 0; i < recipes.valueOf().length; i++) {
    //    var ingridients = recipes[i].ingridients.split(', ');
    //    for (var j = 0; j < cart.length; j++){
    //        var index = ingridients.indexOf(cart[j].name);
    //        if (index >= 0) {
    //            ingridients.splice(index, 1);
    //        }
    //    }
    //    if (ingridients == 0) {
    //        cartRecipes.push(recipes[i]);
    //    }
    //}
    //for (var i = 0; i < cart.valueOf().length; i++) {
    //    var ind = products
    //    if (ind >= 0)
    //}

    //for (var a = 0; a < recipes_ingr.valueOf().length; a++) {
    //    var index = recipes_ingr[a].id_recipe.indexOf(id_recipes);
    //    if (index >= 0) {
    //        for (var i =0; i < product.valueOf().length; i++ ) {
    //            var ind = product[i].id.indexOf(recipes_ingr[a].id_product);
    //            if (ind >= 0) {
    //                var span = document.createElement('span');
    //                span.className = 'text-info';
    //                span.innerHTML = span.innerHTML + '</br>' + product[i].name + ';';
    //                productsElement.appendChild(span);
    //            }
    //        }
    //    }
    //}
}