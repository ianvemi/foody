document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp(){
    mostrarServicios();
}
//funcion asincrona
async function mostrarServicios(){
try {
    //petición a los datos json
    const resultado = await fetch('./menu.json');
    //formateando petición
    const db = await resultado.json();
    //Accediendo a los atributos de menu con Destructuring de la variable db
    const {menu} = db;
    
    //HTML
    //recorriendo JSON
    menu.forEach(runner =>{
        //Guardando contenido en variables para cada valor de los atributos;s
        const{id, nombre, precio, img} = runner;
        //console.log(runner);

        //DOM Scripting
        //Creando parrafos <p> del nombre
        const nombreComida = document.createElement('P');
        nombreComida.textContent=nombre;
        nombreComida.classList.add('nombre-comida');
        // console.log(nombreComida)

        //Precio
        const precioComida = document.createElement('P');
        // console.log(precioComida);
        precioComida.textContent= "$"+precio;
        precioComida.classList.add('precio-comida');

        //Img
        const imgComida = document.createElement('IMG');
        imgComida.setAttribute("src", img)
        //console.log(imgComida);

        //Div contenedor
        const comidaDiv = document.createElement('DIV')
        comidaDiv.classList.add('div-comida');
        //Asignando dataset a cada contenedor 
        comidaDiv.dataset.idComida = id;
        //Agregando event handler al div contenedor de los productos
        comidaDiv.onclick = seleccionarServicio;

        //Precio y nombre al div
        comidaDiv.appendChild(nombreComida);
        comidaDiv.appendChild(precioComida);
        comidaDiv.appendChild(imgComida);
        // console.log(servicioDiv)

        //HTML IN
        document.querySelector('#comida').appendChild(comidaDiv);
    })
} catch (error) {
    console.log(error);
}
}

function seleccionarServicio(e){

    let elemento;
    //Seleccionar forzosamente el div contenedor(id dataset)
    if(e.target.tagName === 'P' || e.target.tagName === 'IMG'){
        elemento= e.target.parentElement;
    }else{
        elemento= e.target;
    }

   
    if(elemento.classList.contains('selected')){
        elemento.classList.remove('selected');
    }else{
        elemento.classList.add('selected');
    }
    
}
