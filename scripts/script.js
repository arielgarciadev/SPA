//Contenedores
var contenedorCartas = document.getElementById("contenedor-cartas");
var contenedorPost = document.getElementById("contenedor-post");
var contenedorNota = document.getElementById("contenedor-nota");

//Nuevo array con datos parseados de los usuarios(nombre,id).
var nuevoArray = [];

//Objeto con los últimos datos utilizados.
var actual = {
    user: "",
    idUser: "",
    idPost: "",
    title: "",
    body: "",
};

//Pedir datos con AJAX
pedirDatos("https://jsonplaceholder.typicode.com/users", crearBotones);

//Crear nuevo array con los datos de los usuarios.
function crearNuevoArray() {
    for (var i = 0; i < JSONParseado.length; i++) {
        nuevoArray.push({
            nombre: JSONParseado[i].name,
            id: JSONParseado[i].id
        })
    }
};
//Crear botones con los datos de los usuarios.
function crearBotones() {
    crearNuevoArray();

    for (var i = 0; i < nuevoArray.length; i++) {

        //Crear elementos.
        var botonesAutores = document.createElement("button");

        //Asignar elementos al DOM.
        contenedorCartas.appendChild(botonesAutores);
        botonesAutores.appendChild(document.createTextNode(nuevoArray[i].nombre));

        //Asignar atributos a los elementos.
        botonesAutores.className = 'botones-autores';
        botonesAutores.setAttribute("id", nuevoArray[i].id);
        botonesAutores.setAttribute("name", nuevoArray[i].nombre);
        botonesAutores.addEventListener("click", function () {
            pedirDatos("https://jsonplaceholder.typicode.com/posts?userId=" + this.id, crearPosts)
        });
        botonesAutores.addEventListener("click", function () {
            actual.user = this.name;
            actual.idUser = this.id;
        });
    }
};
//Crear posts de cada usuario.
function crearPosts() {
    contenedorCartas.style.display = "none";
    document.getElementById("texto-encabezado").innerText = "Posts de " + actual.user;
    document.getElementById("flecha").style.display = "block";
    document.getElementById("flecha").onclick = volverUsuarios;

    for (var i = 0; i < JSONParseado.length; i++) {

        //Crear elementos.
        var post = document.createElement("button");
        var titlePost = document.createElement("p");

        //Asignar contenido a los elementos.
        post.id = JSONParseado[i].id;
        post.title = JSONParseado[i].title;
        post.body = JSONParseado[i].body;

        //Asignar elementos al DOM.
        contenedorPost.appendChild(post);
        post.appendChild(titlePost);
        titlePost.appendChild(document.createTextNode(JSONParseado[i].title));

        //Asignar atributos a los elementos.
        post.className = 'list-group-item list-group-item-action';
        post.addEventListener("click", function () {
            actual.title = this.title;
            actual.body = this.body;
            actual.idPost = this.id;
        });
        post.addEventListener("click", function () {
            pedirDatos("https://jsonplaceholder.typicode.com/comments?postId=" + actual.idPost,
                crearContenido)
        });
    };
};
//Crear el detalle del post (título, cuerpo y comentarios[nombre,correo y cuerpo]).
function crearContenido() {
    //Crear elementos.
    var cuerpo = document.createElement("p");
    var contenedorComentarios = document.createElement("ul");

    //Asignar contenido a los elementos.
    document.getElementById("texto-encabezado").innerText = actual.title;
    cuerpo.innerText = actual.body;

    //Asignar elementos al DOM.
    contenedorNota.appendChild(cuerpo);
    contenedorNota.appendChild(contenedorComentarios);

    //Asignar atributos a los elementos.
    contenedorPost.style.display = "none";
    document.getElementById("flecha").style.display = "block";
    document.getElementById("flecha").onclick = volverPosts;
    cuerpo.className = "cuerpo"

    for (var i = 0; i < JSONParseado.length; i++) {

        //Crear elementos.
        var comentario = document.createElement("li");
        var iconoComentario = document.createElement("i");
        var nombreComentario = document.createElement("p");
        var mailComentario = document.createElement("span");
        var cuerpoComentario = document.createElement("p");

        //Asignar contenido a los elementos.
        nombreComentario.innerText = JSONParseado[i].name;
        mailComentario.innerText = ' (' + JSONParseado[i].email + ')';
        cuerpoComentario.innerText = JSONParseado[i].body;

        //Asignar elementos al DOM.
        contenedorComentarios.appendChild(comentario);
        comentario.appendChild(iconoComentario);
        comentario.appendChild(nombreComentario);
        comentario.appendChild(mailComentario);
        comentario.appendChild(cuerpoComentario);

        //Asignar atributos a los elementos.
        iconoComentario.className = "fas fa-comment";
        nombreComentario.className = "card-title";
        cuerpoComentario.className = "cuerpo-comentario";
    }
};
//Regresar a lista de usuarios.
function volverUsuarios() {
    document.getElementById("texto-encabezado").innerText = "Usuarios";
    contenedorPost.innerHTML = "";
    document.getElementById("flecha").style.display = "none";
    contenedorCartas.style.display = "block";
};
//Regresar a los posts del usuario.
function volverPosts() {
    document.getElementById("texto-encabezado").innerText = "Posts de " + actual.user;
    contenedorNota.innerHTML = "";
    contenedorPost.style.display = "block";
    document.getElementById("flecha").onclick = volverUsuarios;
};