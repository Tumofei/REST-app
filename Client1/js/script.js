/**
 * Created by Борис on 21.10.2016.
 */
    //рабочий вариант
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('POST', 'http://rest/shop/index.php/product', false);
data = '{"name": "Anandsaas", "cost": "7"}';
//data = JSON.parse(data);
xhr.send(data);

var div = document.getElementById('132');
div.innerHTML = xhr.responseText; //server answer
alert( xhr.status + ': ' + xhr.statusText ); //server status