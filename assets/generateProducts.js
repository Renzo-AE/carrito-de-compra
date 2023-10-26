export const generateCourses = async () => {
    try{
        const response = await fetch('Json.json')
        const courses = await response.json()
        
        let listProducts = ''

        courses.forEach(course => {

            if(course.title.length > 48) {
                course.title = course.title.slice(0, 48) + '...'
            }

            listProducts += `

            <div class="course" id="${course.id}">
                <div>
                    <img src="${course.imgUrl}" alt="">
                    <p class="course__name">${course.title}</p>
                    <p class="course__teacher">Profesor: ${course.teacher}</p>
                    <p class="course__hours">Horas: ${course.horas}</p>
                    <p class="course__price">Precio: S/ ${course.precio}</p>
                </div>
                <button class="agregar">AGREGAR</button>  
            </div>

            `
        });

        console.log(courses[1].title.slice(0, 58))

        return listProducts

    } catch (error){
        console.log(error)
    }
}