// Formulario 
const form = document.getElementById('form')
const sectorSelect = document.getElementById("sector");
const deviceSelect = document.getElementById("device");
const visitsInput = document.getElementById("visitors");
const salesInput = document.getElementById("sales");
const calculateBtn = document.getElementById("calculate");
const resultDiv = document.getElementById("result");
const rateDiv = document.getElementById("conversionRate");

// Vista de comparacion
const actualDispositivo = document.getElementById('comparacion-actual-dispositivo')
const actualVisitas = document.getElementById('comparacion-actual-visitantes')
const actualVentas = document.getElementById('comparacion-actual-ventas')
const tasaConversion = document.getElementById('tasa-conversion')
const dispositivoEsperado = document.getElementById('comparacion-esperadas-dispositivo')
const visitasEsperadas = document.getElementById('comparacion-esperadas-visitas')
const ventasEsperadas = document.getElementById('comparacion-esperadas-ventas')

// Contenedores
const contenedorFormulario = document.getElementById('contenedorFormulario')
const contenedorResultado = document.getElementById('contenedorResultado')
const header = document.getElementById('header')

// Datos
const conversionData = [
    { sector: "Alimentación", global: 1.87, desktop: 4.08, mobile: 1.18, tablet: 2.55 },
    { sector: "Deporte", global: 1.83, desktop: 3.09, mobile: 1.30, tablet: 1.66 },
    { sector: "Educación", global: 0.88, desktop: 1.25, mobile: 0.50, tablet: 0.66 },
    { sector: "Equipos informáticos y electrónica", global: 0.78, desktop: 1.39, mobile: 0.40, tablet: 0.26 },
    { sector: "Ferretería y jardinería", global: 3.81, desktop: 5.89, mobile: 3.12, tablet: 2.95 },
    { sector: "Food delivery", global: 10.04, desktop: 22.07, mobile: 7.99, tablet: 14.97 },
    { sector: "Hogar y decoración", global: 0.50, desktop: 1.15, mobile: 0.33, tablet: 0.48 },
    { sector: "Joyería y complementos", global: 0.46, desktop: 0.71, mobile: 0.38, tablet: 0.19 },
    { sector: "Moda", global: 1.17, desktop: 2.63, mobile: 0.97, tablet: 1.13 },
    { sector: "Ocio y tiempo libre", global: 1.57, desktop: 2.35, mobile: 1.27, tablet: 1.35 },
    { sector: "ONG", global: 0.66, desktop: 0.92, mobile: 0.39, tablet: 1.14 },
    { sector: "Otros", global: 1.14, desktop: 1.88, mobile: 0.75, tablet: 0.93 },
    { sector: "Parafarmacia", global: 2.19, desktop: 3.93, mobile: 1.38, tablet: 3.42 },
    { sector: "Proveedor de servicios", global: 2.01, desktop: 2.66, mobile: 0.72, tablet: 2.19 },
    { sector: "Regalos y fiestas", global: 0.85, desktop: 1.09, mobile: 0.67, tablet: 0.08 },
    { sector: "Salud y belleza", global: 1.16, desktop: 2.32, mobile: 0.77, tablet: 0.96 },
    { sector: "Seguros", global: 0.36, desktop: 0.72, mobile: 0.25, tablet: 0.37 },
    { sector: "Viajes", global: 1.17, desktop: 1.77, mobile: 0.88, tablet: 1.09 },
];

// Añade opciones al select
function cargaSector(){
    conversionData.forEach((data, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = data.sector;
        sectorSelect.appendChild(option);
    });
}

// Funcion submit del formulario
form.addEventListener('submit', e => {
    e.preventDefault()
    calculateConversions()
})

// Calculo del boton submit
function calculateConversions(){
    const sectorIndex = sectorSelect.value;
    const device = deviceSelect.value;
    const visits = parseInt(visitsInput.value);
    const sales = parseInt(salesInput.value);

    if (sectorIndex === "" || isNaN(visits) || isNaN(sales)) {
        resultDiv.textContent = "Por favor, completa todos los campos.";
        return;
    }
 
    const selectedSector = conversionData[sectorIndex];
    const conversionRate = selectedSector[device]
    const conversionRateAdapt = selectedSector[device] / 100;
    const expectedSales = Math.round(visits * conversionRateAdapt);
    
    rellenarVista(selectedSector, device, visits, sales, conversionRate, expectedSales)
    ocultarFormulario()

    // let message;
    // if (sales > expectedSales + 0.1) {
    //     message = "¡Excelente trabajo! Estás por encima del promedio del sector.";
    // } else if (sales >= expectedSales - 0.1 && sales <= expectedSales + 0.1) {
    //     message = "Estás en el promedio del sector.";
    // } else {
    //     message = "Estás por debajo del promedio del sector.";
    // }

    // resultDiv.textContent = `Ventas esperadas: ${expectedSales} // ${message}`;
}

// Actualizar valor de tasa de conversion /
function updateConversionRate(){
    if(sectorSelect.value != '' && deviceSelect.value != ''){
        rateDiv.value = conversionData[sectorSelect.value][deviceSelect.value];

    }
}

function rellenarVista(selectedSector, device, visits, sales, conversionRate, expectedSales) {
    console.log('Sector:', selectedSector.sector)
    console.log('Dispositivo:', device)
    console.log('Visitas:', visits)
    console.log('Ventas:', sales)

    actualDispositivo.innerText = `Dispositivo: ${device}`
    actualVisitas.innerText = `Visitantes: ${visits}`
    actualVentas.innerText = `Ventas: ${sales}`
    tasaConversion.innerText = `${conversionRate}%`
    dispositivoEsperado.innerText = `Sector: ${selectedSector.sector}`
    visitasEsperadas.innerText = 'Visitantes esperados: ???'
    ventasEsperadas.innerText = `${sales - expectedSales} / Ventas esperadas: ${expectedSales}`
}

const ocultarFormulario = ()  => {
    contenedorFormulario.classList.add('d-none')
    contenedorResultado.classList.remove('d-none')
    header.classList.remove('d-none')
}

const mostrarFormulario = () => {
    contenedorFormulario.classList.remove('d-none')
    contenedorResultado.classList.add('d-none')
    header.classList.add('d-none')
}

window.addEventListener('load', function() {
    cargaSector();
  });