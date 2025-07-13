const ramosPorSemestre = {
  "1er Semestre": [
    { id: 1, nombre: "Fundamentos Histórico-Sociales del Derecho Privado", prerequisitos: [] },
    { id: 2, nombre: "Instituciones Políticas y Derechos Humanos", prerequisitos: [] },
    { id: 3, nombre: "Taller de Razonamiento Jurídico", prerequisitos: [] },
    { id: 4, nombre: "Taller de Investigación y Escritura Legal", prerequisitos: [] },
    { id: 5, nombre: "Comunicación Oral", prerequisitos: [] }
  ],
  "2do Semestre": [
    { id: 6, nombre: "Persona y Acto Jurídico", prerequisitos: [1] },
    { id: 7, nombre: "Derecho Constitucional Orgánico", prerequisitos: [2] },
    { id: 8, nombre: "Introducción al Derecho I", prerequisitos: [3] },
    { id: 9, nombre: "Bases Generales del Derecho Procesal", prerequisitos: [3] }
  ],
  "3er Semestre": [
    { id: 10, nombre: "Derechos Reales y Derecho Inmobiliario", prerequisitos: [6] },
    { id: 11, nombre: "Derechos Fundamentales", prerequisitos: [7] },
    { id: 12, nombre: "Introducción al Derecho II", prerequisitos: [8] },
    { id: 13, nombre: "Economía y Derecho", prerequisitos: [4] }
  ],
  "4to Semestre": [
    { id: 14, nombre: "Derecho de las Obligaciones", prerequisitos: [10] },
    { id: 15, nombre: "Derecho Penal Parte General I", prerequisitos: [12] },
    { id: 16, nombre: "Taller Destrezas en Litigación Oral", prerequisitos: [5, 9, 10, 11, 12] },
    { id: 17, nombre: "Derecho Regulatorio", prerequisitos: [13] }
  ],
  "5to Semestre": [
    { id: 18, nombre: "Derecho de Daños", prerequisitos: [15] },
    { id: 19, nombre: "Derecho Internacional Público", prerequisitos: [11] },
    { id: 20, nombre: "Derecho Penal Parte General II", prerequisitos: [12, 14] },
    { id: 21, nombre: "Procedimientos Judiciales", prerequisitos: [16] },
    { id: 22, nombre: "Derecho Comercial", prerequisitos: [17] }
  ],
  "6to Semestre": [
    { id: 23, nombre: "Contratos", prerequisitos: [4, 18] },
    { id: 24, nombre: "Derecho Administrativo", prerequisitos: [19] },
    { id: 25, nombre: "Derecho Penal Parte Especial", prerequisitos: [20] },
    { id: 26, nombre: "Derecho Societario", prerequisitos: [22] }
  ],
  "7mo Semestre": [
    { id: 27, nombre: "Derecho de Familia y Sucesorio", prerequisitos: [23] },
    { id: 28, nombre: "Derecho y Medio Ambiente", prerequisitos: [24] },
    { id: 29, nombre: "Proceso Penal", prerequisitos: [25] },
    { id: 30, nombre: "Taller de Negociación en Procesos Colaborativos", prerequisitos: [21] },
    { id: 31, nombre: "Derecho Tributario", prerequisitos: [17] }
  ],
  "8vo Semestre": [
    { id: 32, nombre: "Clínicas Jurídicas (o Pasantía Supervisada)", prerequisitos: [27, 28, 29, 30, 31] },
    { id: 33, nombre: "Curso Optativo I", prerequisitos: [27, 28, 29, 30, 31] },
    { id: 34, nombre: "Curso Optativo II", prerequisitos: [27, 28, 29, 30, 31] },
    { id: 35, nombre: "Curso Optativo III", prerequisitos: [27, 28, 29, 30, 31] }
  ],
  "9no Semestre": [
    { id: 36, nombre: "Clínicas Jurídicas (o Pasantía Supervisada)", prerequisitos: [32, 33, 34, 35] },
    { id: 37, nombre: "Curso Optativo IV", prerequisitos: [32, 33, 34, 35] },
    { id: 38, nombre: "Filosofía del Derecho", prerequisitos: [32, 33, 34, 35] },
    { id: 39, nombre: "Seminario de Investigación y Escritura Jurídica Avanzada", prerequisitos: [32, 33, 34, 35] }
  ],
  "10mo Semestre": [
    { id: 40, nombre: "Curso de Integración y Actividad de Licenciatura", prerequisitos: [36, 37, 38, 39] },
    { id: 41, nombre: "Ética y Responsabilidad Profesional en la Abogacía", prerequisitos: [36, 37, 38, 39] },
    { id: 42, nombre: "Taller de Inserción y Emprendimiento Profesional", prerequisitos: [36, 37, 38, 39] },
    { id: 43, nombre: "Curso Optativo V", prerequisitos: [36, 37, 38, 39] }
  ]
};

const malla = document.getElementById("malla");

function crearTitulo(semestre) {
  const bloque = document.createElement("div");
  bloque.classList.add("bloque-semestre");

  const h2 = document.createElement("h2");
  h2.innerText = semestre;
  h2.style.marginTop = "30px";
  h2.style.color = "#00569D";

  bloque.appendChild(h2);
  malla.appendChild(bloque);

  return bloque;
}

function crearRamo(ramo, contenedor) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.innerText = ramo.nombre;
  div.dataset.id = ramo.id;
  div.onclick = () => aprobarRamo(ramo.id);
  contenedor.appendChild(div);
}

function cargarMalla() {
  malla.innerHTML = "";
  for (const [semestre, ramos] of Object.entries(ramosPorSemestre)) {
    const contenedor = crearTitulo(semestre);
    ramos.forEach(ramo => crearRamo(ramo, contenedor));
  }
  actualizarRamos();
}

function aprobarRamo(id) {
  const div = document.querySelector(`.ramo[data-id='${id}']`);
  if (!div.classList.contains("activo")) return;
  div.classList.add("aprobado");
  guardarProgreso();
  actualizarRamos();
}

function actualizarRamos() {
  const todosLosRamos = Object.values(ramosPorSemestre).flat();
  todosLosRamos.forEach(ramo => {
    const div = document.querySelector(`.ramo[data-id='${ramo.id}']`);
    const aprobado = div.classList.contains("aprobado");
    const requisitosCumplidos = ramo.prerequisitos.every(req => {
      const reqDiv = document.querySelector(`.ramo[data-id='${req}']`);
      return reqDiv.classList.contains("aprobado");
    });
    if (!aprobado && requisitosCumplidos) {
      div.classList.add("activo");
      div.style.cursor = "pointer";
    } else if (!aprobado) {
      div.classList.remove("activo");
      div.style.cursor = "not-allowed";
    }
  });
}

function reiniciarMalla() {
  document.querySelectorAll(".ramo").forEach(div => {
    div.classList.remove("aprobado");
  });
  localStorage.removeItem("ramosAprobados");
  actualizarRamos();
}

function guardarProgreso() {
  const aprobados = Array.from(document.querySelectorAll('.ramo.aprobado'))
    .map(div => div.dataset.id);
  localStorage.setItem("ramosAprobados", JSON.stringify(aprobados));
}

function cargarProgreso() {
  const data = localStorage.getItem("ramosAprobados");
  if (!data) return;
  const aprobados = JSON.parse(data);
  aprobados.forEach(id => {
    const div = document.querySelector(`.ramo[data-id='${id}']`);
    if (div) div.classList.add("aprobado");
  });
}

window.onload = () => {
  cargarMalla();
  cargarProgreso();
};
