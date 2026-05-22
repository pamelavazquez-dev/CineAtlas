import { imagenPoster } from "./api.js";
import { modal, modalOverview, modalPoster, modalRating, modalTitulo, modalYear } from "./modal.js";


export class Movie {
    constructor(data) {
        this._id = data.id;
        this._title = data.title;
        this._overview = data.overview;
        this._posterPath = imagenPoster + data.poster_path;
        this._releaseDate = data.release_date;
        this._rating = data.vote_average;
        this._genreIds = data.genre_ids;
        this._popularity = data.popularity;
        this._productionCountries = data.production_countries ?? [];
    }

    get title() {
        return this._title;
    }

    get rating() {
        return this._rating;
    }

    get overview() {
        return this._overview;
    }

    get popularity() {
        return this._popularity;
    }
    get posterUrl() {
        return this._posterPath
            ? this._posterPath
            : './assets/img/no-poster.webp';
    }

    get year() {
        return this._releaseDate
            ? this._releaseDate.split('-')[0]
            : "Año desconocido";
    }
get formattedDate() {
    if (!this._releaseDate) {
        return "Fecha desconocida";
    }

    const fecha = new Date(this._releaseDate);

    return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}


    toCard() {
        const card = document.createElement('section');
        card.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalTitulo.textContent = this._title;
            modalOverview.textContent = this._overview;
            modalPoster.src = this.posterUrl;
            modalRating.textContent = `★ ${this._rating.toFixed(1)}`;
            modalYear.textContent = this.formattedDate;
          

        })
        card.classList.add("tarjetaPeli");
        card.innerHTML =
            `
    <img src="${this.posterUrl}" alt="Póster de ${this._title}">
    <h3 class="titulo">${this._title}</h3>
    <p class="anio">${this.year}</p>
    <p class="score">★ ${this._rating.toFixed(1)}</p>
    `;

        


        return card;
    }
}

