/**
 * Created by Борис on 21.10.2016.
 */
//рабочий вариант

var productsElement = document.getElementById('products');
var cart = [];
var cartElement = document.getElementById('cart');
var cartCostElement = document.getElementById('cartCost');

productsElement.addEventListener('click', toCart);
cartElement.addEventListener('click', toCart);

var products = JSON.parse(getRest('shop', 'product')); //server answer
var recipes = JSON.parse(getRest('recipes', 'dish'));
var divv = document.getElementById('111');

putInTable(products);

//alert(xhr.status + ': ' + xhr.statusText); //server status

function getRest(server, table) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('GET', 'http://rest/' + server + '/index.php/' + table, false);
    //data = '{"name": "Anandsaas", "cost": "7"}';
    xhr.send();

    return xhr.responseText;
}

function putInTable(items) {
    for (var i = 0; i < items.valueOf().length; i++) {
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var tr = document.createElement('tr');
        var btn = document.createElement('input');

        btn.className = 'btn btn-default';
        btn.type = 'button';
        btn.value = 'В корзину';
        btn.id = items[i].id;
        td1.innerHTML = items[i].name;
        td2.innerHTML = items[i].cost;

        productsElement.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(btn);
    }
}

function toCart(event) {
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