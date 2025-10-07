export function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null

    const getPageNumbers = () => {
        const pages = []
        const maxPagesToShow = 5
        
        if (totalPages <= maxPagesToShow) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Calculate range around current page (5 pages total)
            let start, end
            
            if (currentPage <= 2) {
                // Near the beginning
                start = 1
                end = maxPagesToShow
            } else if (currentPage >= totalPages - 1) {
                // Near the end
                start = totalPages - maxPagesToShow + 1
                end = totalPages
            } else {
                // In the middle - show current page centered
                start = currentPage - 2
                end = currentPage + 2
            }
            
            // Add ellipsis before if not showing from page 1
            if (start > 1) {
                pages.push('...')
            }
            
            // Add pages in range
            for (let i = start; i <= end; i++) {
                pages.push(i)
            }
            
            // Add ellipsis after if not showing last page
            if (end < totalPages) {
                pages.push('...')
            }
        }
        
        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <div className="pagination">
            <button
                className="pagination-btn pagination-first"
                disabled={currentPage === 1}
                onClick={() => onPageChange(1)}
                title="First page"
            >
                ««
            </button>

            <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            <div className="pagination-numbers">
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                                ...
                            </span>
                        )
                    }
                    
                    return (
                        <button
                            key={page}
                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                })}
            </div>

            <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>

            <button
                className="pagination-btn pagination-last"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(totalPages)}
                title="Last page"
            >
                »»
            </button>
        </div>
    )
}

