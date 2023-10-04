const certificados = document.getElementById("certificados");
const experiencia = document.getElementById("experiencia");
const body = document.querySelector("body");
const patch = "https://my-json-server.typicode.com/Micolash89/endpoints";
const titulos = document.getElementById("sectionTitulos");
const tituloGrande2 = document.getElementById("tituloGrande");

const spinner = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

certificados.innerHTML = experiencia.innerHTML = titulos.innerHTML = tituloGrande2.innerHTML = spinner;

//falta agregar mas elementos al titulos , los botones se creen de manera dinamica(footer), el responsive quitar algunos div de certificados e hijos, colores de los botones agregar una clase en el css agregarla con el javaScript, PLUS pantallas de carga mientras carga.

function fetchCertificados(endPoint) {
  return fetch(`${patch}${endPoint}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`La solicitud falló con estado: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error("Error al obtener los datos:", error);
      throw error; // Relanza el error para que pueda ser manejado externamente si es necesario
    });
};

body.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "btnReact":
      fetchCertificados("/react")
        .then((data) => {
          tituloGrande2.innerHTML = tituloGrande(data[0]);
          titulos.innerHTML = data.map(element => titulosFuntion(element)).join("");
        });
      break;

    case "btnResponsive":

      fetchCertificados("/responsive")
        .then((data) => {
          tituloGrande2.innerHTML = tituloGrande(data[0]);
          titulos.innerHTML = data.map(element => titulosFuntion(element)).join("");
        });
      break;

    case "btnJS":
      fetchCertificados("/js")
        .then((data) => {
          tituloGrande2.innerHTML = tituloGrande(data[0]);
          titulos.innerHTML = data.map(element => titulosFuntion(element)).join("");
        });
  }
  console.log(contenido1);
  console.log(titulos)
});


function titulosFuntion(element) {

  return `<div class="main__section6--div section6Div1">
  <div class="section6Div1__div1">
    <img class="section6Div1__div1--img" src="${element.img}" alt="" />
  </div>

  <div class="section6Div1__div2">
    <span class="section6Div1__div2--span titulo2"
      >${element.hashTag}</span
    >
    <h3 class="section6Div1__div2--h3 titulo1">${element.tittle}</h3>
   </div>
    <p class="section6Div1__p texto1">
     ${element.paragraph}
    </p>
    <div class="section6Div1__div3">
      <a href="${element.demo}" class="section6Div1__div3--button texto1">Demo</a>
      <a href="${element.code}" class="section6Div1__div3--button texto1">Code</a>            
    </div>
  </div>`;
}

function tituloGrande(element) {
  return `<div class="section3Div__div1">
      <img class="section3Div__div1--img" src="${element.img}" alt="" />
    </div>
    <div class="section3Div__div2">
      <span class="section3Div__div2--span titulo2">${element.hashTag}</span>
      <h3 class="section3Div__div2--h3 titulo1">${element.tittle}</h3>
    </div>
    <p class="section3Div__p texto1">
      ${element.paragraph}
    </p>
    <div class="section3Div__div3">
      <a href="${element.demo}" class="section3Div__div3--button section3Button1 texto1">Demo</a>
      <a href="${element.code}" class="section3Div__div3--button section3Button2 texto1">Code</a>
    </div>`
}

fetchCertificados("/certificates")
  .then(data => {
    let contenido = "";
    data.forEach(element => {
      contenido += `<div class="section2Div__div--div section2DivDiv1">
            <div class="section2DivDiv1__div1">
              <img class="section2DivDiv1__div1--img" src="${element.img}" alt=""/>
            </div>
            <div class="section2DivDiv1__div">
              <h3 class="section2DivDiv1__h3 texto2">
                ${element.tittle1}
              </h3>
              <span class="section2DivDiv1__span texto3"
                >${element.tittle2}</span>
            </div>
          </div>`
    });
    certificados.innerHTML = contenido;
  });

fetchCertificados("/experience")
  .then(data => {
    let contenido = "";
    data.forEach(element => {
      contenido += `<div class="section4__div1">
            <div class="section4__div1--div section4Div1">
              <div class="section4Div1__div1">
                <img class="section4Div1__div1--img" src="${element.img}" alt=""/>
              </div>

              <div class="section4Div1__div2">
                <span class="section4Div1__div2--span texto3">
                  ${element.tittle2}
                </span>
                <h4 class="section4Div__div2--h4 texto2">
                  ${element.tittle1}
                </h4>
              </div>
            </div>
            <p class="section4__div1--p texto2">
              ${element.paragraph}
            </p>
          </div>`
    });
    experiencia.innerHTML = contenido;
  })

fetchCertificados("/responsive")
  .then((data) => {
    console.log(data[0])
    tituloGrande2.innerHTML = tituloGrande(data[0]);
    titulos.innerHTML = data.map(element => titulosFuntion(element)).join("");
  });