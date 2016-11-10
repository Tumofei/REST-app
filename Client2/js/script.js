/**
 * Created by timox on 25.10.2016.
 */


var restaurantsItem = document.getElementById('restaurants');
var productsElement = document.getElementById('products');
var necessary_products = [];

var restaurants = JSON.parse(getRest('restouranes', 'Restouranes')); //server answer
var recipes_ingr = JSON.parse(getRest('recipes', 'recipes_ingr'));
var product = JSON.parse(getRest('recipes', 'product'));
var recipes = JSON.parse(getRest('recipes', 'recipes'));
var dishes = JSON.parse(getRest('restouranes', 'dish'));

//console.log(dishes);
putInTable(restaurants);

function getRest(server, table) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('GET', 'http://rest/' + server + '/index.php/' + table, false);

    xhr.send();

    return xhr.responseText;
}

function  putInputs(id_select, id) {
    var idDishInput = document.getElementById(id_select);

    for (var a = 0; a < dishes.valueOf().length; a++) {
        var index = dishes[a].id_restouranes.indexOf(id);
        if (index >= 0) {
            var option = document.createElement('option');
            option.value = dishes[a].id_recipes;
            option.innerHTML = dishes[a].name;

            idDishInput.appendChild(option);
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
        var btn = document.createElement('input');
        var select = document.createElement('select');

        select.className = 'form-control';
        select.id = 'idDishInput' + items[i].id;
        var id_select = select.id;
        var id = items[i].id;

        btn.className = 'btn btn-default';
        btn.type = 'button';
        btn.value = 'Посмотреть';
        btn.id = items[i].id;
        btn.addEventListener('click', showProducts);
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
        tr.appendChild(td6);
        td5.appendChild(select);
        td6.appendChild(btn);
        putInputs(id_select, id);
        //console.log(select.value);
    }



}

function showProducts() {
    productsElement.innerHTML = '';
    productsElement.innerHTML = 'Список продуктов, необходимых для закупки: </br>';
    var id_restouranes = event.target.id;
    var idDishInput = document.getElementById('idDishInput'+id_restouranes); // id_
    var id_recipes = idDishInput.value;
    for (var a = 0; a < recipes_ingr.valueOf().length; a++) {
        var index = recipes_ingr[a].id_recipe.indexOf(id_recipes);
          if (index >= 0) {
              for (var i =0; i < product.valueOf().length; i++ ) {
                  var ind = product[i].id.indexOf(recipes_ingr[a].id_product);
                  if (ind >= 0) {
                      var span = document.createElement('span');
                      span.className = 'text-info';
                      span.innerHTML = span.innerHTML + '</br>' + product[i].name + ';';
                      productsElement.appendChild(span);
                  }
              }
          }
    }
}
