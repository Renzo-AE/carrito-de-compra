import { generateCourses } from "./assets/generateProducts.js"
import { generateListProducts, generateHtmlListCar } from "./assets/generateProductsInCar.js"

// variables denominadas
const containerListProducts = document.getElementById('list-courses')
let listProductsInCar = []

// Hace que el icon de carrito muestre los productos en una sección
const modalCar = document.getElementById('modalCar')
const btnCar = document.getElementById('car')

btnCar.addEventListener('click', () => {
    modalCar.classList.toggle('activeModalCar')
})

// imprimimos los cursos en pantalla
generateCourses().then((courses) => {
    containerListProducts.innerHTML = courses
})

// configuramos el boton agregar y tambien para que se pinte en el modal del carrito
containerListProducts.addEventListener('click', async (event) => {
    try{
        if(event.target.classList.contains('agregar')){
            const contenedorPadre = event.target.parentElement
            const getId = contenedorPadre.id

            const response = await fetch('Json.json')
            const data = await response.json()

            const product = data.filter((course) => course.id == getId)[0]

            if(listProductsInCar.find(curso => curso.id == product.id)) mostrarMensaje('mensajeCurso')
            if(!listProductsInCar.find(curso => curso.id == product.id)) mostrarMensaje('mensaje')

            listProductsInCar = generateListProducts(listProductsInCar, product)

            // pintamos los cursos en el modal carrito de compras
            modalCar.innerHTML = generateHtmlListCar(listProductsInCar)

            // pintamos la cantidad de cursos que se agrego al carrito
            document.querySelector('.header__iconCar__cant').textContent = listProductsInCar.length
        }
    } catch(error){
        console.log(error)
    }
    
})

// boton eliminar curso del carrito
 modalCar.addEventListener('click', (event) => {
    if(event.target.classList.contains('iconDelete')){
        const contenedorPadre = event.target.parentElement
        const getId = contenedorPadre.id
        listProductsInCar = listProductsInCar.filter((course) => course.id != getId)

        modalCar.innerHTML = generateHtmlListCar(listProductsInCar)
        document.querySelector('.header__iconCar__cant').textContent = listProductsInCar.length
    }

    // vaciar carrito
    if(event.target.classList.contains('vaciar-carrito')){
        console.log('hola')
        listProductsInCar = []
        modalCar.innerHTML = generateHtmlListCar(listProductsInCar)   
        document.querySelector('.header__iconCar__cant').textContent = listProductsInCar.length
    }
})




// funcion que muestra el mensaje por un cierto tiempo
function mostrarMensaje(id) {
    const mensaje = document.getElementById(id);
    mensaje.style.display = "flex";
    mensaje.style.animation = 'errorr 2s linear'

    setTimeout(function () {
        mensaje.style.display = "none";
    }, 1900); // 1000 milisegundos = 1 segundos
}
