export const modal = document.getElementById("modal");
const btnCerrarModal = document.getElementById("cerrarModal");

export const modalPoster = document.getElementById("modalPoster");
export const modalTitulo = document.getElementById("modalTitulo");
export const modalYear = document.getElementById("modalYear");
export const modalRating = document.getElementById("modalRating");
export const modalOverview = document.getElementById("modalOverview");

btnCerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (evento) => {
    if (evento.target === modal) {
modal.style.display = 'none';
    }
});