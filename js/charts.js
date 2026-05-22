
const ctxGeneros = document.getElementById('chartGeneros');

const GENEROS = {
    28: 'Acción',
    12: 'Aventura',
    16: 'Animación',
    35: 'Comedia',
    80: 'Crimen',
    99: 'Documental',
    18: 'Drama',
    10751: 'Familia',
    14: 'Fantasía',
    36: 'Historia',
    27: 'Terror',
    10402: 'Música',
    9648: 'Misterio',
    10749: 'Romance',
    878: 'Ciencia ficción',
    10770: 'Película de TV',
    53: 'Suspense',
    10752: 'Bélica',
    37: 'Western'
};

let chartGeneros = null;

function contarGeneros(peliculas) {
    const conteo = {};
    peliculas.forEach(pelicula => {
        pelicula.genre_ids.forEach(id => {
            const nombre = GENEROS[id] ?? 'Otros';
            conteo[nombre] = (conteo[nombre] ?? 0) + 1;
        });
    });
    return conteo;
}

export function actualizarGraficaGeneros(peliculas) {
    const conteo = contarGeneros(peliculas);
    const etiquetas = Object.keys(conteo);
    const valores = Object.values(conteo);

    const colorTexto = document.body.classList.contains('dark') ? '#E8E4DC' : '#2E2B24';
    

    if (chartGeneros) chartGeneros.destroy();

    chartGeneros = new Chart(ctxGeneros, {
        type: 'doughnut',
        data: {
            labels: etiquetas,
            datasets: [{
                data: valores,
                backgroundColor: [
                    '#2e6002', '#b97b30', '#e4a717', '#C4A55A',
                    '#09562c', '#957d44', '#246559', '#212d1e',
                    '#75b966', '#757704', '#352f1b', '#ecf38b'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: colorTexto,
                        font: { size: 11 },
                        boxWidth: 12,
                        padding: 20
                    }
                }
            }
        }
    });
}