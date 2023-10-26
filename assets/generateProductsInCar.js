export const generateListProducts = (listCoursestInCar, course) => {
    let listProducst = [...listCoursestInCar]

    if (!listProducst.find(curso => curso.id == course.id)) listProducst.push(course)

    return listProducst
}


export const generateHtmlListCar = (listCourses) => {
    console.log(listCourses)

    let contenedor = ''

    if (listCourses.length === 0) {

        contenedor = '<p class="void">No hay cursos agregados </p>'

    } else {
        contenedor = `<div class="containerCarModal__listProducts">`
        let total = 0;

        listCourses.forEach((course) => {
            contenedor += `
        
                <div class="containerCarModal__listProducts-product" id="${course.id}">
                    <img class="imgCurso" src="${course.imgUrl}" alt="">
                    <div class="product__info">
                        <p class="product__info-nameCourse">${course.title}</p>
                        <p class="product__info-priceCourse">S/ ${course.precio}</p>
                        <p class="product__info-teacherCourse">${course.teacher}</p>
                    </div>
                    <img class="iconDelete" src="./img/close.svg" alt="">
                </div>
        
            `

            total += course.precio
        })

        contenedor += `
    
            </div>
            <p class="containerCarModal__totalPagar">Total a pagar : S/ ${total}</p>
            <button>PAGAR</button>  
            <button class="vaciar-carrito">VACIAR CARRITO</button>   
    
        `
    }

    return contenedor
}
