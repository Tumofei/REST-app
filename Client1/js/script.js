/**
 * Created by Борис on 21.10.2016.
 */
//рабочий вариант

var table = document.getElementById('products');
table.addEventListener('click', toCart);
var products = JSON.parse(getRest('shop', 'product')); //server answer
var recipes = JSON.parse(getRest('recipes', 'dish'));
var div = document.getElementById('111');

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
        btn.value = 'action';
        btn.id = items[i].id;
        td1.innerHTML = items[i].name;
        td2.innerHTML = items[i].cost;

        table.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(btn);
    }
}

function toCart(event) {
    if (event.target.tagName === 'INPUT') {
        var id = event.target.id;
        for (var i = 0; i < products.valueOf().length; i++) {
            if (products[i].id == id ) {
                var div = document.getElementById('cart');
                var span = document.createElement('span');
                span.innerHTML = products[i].name;
                div.appendChild(span);

            }
        }
    }

}