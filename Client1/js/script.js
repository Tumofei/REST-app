/**
 * Created by Борис on 21.10.2016.
 */

var shopServer = 'shop';
var shopTable = 'product';

var productsElement = document.getElementById('products');
var cart = [];
var cartElement = document.getElementById('cart');
var cartCostElement = document.getElementById('cartCost');
//var cartRecipes = [];
var recipesElement = document.getElementById('recipes');
var data = {};

productsElement.addEventListener('click', actionChooser);
cartElement.addEventListener('click', actionChooser);

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
        findRecipes(id);
    }

    cartRender();

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

/*function recipeRender () {
    findRecipes();

    recipesElement.innerHTML = 'Найденные рецепты блюд: </br>';
    /*for (var i = 0; i < cartRecipes.length; i++) {
        var span = document.createElement('span');
        var ingridients = cartRecipes[i].ingridients.split(', ');
        //ingridients.join(' + ');
        span.innerHTML = '</br>' + ingridients.join(' + ') + ' = ' + cartRecipes[i].name + '</br>';
        recipesElement.appendChild(span);
    }
}*/

function findRecipes (id) {
    recipesElement.innerHTML = 'Найденные рецепты блюд: </br>';
    var findIdRecipes = [];
    for (var a = 0; a < recipes.valueOf().length; a++) {
        var index = recipes[a].id_product.indexOf(id);
        if (index >= 0) {
            findIdRecipes.push(recipes[a].id_recipe);
        }
    }
    for (var i = 0; i < recipes_name.valueOf().length; i++) {
        for (var  x = 0; x < findIdRecipes.valueOf().length; x++) {
            var ind = recipes_name[i].id.indexOf(findIdRecipes[x]);
            if (ind >= 0) {
                //console.log(recipes_name[i].name);
                var span = document.createElement('span');

                span.className = 'text-info';
                span.innerHTML = span.innerHTML + '</br>' + recipes_name[i].name + ';';
                recipesElement.appendChild(span);
            }
        }



    }
}






    /*var inde = recipes[a].id_recipe.indexOf(id_recipes);
      if (inde >= 0) {
         for (var i =0; i < product.valueOf().length; i++ ) {
            var ind = product[i].id.indexOf(recipes[a].id_product);
               if (ind >= 0) {
                 var span = document.createElement('span');
                 span.className = 'text-info';
                 span.innerHTML = span.innerHTML + '</br>' + product[i].name + ';';
                 recipesElement.appendChild(span);
          }
      }
  }*/



