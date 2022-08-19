import _ from "lodash"

export default function Pagination({ items, pageSize, currentPage, onPageChange }) {
    const pageCount = items / pageSize
    if (Math.ceil(pageCount) === 1) return null
    const pages = _.range(1, pageCount + 1)

    console.log(items, pageSize, currentPage);

    const previous = () => {
        currentPage = currentPage > 1 ? currentPage - 1 : 1
        console.log(currentPage);
        onPageChange(currentPage)
    }
    const next = () => {
        currentPage = currentPage === items ? items : currentPage + 1
        console.log(currentPage);
        onPageChange(currentPage)
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a style={{ cursor: 'pointer' }} className="page-link" onClick={previous}>Anterior</a>
                </li>
                {
                    pages.map(page => (
                        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                            <a style={{ cursor: 'pointer' }} onClick={() => onPageChange(page)} className="page-link">{page}</a>
                        </li>
                    ))
                }
                <li className="page-item">
                    <a style={{ cursor: 'pointer' }} className="page-link" onClick={next}>Siguiente</a>
                </li>
            </ul>
        </nav>
    )
}