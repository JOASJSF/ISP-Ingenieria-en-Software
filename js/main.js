function imgSlider(anything) {
    document.querySelector('.star').src = anything;
}

function changeCircleColor(color) {
    const circle = document.querySelector('.circle');
    circle.style.background = color;
}

function changeText1() {
    const textBox = document.querySelector('.textBox');
    textBox.innerHTML = '<h2>El popular<br><span class="span">JavaScript</span></h2><p>es un lenguaje de programación ligero, interpretado, o compilado justo-a-tiempo (just-in-time) con funciones de primera clase. Si bien es más conocido como un lenguaje de scripting (secuencias de comandos) para páginas web, y es usado en muchos entornos fuera del navegador, tal como Node.js, Apache CouchDB y Adobe Acrobat. JavaScript es un lenguaje de programación basada en prototipos, multiparadigma, de un solo hilo, dinámico, con soporte para programación orientada a objetos, imperativa y declarativa (por ejemplo programación funcional).</p><a href="https://developer.mozilla.org/es/docs/Web/JavaScript">Aprende Mas</a>';
}

function changeText2() {
    const textBox = document.querySelector('.textBox');
    textBox.innerHTML = '<h2>Robustez frontend<br><span class="span">AngularJS</span></h2><p>Desarrollado y mantenido por Google, Angular es uno de los frameworks JavaScript más utilizados para desarrollar aplicaciones web, nace en el año 2010 y consigue consolidarse como una de las más importantes alternativas para manejar el model-view-controller (modelo - vista - controlador), con Javascript de la mano del gigante y todo poderoso Google. Su objetivo es aumentar las aplicaciones basadas en MVC, en un esfuerzo de que el desarrollo y las pruebas sean mas rápidas y fáciles.          </p><a href="https://angular.io/">Aprende Mas</a>';
}

function changeText3() {
    const textBox = document.querySelector('.textBox');
    textBox.innerHTML = '<h2>Simplemente<br><span class="span">React</span></h2><p>Lanzado en 2013 por Facebook. Se utiliza principalmente en sitios web de alto tráfico. Fue desarrollado cuando los anuncios de Facebook comenzaron a ganar tráfico y enfrentaron problemas en su codificación y mantenimiento que representaban ciertos problemas.                                                                         Whatsapp, Instagram Paypal, Glassdoor, BBC son algunas de las compañías populares que usan React. Es altamente dinámico y ofrece un gran soporte en la creación de interfaces de usuario interactivas.</p><a href="https://es.reactjs.org/">Aprende Mas</a>';
}

function changeText4() {
    const textBox = document.querySelector('.textBox');
    textBox.innerHTML = '<h2>El "pequeño"<br><span class="span">VUE.JS</span></h2><p>Un framework Javascript progresivo lanzado en 2014 y desarrollado por no gran nombre como React and Angular. De hecho, fue creado por un ex ingeniero de Google, Evan You. Está ganando popularidad constante. Su última versión; La versión 2.6.10 se lanzó el 20 de marzo de 2019.                                                                Es el miembro más joven de la familia de frameworks javascript. Sitios web como GitLab y Alibaba están usando Vue.</p><a href="https://vuejs.org/">Aprende Mas</a>';
}

function changeText5() {
    const textBox = document.querySelector('.textBox');
    textBox.innerHTML = '<h2>El backend<br><span class="span">Node.js</span></h2><p>Creado por Ryan Dahl en 2009, Node.js es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor (pero no limitándose a ello) basado en el lenguaje de programación JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google. Fue creado con el enfoque de ser útil en la creación de programas de red altamente escalables, como por ejemplo, servidores web.</p><a href="https://nodejs.org/es/">Aprende Mas</a>';
}


function changeSpanColor(color) {
    const span = document.querySelector('.span');
    span.style.color = color;
}

function toggleMenu() {
    let menuToggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    menuToggle.classList.toggle('active')
    navigation.classList.toggle('active')
}

// Visor de PDF

const url = '../docs/pdf.pdf';

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null;

const scale = 1.2,
    canvas = document.querySelector('#pdf-render'),
    ctx = canvas.getContext('2d');

// Render the page
const renderPage = num => {
    pageIsRendering = true;

    // Get page
    pdfDoc.getPage(num).then(page => {
        // Set scale
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderCtx = {
            canvasContext: ctx,
            viewport
        };

        page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;

            if (pageNumIsPending !== null) {
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        });

        // Output current page
        document.querySelector('#page-num').textContent = num;
    });
};

// Check for pages rendering
const queueRenderPage = num => {
    if (pageIsRendering) {
        pageNumIsPending = num;
    } else {
        renderPage(num);
    }
};

// Show Prev Page
const showPrevPage = () => {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
};

// Show Next Page
const showNextPage = () => {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
};

// Get Document
pdfjsLib
    .getDocument(url)
    .promise.then(pdfDoc_ => {
        pdfDoc = pdfDoc_;

        document.querySelector('#page-count').textContent = pdfDoc.numPages;

        renderPage(pageNum);
    })
    .catch(err => {
        // Display error
        const div = document.createElement('div');
        div.className = 'error';
        div.appendChild(document.createTextNode(err.message));
        document.querySelector('body').insertBefore(div, canvas);
        // Remove top bar
        document.querySelector('.top-bar').style.display = 'none';
    });

// Button Events
document.querySelector('#prev-page').addEventListener('click', showPrevPage);
document.querySelector('#next-page').addEventListener('click', showNextPage);