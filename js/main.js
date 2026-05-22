//funciones: como actualizar grafica, renderizar botones, etc
//addeventListener 
//initApp: para que cuando arranque la pagina inicie todo: el modo oscuro
//o claro/cargar peliculas, etc

import { BASE } from './api.js';
import { API_KEY } from './config.js';
import { Movie } from './movie.js';
import { actualizarGraficaGeneros } from './charts.js';
import { leerHistorial, aniadirBusqueda } from './storage.js';

async function obtenerPeliculas() {
    try {
        const res = await fetch(BASE + "/movie/popular?api_key=" + API_KEY + "&language=es-ES");
        const datos = await res.json();
        return datos.results;
    } catch (e) {
        console.log(e);
    } finally {
        console.log("Datos recuperados correctamente");
    }
}

const rawArray = await obtenerPeliculas();

let peliculasVisibles = 15;

const movieInstances = rawArray.map(data => new Movie(data));

const catalogo = document.getElementById("catalogo");

const inputBuscador = document.getElementById("inputBuscador");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnCargar = document.getElementById("btnCargar");
const btnOscuro = document.getElementById("btnOscuro");

function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function pintarPelis(listaPelis) {
    catalogo.innerHTML = "";

    const movieInstances = listaPelis.map(data => new Movie(data));

    movieInstances.forEach(movie => {
        catalogo.append(movie.toCard());
    });

    actualizarGraficaGeneros(listaPelis);
}

function filtrarTitulo(peliculas, texto) {
    return peliculas.filter(pelicula =>
        pelicula.title.toLowerCase().includes(texto.toLowerCase())
    );
}

function playTitle(event) {
    const texto = event.target.value.trim();

    if (texto.length > 2) {
        const historial = leerHistorial();
        const ultimaBusqueda = historial[historial.length - 1];

        if (texto !== ultimaBusqueda) {
            aniadirBusqueda(historial, texto);
        }
    }

    const res = filtrarTitulo(rawArray, texto);

    pintarPelis(res);

    btnCargar.style.display = "none";
}

function mostrarHistorial() {
    const historialLista = document.getElementById('historialLista');

    const historial = leerHistorial();

    if (historial.length === 0) {
        historialLista.style.display = 'none';
        return;
    }

    historialLista.innerHTML = '';

    historialLista.style.display = 'block';

    historial.forEach(busqueda => {
        const item = document.createElement('p');

        item.textContent = busqueda;

        item.addEventListener('click', () => {
            inputBuscador.value = busqueda;

            pintarPelis(filtrarTitulo(rawArray, busqueda));

            historialLista.style.display = 'none';
        });

        historialLista.appendChild(item);
    });
}

const busquedaDebounce = debounce(playTitle, 400);

pintarPelis(rawArray.slice(0, peliculasVisibles));

inputBuscador.addEventListener('input', busquedaDebounce);

inputBuscador.addEventListener('focus', mostrarHistorial);

document.addEventListener('click', function (e) {
    const historialLista = document.getElementById('historialLista');

    if (!e.target.closest('.buscador')) {
        historialLista.style.display = 'none';
    }
});

btnLimpiar.addEventListener('click', function () {
    inputBuscador.value = '';

    pintarPelis(rawArray.slice(0, peliculasVisibles));

    btnCargar.style.display = "block";
});

btnCargar.addEventListener('click', function () {

    peliculasVisibles += 5;

    pintarPelis(rawArray.slice(0, peliculasVisibles));

    if (peliculasVisibles >= rawArray.length) {
        btnCargar.style.display = "none";
    }
});

function init() {
    const modoOscuro = localStorage.getItem("modoOscuro");

    if (modoOscuro) {
        document.body.classList.add("dark");
        btnOscuro.textContent = 'Modo claro';
    }
}

btnOscuro.addEventListener('click', function () {

    document.body.classList.toggle('dark');

    if (document.body.classList.contains("dark")) {

        btnOscuro.textContent = 'Modo claro';

        localStorage.setItem("modoOscuro", true);

    } else {

        btnOscuro.textContent = 'Modo oscuro';

        localStorage.removeItem("modoOscuro");
    }
});

init();