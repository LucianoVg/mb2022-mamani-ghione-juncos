import { useState } from "react";

export function usePagination(data, itemsPorPagina) {
    const [paginaActual, setPaginaActual] = useState(1)
    const maximoPaginas = Math.ceil(data.length / itemsPorPagina)

    function dataActual() {
        const inicio = (paginaActual - 1) * itemsPorPagina
        const fin = inicio + itemsPorPagina
        return data.slice(inicio, fin)
    }

    function siguiente() {
        setPaginaActual(paginaActual => Math.min(paginaActual + 1, maximoPaginas))
    }

    function anterior() {
        setPaginaActual(paginaActual => Math.max(paginaActual - 1, 1))
    }

    function saltar(pagina) {
        const numeroPagina = Math.max(1, pagina)
        setPaginaActual(paginaActual => Math.min(numeroPagina, maximoPaginas))
    }
    return { anterior, siguiente, saltar, dataActual, paginaActual, maximoPaginas }
}