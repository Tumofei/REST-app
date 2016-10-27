/**
 * Created by timox on 25.10.2016.
 */


var restaurantsItem = document.getElementById('restaurants');
var productsElement = document.getElementById('products');
var necessary_products = [];

var restaurants = JSON.parse(getRest('restouranes', 'Restouranes')); //server answer
var dishes = JSON.parse(getRest('recipes', 'dish'));
var products = JSON.parse(getRest('shop', 'product'));

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
        var td6 = document.createElement('td');
        var tr = document.createElement('tr');
        var btn = document.createElement('input');

        btn.className = 'btn btn-default';
        btn.type = 'button';
        btn.value = 'Посмотреть цену';
        btn.id = items[i].id;
        btn.addEventListener('click', showDish);
        td1.innerHTML = items[i].name;
        td2.innerHTML = items[i].description;
        td3.innerHTML = items[i].price_category;
        td4.innerHTML = items[i].adress;
        td5.innerHTML = items[i].necessary_dish;

        restaurantsItem.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        td6.appendChild(btn);
    }
}

function showDish(event) {
    productsElement.innerHTML = '';
    necessary_products = [];
    var id = event.target.id - 1;
    var necessary_dishes = restaurants[id].necessary_dish.split(', ');
    for (var a = 0; a <necessary_dishes.length; a++){
        for (var i = 0; i < dishes.valueOf().length; i++){
            var index = dishes[i].name.indexOf(necessary_dishes[a]);
            if (index >= 0) {
                var tmp = dishes[i].ingridients.split(', ');
                for (var j = 0; j < tmp.length; j++) {
                    necessary_products.push(tmp[j]);
                }
            }
        }
    }
    showProducts();
}

function showProducts() {
    for (var i = 0; i < products.valueOf().length; i++) {
        for (var a = 0; a < necessary_products.length; a++){
            var index = necessary_products[a].indexOf(products[i].name);
            if (index >= 0) {
                productsElement.innerHTML = productsElement.innerHTML + '</br>' + products[i].name + ' Цена: ' + products[i].cost;
            }
        }
    }
}