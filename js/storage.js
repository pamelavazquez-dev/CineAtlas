//guardar busquedas que hagamos de peliculas en la web, se le puede poner limite
//de busquedas que queramos guardar 
// y para guardar estadisticas 

export function leerHistorial() {
    return JSON.parse(localStorage.getItem('historial')) ?? [];
}

export function aniadirBusqueda(historial, nuevaBusqueda) {
    historial.push(nuevaBusqueda);
    if (historial.length > 10) {
        historial.shift();
    }
    localStorage.setItem('historial', JSON.stringify(historial));
    return historial;
}