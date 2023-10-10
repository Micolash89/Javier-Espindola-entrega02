//END POINT
const patch = "https://my-json-server.typicode.com/Micolash89/endpoints";

//CONTENEDORES PADRE
const certificados = document.getElementById("certificados");
const experiencia = document.getElementById("experiencia");
const main = document.querySelector("main");
const titulos = document.getElementById("sectionTitulos");
const tituloGrande2 = document.getElementById("tituloGrande");
const contenedorFooter = document.getElementById("footer_section");


//VARIABLES 
let botonesPaginado; // guarda el array de los botones 
let vec; //guardo todos los elementos del JSON
let ant; //guardo el boton anterior(responsive,js,react) y le saco la clase activado.
let bloque = 1; // variable para calcular los elementos a mostrar usando slice (ejemplo bloque = 1 , son los 3 primeros elementos: inicio=0 ,fin = 3)
let bloqueBtn = 1; //boton en posicion 1
let btnPaginadoAnt; //se guardara el boton del paginado anterior para sacarle la clase("activado") donde se cambia el color de fondo

////SPINER NI BIEN ARRACA LA PAGINA//
const spinner = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
certificados.innerHTML = experiencia.innerHTML = titulos.innerHTML = tituloGrande2.innerHTML = spinner;

////FUNCIONES AJAX
function miFetch(endPoint) {
  return fetch(`${patch}${endPoint}`)
    .then(response => {
      if (!response.ok) throw new Error(`La solicitud falló con estado: ${response.status}`);
      return response.json();
    })
    .catch(error => {
      console.error("Error al obtener los datos:", error);
    });
};

///FUNCIONES QUE SE INVOCAN AL CARGA LA PAGINA////

///CERTIFICADOS
miFetch("/certificates")
  .then(data => {
    certificados.innerHTML = data.map(element => {
      return `<div class="section2Div__div--div section2DivDiv1">
            <div class="section2DivDiv1__div1">
              <img class="section2DivDiv1__div1--img" src="${element.img}" alt=""/>
            </div>
            <div class="section2DivDiv1__div">
              <h3 class="section2DivDiv1__h3 texto2">
                ${element.title1}
              </h3>
              <span class="section2DivDiv1__span texto3"
                >${element.title2}</span>
            </div>
          </div>`;
    }).join("");
  });

///EXPERIENCIA
miFetch("/experience")
  .then(data => {
    experiencia.innerHTML = data.map(element => {
      return `<div class="section4__div1">
            <div class="section4__div1--div section4Div1">
              <div class="section4Div1__div1">
                <img class="section4Div1__div1--img" src="${element.img}" alt=""/>
              </div>

              <div class="section4Div1__div2">
                <span class="section4Div1__div2--span texto3">
                  ${element.title2}
                </span>
                <h4 class="section4Div__div2--h4 texto2">
                  ${element.title1}
                </h4>
              </div>
            </div>
            <p class="section4__div1--p texto2">
              ${element.paragraph}
            </p>
          </div>`
    }).join("");
  })

///RESPONSIVE
miFetch("/responsive")
  .then((data) => {
    crearTrifuerza(data);
    ant = document.getElementById("btnResponsive");
    ant.classList.add("activado");
    activarBtn1();
  });


////BOTONES : RESPONSIVE , JAVASCRIPT , REACT
main.addEventListener("click", (e) => {

  const { target: { id } } = e;

  switch (id) {

    case "btnResponsive":
      if (ant != e.target)
        miFetch("/responsive")
          .then((data) => {
            crearTrifuerza(data, e.target);
            ant = e.target;
            activarBtn1();
          });
      break;

    case "btnJS":
      if (ant != e.target)
        miFetch("/js")
          .then((data) => {
            crearTrifuerza(data, e.target);
            ant = e.target;
            activarBtn1();
          });
      break;

    case "btnReact":
      miFetch("/react")
        .then((data) => {
          crearTrifuerza(data, e.target);
          ant = e.target;
          activarBtn1();
        });
  }
});

////CREAR LOS 3 ELEMENTOS A MOSTRAR
function crearTrifuerza(data, e) {
  tituloGrande2.innerHTML = tituloGrande(data[0]);
  crearBotonesPaginado(data.length);
  vec = data.map(element => titulosFuntion(element));
  let tam = vec.length;
  titulos.innerHTML = vec.slice(0, (tam >= 3) ? 3 : tam).join("");
  if (e != ant) {
    e.classList.add("activado");
    ant.classList.remove("activado");
    console.log(e);
  }
}

////SECCION DEL ARRAY DE TITULOS
function titulosFuntion(element) {
  return `<div class="main__section6--div section6Div1">
  <div class="section6Div1__div1">
    <img class="section6Div1__div1--img" src="${element.img}" alt="" />
  </div>
  <div class="section6Div1__div2">
    <span class="section6Div1__div2--span titulo2"
      >${element.hashTag}</span
    >
    <h3 class="section6Div1__div2--h3 titulo1">${element.title}</h3>
   </div>
    <p class="section6Div1__p texto1">
     ${element.paragraph}
    </p>
    <div class="section6Div1__div3">
      <a target="_blank" href="${element.demo}" class="section6Div1__div3--button texto1">Demo</a>
      <a target="_blank" href="${element.code}" class="section6Div1__div3--button texto1">Code</a>            
    </div>
  </div>`;
}

///TITULO CON LA VISTA EN VERSION DESKTOP
function tituloGrande(element) {
  return `<div class="section3Div__div1">
      <img class="section3Div__div1--img" src="${element.img}" alt="" />
    </div>
    <div class="section3Div__div2">
      <span class="section3Div__div2--span titulo2">${element.hashTag}</span>
      <h3 class="section3Div__div2--h3 titulo1">${element.title}</h3>
    </div>
    <p class="section3Div__p texto1">
      ${element.paragraph}
    </p>
    <div class="section3Div__div3">
      <a target="_blank" href="${element.demo}" class="section3Div__div3--button section3Button1 texto1">Demo</a>
      <a target="_blank" href="${element.code}" class="section3Div__div3--button section3Button2 texto1">Code</a>
    </div>`
}

///CREAR LOS BOTONES DE MANERA DINAMICA DEPENDIENDO EL TAMAÑO DEL ARRAY
function crearBotonesPaginado(tam) {
  length = Math.ceil(tam / 3); ///
  contenedorFooter.innerHTML = '<button class="footer__section--button footer__button--1  texto2" id="btn0"><</button>';

  for (let i = 0; i < length; i++) {
    contenedorFooter.innerHTML += ` <button class="footer__section--button footer__button--${i + 2} texto2" id="btn${i + 1}">${i + 1}</button>`;
  }
  contenedorFooter.innerHTML += `<button class="footer__section--button footer__button--${length + 2} next  texto2" id="btn${length + 1}" >></button>`;
}

//EVENTO CLICK CONTENEDOR DE LOS BOTONES DEL PÁGINADO 
contenedorFooter.addEventListener("click", (e) => {

  if (e.target.id == "footer_section") return; //si apreto entre medio de los botones salgo;

  const { target: { id } } = e;
  const tam = vec.length;
  let inicio;//inicio del vector
  let fin;//fin del vector

  inicio = bloque * 3 - 3;
  fin = bloque * 3;

  btnTam = Math.ceil(tam / 3) + 1 //"boton >, next" o siguiente

  activarPaginado(e);

  switch (id) {
    case "btn0"://primer boton "<"
      if (inicio > 0) {
        inicio = (--bloque) * 3 - 3;
        fin = (bloque) * 3;
        titulos.innerHTML = vec.slice(inicio, fin).join(""); 
        ant.classList.add("activado");
      }
      break;

    case "btn" + btnTam: //ultimo boton ">"
      if (fin < tam) {
        inicio = (++bloque) * 3 - 3; ///terneario con tam
        fin = (bloque) * 3;//tenearui con tam
        titulos.innerHTML = vec.slice(inicio, fin).join("");
      } else {
        if (inicio < tam) {
          titulos.innerHTML = vec.slice(inicio, tam).join("");
        }
      }
      break;

    default: //cualquier otro boton del paginado (numero)
      if (bloque) {
        bloque = Number.parseInt(id.charAt(id.length - 1))
        inicio = bloque * 3 - 3;
        fin = bloque * 3;
        if (fin < tam) {
          titulos.innerHTML = vec.slice(inicio, fin).join("");
        }
        else {
          titulos.innerHTML = vec.slice(inicio, fin).join("");
        }
      }
      if (botonesPaginado[bloque] != btnPaginadoAnt) {
        botonesPaginado[bloque].classList.add("activado");
        btnPaginadoAnt.classList.remove("activado");
        btnPaginadoAnt = botonesPaginado[bloque];
      }
  }
})

///activar y desactivar el background del paginado
///ACTIVAR Y DESACTIVAR EL BACGROUND DEL LA PAGINACION
function activarPaginado(e) {

  const { target: { id } } = e;

  botonesPaginado = document.querySelectorAll(".footer__section--button"); //leo los botones y lo almaceno en un array
  btnPreview = botonesPaginado[0];
  btnNext = botonesPaginado[botonesPaginado.length - 1];
 
  if (id != btnPreview.id && id != btnNext.id) {
    botonesPaginado.forEach(element => element.classList.remove("activado"));
    e.target.classList.add("activado");
    bloqueBtn = Number(id.charAt(id.length - 1))

  } else if (e.target.id == botonesPaginado[0].id && !botonesPaginado[1].classList.contains("activado")) {
    botonesPaginado.forEach(element => element.classList.remove("activado"));
    botonesPaginado[--bloqueBtn].classList.add("activado");

  } else if (id == botonesPaginado[botonesPaginado.length - 1].id && !botonesPaginado[botonesPaginado.length - 2].classList.contains("activado")) {
    botonesPaginado.forEach(element => element.classList.remove("activado"));
    botonesPaginado[++bloqueBtn].classList.add("activado");
  }

}

//BOTON 1 GUARDARLO COMO ANTERIOR Y AGREGARLE LA CLASE ACTIVO 
function activarBtn1() {
  btnPaginadoAnt = document.getElementById("btn1");
  btnPaginadoAnt.classList.add("activado");
  bloque = 1;
}