/**
 * Created by Борис on 29.10.2016.
 */
var Rest = (function() {
    function getRest(server, table) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open('GET', 'http://rest/' + server + '/index.php/' + table, false);
        xhr.send();

        return xhr.responseText;
    }

    function deleteRest(server, table, id) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open('DELETE', 'http://rest/' + server + '/index.php/' + table + '/' + id, false);
        xhr.send();
    }

    function postRest(server, table, data) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open('POST', 'http://rest/' + server + '/index.php/' + table, false);
        xhr.send(JSON.stringify(data));
    }

    function putRest(server, table, data, id) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open('PUT', 'http://rest/' + server + '/index.php/' + table + '/' + id, false);
        xhr.send(JSON.stringify(data));
    }

    return {
        getRest : getRest,
        deleteRest : deleteRest,
        postRest : postRest,
        putRest : putRest
    };
})();