document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp(){
    mostrarServicios();
}

async function mostrarServicios(){
try {
    const resultado = await fetch('./menu.json');
    const db = await resultado.json();
    const {menu} = db;
    
    //HTML
    menu.forEach(runner =>{
        const{id, nombre, precio, img} = runner;
        //console.log(runner);

        //DOM Scripting
        //Nombre
        const nombreComida = document.createElement('P');
        nombreComida.textContent=nombre;
        nombreComida.classList.add('nombre-comida');
        // console.log(nombreComida)

        //Precio
        const precioComida = document.createElement('P');
        // console.log(precioComida);
        precioComida.textContent= "$ "+precio;
        precioComida.classList.add('precio-comida');

        //Img
        const imgComida = document.createElement('IMG');
        imgComida.setAttribute("src", img)
        console.log(imgComida);

        //Div contenedor
        const comidaDiv = document.createElement('DIV')
        comidaDiv.classList.add('div-comida');
        

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