const ramosPorSemestre = {
  "1ER SEMESTRE": [
    { id: 1, nombre: "Fundamentos Histórico-Sociales del Derecho Privado", prerequisitos: [] },
    { id: 2, nombre: "Instituciones Políticas y Derechos Humanos", prerequisitos: [] },
    { id: 3, nombre: "Taller de Razonamiento Jurídico", prerequisitos: [] },
    { id: 4, nombre: "Taller de Investigación y Escritura Legal", prerequisitos: [] },
    { id: 5, nombre: "Comunicación Oral", prerequisitos: [] }
  ],
  "2DO SEMESTRE": [
    { id: 6, nombre: "Persona y Acto Jurídico", prerequisitos: [1] },
    { id: 7, nombre: "Derecho Constitucional Orgánico", prerequisitos: [2] },
    { id: 8, nombre: "Introducción al Derecho I", prerequisitos: [3] },
    { id: 9, nombre: "Bases Generales del Derecho Procesal", prerequisitos: [3] },
    { id: 10, nombre: "CFG 1", prerequisitos: [] },
    { id: 11, nombre: "Inglés I", prerequisitos: [] },
  ],
  "3ER SEMESTRE": [
    { id: 12, nombre: "Derechos Reales y Derecho Inmobiliario", prerequisitos: [6] },
    { id: 13, nombre: "Derechos Fundamentales", prerequisitos: [7] },
    { id: 14, nombre: "Introducción al Derecho II", prerequisitos: [8] },
    { id: 15, nombre: "Economía y Derecho", prerequisitos: [4] },
    { id: 16, nombre: "CFG 2", prerequisitos: [] },
    { id: 17, nombre: "Inglés 2", prerequisitos: [11] },
  ],
  "4TO SEMESTRE": [
    { id: 18, nombre: "Derecho de las Obligaciones", prerequisitos: [12] },
    { id: 19, nombre: "Derecho Penal Parte General I", prerequisitos: [14] },
    { id: 20, nombre: "Taller Destrezas en Litigación Oral", prerequisitos: [5, 9, 12, 13, 14] },
    { id: 21, nombre: "Derecho Regulatorio", prerequisitos: [15] },
    { id: 22, nombre: "CFG 3", prerequisitos: [] },
  ],
  "5TO SEMESTRE": [
    { id: 23, nombre: "Derecho de Daños", prerequisitos: [18] },
    { id: 24, nombre: "Derecho Internacional Público", prerequisitos: [13] },
    { id: 25, nombre: "Derecho Penal Parte General II", prerequisitos: [14, 19] },
    { id: 26, nombre: "Procedimientos Judiciales", prerequisitos: [20] },
    { id: 27, nombre: "Derecho Comercial", prerequisitos: [21] },
    { id: 28, nombre: "CFG 4", prerequisitos: [] },
  ],
  "6TO SEMESTRE": [
    { id: 29, nombre: "Contratos", prerequisitos: [4, 23] },
    { id: 30, nombre: "Derecho Administrativo", prerequisitos: [20, 21] },
    { id: 31, nombre: "Derecho Penal Parte Especial", prerequisitos: [25] },
    { id: 32, nombre: "Derecho Societario", prerequisitos: [27] },
    { id: 33, nombre: "CFG 5", prerequisitos: [] },
  ],
  "7MO SEMESTRE": [
    { id: 34, nombre: "Derecho de Familia y Sucesorio", prerequisitos: [29] },
    { id: 35, nombre: "Derecho y Medio Ambiente", prerequisitos: [30] },
    { id: 36, nombre: "Proceso Penal", prerequisitos: [31] },
    { id: 37, nombre: "Taller de Negociación en Procesos Colaborativos", prerequisitos: [26] },
    { id: 38, nombre: "Derecho Tributario", prerequisitos: [21] },
    { id: 39, nombre: "Derecho del Trabajo", prerequisitos: [15, 20] },
    { id: 40, nombre: "CFG 6", prerequisitos: [] }
  ],
  
  "8VO SEMESTRE": [
    { id: 41, nombre: "Clínicas Jurídicas I (o Pasantía Supervisada)", prerequisitos: [34, 35, 36, 37] },
    { id: 42, nombre: "Curso Optativo I", prerequisitos: [29, 30, 31, 32] },
    { id: 43, nombre: "Curso Optativo II", prerequisitos: [29, 30, 31, 32] },
    { id: 44, nombre: "Curso Optativo III", prerequisitos: [29, 30, 31, 32] }
  ],
      "9NO SEMESTRE": [
    { id: 45, nombre: "Clínicas Jurídicas II (o Pasantía Supervisada)", prerequisitos: [34, 35, 36, 37] },
    { id: 46, nombre: "Curso Optativo IV", prerequisitos: [29, 30, 31, 32] },
    { id: 47, nombre: "Filosofía del Derecho", prerequisitos: [14] },
    { id: 48, nombre: "Seminario de Investigación y Escritura Jurídica Avanzada", prerequisitos: [41] }
  ],
  
  "10MO SEMESTRE": [
    { id: 49, nombre: "Curso de Integración y Actividad de Licenciatura", prerequisitos: [38, 39, 47, 48] },
    { id: 50, nombre: "Ética y Responsabilidad Profesional en la Abogacía", prerequisitos: [45] },
    { id: 51, nombre: "Taller de Inserción y Emprendimiento Profesional", prerequisitos: [45] },
    { id: 52, nombre: "Curso Optativo V", prerequisitos: [29, 30, 31, 32] }
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
  cargarProgreso();
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
  let aprobadosCount = 0;

  todosLosRamos.forEach(ramo => {
    const div = document.querySelector(`.ramo[data-id='${ramo.id}']`);
    const aprobado = div.classList.contains("aprobado");
    const requisitosCumplidos = ramo.prerequisitos.every(req => {
      const reqDiv = document.querySelector(`.ramo[data-id='${req}']`);
      return reqDiv && reqDiv.classList.contains("aprobado");
    });

    if (!aprobado && requisitosCumplidos) {
      div.classList.add("activo");
      div.style.cursor = "pointer";
    } else if (!aprobado) {
      div.classList.remove("activo");
      div.style.cursor = "not-allowed";
    }

    if (aprobado) aprobadosCount++;
  });

  const progreso = Math.round((aprobadosCount / todosLosRamos.length) * 100);
  document.getElementById("barra-progreso").style.width = progreso + "%";
  const texto = document.getElementById("porcentaje-texto");
  if (texto) texto.innerText = `${progreso}%`;
}

function reiniciarMalla() {
  document.querySelectorAll(".ramo").forEach(div => {
    div.classList.remove("aprobado");
  });
  localStorage.removeItem("ramosAprobados");
  actualizarRamos();
}

function guardarProgreso() {
  const aprobados = Array.from(document.querySelectorAll(".ramo.aprobado")).map(div => div.dataset.id);
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

function alternarModo() {
  document.body.classList.toggle("oscuro");
  localStorage.setItem("modoOscuro", document.body.classList.contains("oscuro"));
}

window.onload = () => {
  cargarMalla();
  if (localStorage.getItem("modoOscuro") === "true") {
    document.body.classList.add("oscuro");
  }
};
