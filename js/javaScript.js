const certificados = document.getElementById("certificados");
const experiencia = document.getElementById("experiencia");

const patch = "https://my-json-server.typicode.com/Micolash89/endpoints";

// const fetchCertificados = async () => {
//     try {
//         const response = await fetch(`${patch}/certificates`);
//         const data = await response.json();
//         return ;
//     } catch (error) {
//         console.error("Error al obtener los datos:", error);
//     }
// }

// fetchCertificados()
//     .then(data => {
//         console.log(data);
//     });


const fetchCertificados = () => {
    return fetch(`${patch}/certificates`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`La solicitud falló con estado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data; // Devuelve los datos
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            throw error; // Relanza el error para que pueda ser manejado externamente si es necesario
        });
};

fetchCertificados()
    .then(data => {
        let contenido="";
        data.forEach(element => {
            contenido +=`<div class="section2Div__div--div section2DivDiv1">
            <div class="section2DivDiv1__div1">
              <img
                class="section2DivDiv1__div1--img"
                src="${element.img}"
                alt=""/>
            </div>
            <div class="section2DivDiv1__div">
              <h3 class="section2DivDiv1__h3 texto2">${element.tittle1}</h3>
              <span class="section2DivDiv1__span texto3"
                >${element.tittle2}</span
              >
            </div>
          </div>`
        });
    

        certificados.innerHTML = contenido;

    });
