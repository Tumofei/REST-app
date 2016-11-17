/**
 * Created by timox on 25.10.2016.
 */


var restaurantsItem = document.getElementById('restaurants');
var productsElement = document.getElementById('products');
var dishesItem = document.getElementById('dishes');

var restaurants = JSON.parse(getRest('restouranes', 'Restouranes')); //server answer
var recipes_ingr = JSON.parse(getRest('recipes', 'recipes_ingr'));
var product = JSON.parse(getRest('recipes', 'product'));
var recipes = JSON.parse(getRest('recipes', 'recipes'));
var dishes = JSON.parse(getRest('restouranes', 'dish'));

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
        btn.value = 'Посмотреть';
        btn.id = items[i].id;
        btn.addEventListener('click', putInDishTable);
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

function putInDishTable(event) {
    var id = event.target.id;
    dishesItem.innerHTML = '';
    for (var i = 0; i < dishes.valueOf().length; i++) {
        var index = dishes[i].id_restouranes.indexOf(id);
        if (index >= 0) {
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var tr = document.createElement('tr');
            var checkbox = document.createElement('input');

            checkbox.type = 'checkbox';
            checkbox.id = dishes[i].id_recipes;
            checkbox.className = 'check';
            td1.innerHTML = dishes[i].name;

            dishesItem.appendChild(tr);
            tr.appendChild(td1);
            tr.appendChild(td2);
            td2.appendChild(checkbox);
        }
    }

    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var tr1 = document.createElement('tr');
    var btn = document.createElement('input');
    btn.className = 'btn btn-default';
    btn.type = 'button';
    btn.value = 'Заказать';
    btn.addEventListener('click', checkCheckBox);
    dishesItem.appendChild(tr1);
    tr1.appendChild(td3);
    tr1.appendChild(td4);
    td4.appendChild(btn);
}
function checkCheckBox() {
    var arrCheck = [];
    var chk = document.getElementsByClassName('check');
    for (var i = 0; i < chk.length; i++) {
        if (chk[i].checked.valueOf()) {
            arrCheck.push(chk[i].id);
        }

    }
    showProducts(arrCheck);
}

function showProducts(arrCheck) {
    necessary_ingr = [];
    for (var y = 0; y < arrCheck.valueOf().length; y++) {
        for (var a = 0; a < recipes_ingr.valueOf().length; a++) {
            var index = recipes_ingr[a].id_recipe.indexOf(arrCheck[y]);
            if (index >= 0) {
                for (var i = 0; i < product.valueOf().length; i++) {
                    var ind = product[i].id.indexOf(recipes_ingr[a].id_product);
                    if (ind >= 0) {
                        necessary_ingr.push({
                            'id': product[i].id,
                            'name': product[i].name,
                            'value': recipes_ingr[a].value,
                            'measure': recipes_ingr[a].measure
                        });

                    }
                }
            }
        }
    }
    sortNecessary_ingr(necessary_ingr);
}

function compareId(objectA, objectB) {
    return objectA.id - objectB.id;
}

function sortNecessary_ingr(arr) {
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
    outputNecessary_ingr(outArray);
}


function outputNecessary_ingr(arr) {
    productsElement.innerHTML = '';
    productsElement.innerHTML = 'Список продуктов, необходимых для закупки: </br>';
    for (i = 0; i < arr.valueOf().length; i++) {

        var span = document.createElement('span');
        span.className = 'text-info';
        span.innerHTML = span.innerHTML + arr[i].name + ' ' + arr[i].value + ' ' + arr[i].measure + ';' + '</br>';
        productsElement.appendChild(span);

    }
}

