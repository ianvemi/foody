let n = 1;

const orden ={
    nombre:'',
    fecha:'',
    pedido: []
}

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

    //Muestra el resumen del pedido o error
    mostrarPedido();

    //Almacena el nombre del pedido en el objeto
    nombrePedido();

    //Almacena la fecha del pedido en el obj
    fechaPedido();

    //Desabilitar fecha anterior
    deshabilitarFechaAnterior();
}


function mostrarSeccion(){

    //Eliminar seccion anterior
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if (seccionAnterior){
        seccionAnterior.classList.remove('mostrar-seccion')
    }
    const seccionActual = document.querySelector(`#s-${n}`);
    seccionActual.classList.add('mostrar-seccion')

     //Eliminar tab anteriormente seleecionado
    const tabAnterior =  document.querySelector('.tabs .actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual');
    }
    
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
            // console.log(n);


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
            // const idbuttomrem = parseInt(elemento.dataset.idComida);
            // console.log(idbuttomrem)
            // eliminarServicio(idbuttomrem);
            
        }

        function nuevomPrecio(){
            if(cant <= 1){
                cant = 1;
                deselect();
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
    }else if(e.target.tagName ==='BUTTON'){
        eliminarServicios();
        elemento= null;
    }else{
        elemento= e.target;
    }
    // console.log(elemento);
    if(elemento === null){
        return;
    }
   //clikeando  y poner quitar selected
    else if(elemento.classList.contains('selected')){
        elemento.classList.remove('selected');
        const idRem = parseInt(elemento.dataset.idComida);
        eliminarServicio(idRem);

    }else{
        elemento.classList.add('selected');
        // console.log(elemento.dataset.idComida);
        // console.log(elemento.firstElementChild.textContent);
        // console.log(elemento.firstElementChild.nextElementSibling.textContent)
        const comidaObj ={
            id: parseInt(elemento.dataset.idComida),
            nombre:elemento.firstElementChild.textContent,
            precio:elemento.firstElementChild.nextElementSibling.textContent,
            cantidad: elemento.children[5].textContent
        }
            agregarServicio(comidaObj);
       
        
        // console.log(comidaObj);
    }
    // console.log(elemento);
}

function eliminarServicio(Idremove){
    const {pedido} = orden;
    orden.pedido = pedido.filter( pedidoNum => pedidoNum.id !== Idremove);
    //  console.log(orden);
}
//Eliminar elementos seleccionados cuando clikeo en agregar cantidad
function eliminarServicios(){
    const {pedido} = orden;
    orden.pedido = pedido.filter( pedidoNum => pedidoNum.id == null);
    //  console.log(orden);
}

// function eliminarServicios(Idbuttonrem){
//     const {pedido} = orden;
//     orden.pedido = pedido.filter(function pedidoNum(){
//         pedidoNum.id == Idbuttonrem;
//     });
//     console.log(orden);
// }


function agregarServicio(comidaObjeto){
    const {pedido} = orden;
    orden.pedido = [...pedido, comidaObjeto];
    //  console.log(orden);
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
        // console.log("se oculta el boton de anterior");
        paga.classList.add('ocultar');
    } else if (n===3){
        pags.classList.add('ocultar');
        paga.classList.remove('ocultar');

        mostrarPedido();
    }else {
        paga.classList.remove('ocultar');
        pags.classList.remove('ocultar');
    }
    mostrarSeccion();
}

function mostrarPedido(){
    
    //Destructuring
    let {nombre, fecha, pedido} = orden; 

    //Seleccionar resumen
    const resumenDiv = document.querySelector('.contenido-resumen')

    while(resumenDiv.firstChild){
        resumenDiv.removeChild(resumenDiv.firstChild);
    }

    //Validación de objeto
    if(Object.values(orden).includes('')){
       const noPedido = document.createElement('P');
       noPedido.textContent="Porfavor, rellene sus datos";
       noPedido.classList.add('invalidar-pedido');

       //Agregando al div de resumen
        resumenDiv.appendChild(noPedido);
       
       
       
    }else{
        // console.log("Datos completos");
        const nombrePedido = document.createElement('P');
        const fechaPedido = document.createElement('P');
   

        nombrePedido.innerHTML = `${nombre}`;
        fechaPedido.innerHTML = `${fecha}`;

        const pedidoOrden = document.createElement('DIV');
        pedidoOrden.classList.add('resumen-pedido');
        
        let total = 0;
        //Iterar sobre los pedidos
        pedido.forEach( runner =>{
            const contPedido = document.createElement ('DIV');
            contPedido.classList.add('contPedido');

            const textoPedido = document.createElement('P');
            textoPedido.textContent = runner.nombre;

            const cantPedido = document.createElement('P')
            cantPedido.textContent = `--- x${runner.cantidad}`;

            const precioPedido = document.createElement('P');
            precioPedido.textContent = runner.precio;

            
            const totalPedido = runner.precio.split('$');
            // console.log(parseInt(totalPedido[1].trim()));

            total += parseInt(totalPedido[1].trim());
            // console.log(total);

            

            // console.log(contPedido)
            // console.log(textoPedido)
            // console.log(precioPedido)

            contPedido.appendChild(textoPedido);
            contPedido.appendChild(cantPedido);
            contPedido.appendChild(precioPedido);


            pedidoOrden.appendChild(contPedido);
    
            
        })
        
        const totalDiv = document.createElement('DIV');
        totalDiv.innerHTML =`<p>Total:<p>$${total}`;
        totalDiv.classList.add('total');

        resumenDiv.appendChild(nombrePedido);
        resumenDiv.appendChild(fechaPedido);
        resumenDiv.appendChild(pedidoOrden);
        resumenDiv.appendChild(totalDiv);
        
    }

}

function nombrePedido(){
    const nombreInput = document.querySelector('#Nombre');
    
    nombreInput.addEventListener('input', (e)=>{
        // console.log(e.target.value);
        const nombreIn = e.target.value.trim();

        if(nombreIn === '' || nombreIn.length < 3){
            mostrarAlerta("Nombre de 3 letras minimo", 'error')
        }else{
            orden.nombre=nombreIn;
        }

        // console.log(orden);
    });
}

function mostrarAlerta(mensaje, tipo){
    //Solo 1 alerta
    const alertaPrevia= document.querySelector('.alerta');

    if(alertaPrevia){
        return;
    }

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');

    if(tipo === 'error'){
        alerta.classList.add('error');
    }

    const formulario = document.querySelector('.formulario');
    formulario.appendChild(alerta);

    //Eliminar la alerta despues de n segundos
    setTimeout(()=>{
        alerta.remove();
    }, 2000);
}

function fechaPedido(){
    const fechaIn = document.querySelector('#Fecha');
    fechaIn.addEventListener('input', e =>{
        orden.fecha = fechaIn.value;

        // const dia = new Date(e.target.value);
        // const opciones ={
        //     year: 'numeric',
        //     month: 'long',
        //     weekday: 'long'
        // }
    
        // console.log(dia.toLocaleDateString('es-ES', opciones))
    })
}


function deshabilitarFechaAnterior(){
    const Infecha = document.querySelector('#Fecha');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const fechaDesact = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

 

    //Formato 2020-11-20days
    
    // console.log(fechaDesact)

    Infecha.min = fechaDesact;
    Infecha.max = fechaDesact;
    Infecha.value= fechaDesact;
    orden.fecha= fechaDesact;

    // console.log(Infecha.min)
}






