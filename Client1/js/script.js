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
//cartElement.addEventListener('mouseover', findRecipes);

var products = JSON.parse(getRest(shopServer, shopTable)); //server answer
var recipes_name =  JSON.parse(getRest('recipes', 'recipes'));
var recipes = JSON.parse(getRest('recipes', 'recipes_ingr'));
var product = JSON.parse(getRest('recipes', 'product'));

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
            } else {
                cart[cart.length - 1].value = 1;
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
    //findRecipes();
    recipeRender();
    cartRender();
}

function cartRender () {
    if (cart.length != 0){
        sortCart(cart);
    }

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
    var tmpRecipes = JSON.parse(getRest('recipes', 'recipes_ingr'));
    cartRecipes = [];
    findRecipes();

    recipesElement.innerHTML = 'Найденные рецепты блюд: </br>';
    for (var i = 0; i < cartRecipes.length; i++) {
        var span = document.createElement('span');
        var needProducts = productFinder(cartRecipes[i].id, tmpRecipes).products;
        for (var j = 0; j < product.valueOf().length; j++) {
            var idx = needProducts.indexOf(product[j].id);
            if (idx >= 0) {
                needProducts[idx] = product[j].name;
            }
        }
        span.innerHTML = '</br>' + needProducts.join(' + ') + ' = ' + cartRecipes[i].name + '</br>';
        recipesElement.appendChild(span);
    }
}

function findRecipes () {
    var tmpRecipes = JSON.parse(getRest('recipes', 'recipes_ingr'));
    var needProducts = {};
    needProducts.products = [];
    for (var i = 0; i < cart.valueOf().length; i++) {
        for (var j = 0; j < tmpRecipes.valueOf().length; j++) {
            if (cart[i].id == tmpRecipes[j].id_product) {
                if (+cart[i].value < +tmpRecipes[j].value) {
                    break;
                }
                needProducts = productFinder(tmpRecipes[j].id_recipe, tmpRecipes);
                for (var k = 0; k < cart.valueOf().length; k++) {
                    var idx = needProducts.products.indexOf(cart[k].id);
                    if (idx >= 0) {
                        needProducts.products.splice(idx, 1);
                    }
                    if (needProducts.products.length == 0) {
                        cartRecipes.push(recipeFinder(needProducts.id));
                        //console.log(recipeFinder(needProducts.id));
                        break;
                    }
                }
            }
        }

    }
}

function productFinder(id, tmpRecipes) {
    var needProducts = {};
    needProducts.products = [];
    needProducts.id = id;
    for (var i = 0; i < tmpRecipes.valueOf().length; i++) {
        var idx = tmpRecipes[i].id_recipe.indexOf(id);
        if (idx >= 0) {
            needProducts.products.push(tmpRecipes[i].id_product);
            tmpRecipes.splice(i, 1);
            i--;
        }
    }
    return needProducts;
}

function recipeFinder (id) {
    for (var i = 0; i < recipes_name.valueOf().length; i++) {
        var idx = id.indexOf(recipes_name[i].id);
        if (idx >= 0) {
            return recipes_name[i];
        }
    }
}

function compareId(objectA, objectB) {
    return objectA.id - objectB.id;
}

function sortCart(arr) {
    arr.sort(compareId);
    joinArr(arr);
}

function joinArr(arr) {
    var outArray = arr;
    for (var i = 0; i < outArray.valueOf().length - 1; i++) {
        if (outArray[i].id == outArray[i + 1].id) {
            outArray[i].value = parseInt(outArray[i].value) + parseInt(outArray[i + 1].value);
            outArray.splice(i + 1, 1);
        }
    }
    cart = outArray;
}