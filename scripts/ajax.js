function pedirDatos(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log("readyState es 4 y status es 200");
                JSONParseado = JSON.parse(request.responseText);
                console.log(JSONParseado);
                callback();
            }
        }
    };
}