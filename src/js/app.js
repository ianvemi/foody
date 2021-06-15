let n = 1;


document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp(){
    mostrarServicios();

    //Resaltar div que presiona
    mostrarSeccion();
    //Oculta o muestra sección
    cambiarSeccion();

    //Paginacion
    paginaSiguiente();
    paginaAnterior();

    //Comprueba pag actual para mostrar u ocultar paginación
    botonesPaginador();
}


function mostrarSeccion(){

    //Eliminar seccion anterior
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if (seccionAnterior){
        seccionAnterior.classList.remove('mostrar-seccion')
    }
    const seccionActual = document.querySelector(`#s-${n}`);
    seccionActual.classList.add('mostrar-seccion')

    const tabAnterior =  document.querySelector('.tabs .actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual');
    }
     //Eliminar tab anteriormente seleecionado
    

    //Resalta el tab actual
    const tab=document.querySelector(`[data-tab="${n}"]`);
    tab.classList.add('actual');
}




function cambiarSeccion(){
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach( (runner) =>{
        runner.addEventListener('click', (e) =>{
            e.preventDefault();
            n = parseInt(e.target.dataset.tab);
            console.log(n);


            //Llamando la función mostrar sección
            mostrarSeccion();
            botonesPaginador();

        })
    })
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
        let cant = 1;
        let elemento;

        //DOM Scripting
        //Creando parrafos <p> del nombre
        const nombreComida = document.createElement('P');
        nombreComida.textContent=nombre;
        nombreComida.classList.add('nombre-comida');
        // console.log(nombreComida)

         //Precio
         const precioComida = document.createElement('P');
         const plus = document.createElement('BUTTON');
         const minus = document.createElement('BUTTON');
         const vCantidad = document.createElement('P');
         //console.log(plus);
         plus.textContent="+";
         plus.classList.add('boton-menu');
         plus.onclick = nuevoPrecio;

         minus.textContent="-";
         minus.classList.add('boton-menu');
         minus.onclick = nuevomPrecio;

         vCantidad.textContent = cant;
         vCantidad.classList.add('cantidad-menu');

         let precioMenu = parseInt(precio);
         precioComida.textContent= "$"+precioMenu;
         
         precioComida.classList.add('precio-comida');


         function nuevoPrecio(){
            cant = cant + 1;
            vCantidad.textContent = cant;
            precioMenu = parseInt(precio * cant);
            precioComida.textContent= "$"+precioMenu;
            deselect();
        }

        function nuevomPrecio(){
            if(cant <= 1){
                cant = 1;
            }else{
            cant = cant - 1;
            vCantidad.textContent = cant;
            precioMenu = parseInt(precio * cant);
            precioComida.textContent= "$"+precioMenu;
            deselect();}
            
        }

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
        comidaDiv.appendChild(minus);
        comidaDiv.appendChild(plus);
        comidaDiv.appendChild(vCantidad);
        // console.log(servicioDiv)

        //HTML IN
        document.querySelector('#comida').appendChild(comidaDiv);
    })
} catch (error) {
    alert(error);
}

//Función utilizada para forzar seleccion del div y no en elementos hijo asi mismo, poner y quitar selección de elementos con estilos
function seleccionarServicio(e){
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
    // console.log(elemento);
}

//Funcion utilizada para quitar selección de productos cuando se cambia alguna cantidad y asi actualizar precio.
function deselect(){
    let divSelected = document.querySelectorAll('.div-comida');
    //Recorremos el nodeList identificando los elementos previamente seleccionados y quitamos la seleccion
    divSelected.forEach(dunner =>{
        // console.log(dunner);
        if(dunner.classList.contains('selected')){
            dunner.classList.remove('selected');
        }
    })
    // console.log(divSelected);
}
}

function paginaSiguiente(){
const pags = document.querySelector('#siguiente');
pags.addEventListener('click', () =>{
    n++;
  
    botonesPaginador();
})
}

function paginaAnterior(){
    const paga = document.querySelector('#anterior');
    paga.addEventListener('click', () =>{
        n--;
        botonesPaginador();
    })

}

function botonesPaginador(){
    const pags = document.querySelector('#siguiente');
    const paga = document.querySelector('#anterior');

    if(n ===1){
        console.log("se oculta el boton de anterior")
        paga.classList.add('ocultar');
    } else if (n===3){
        pags.classList.add('ocultar');
        paga.classList.remove('ocultar');
    }else {
        paga.classList.remove('ocultar');
        pags.classList.remove('ocultar');
    }
    

    mostrarSeccion();
}







