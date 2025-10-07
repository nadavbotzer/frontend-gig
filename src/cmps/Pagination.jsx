export function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null

    const getPageNumbers = () => {
        const pages = []
        const maxPagesToShow = 5
        
        if (totalPages <= 7) {
            // Show all pages if total is small (7 or less)
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)
            
            // Calculate range around current page
            let start, end
            
            if (currentPage <= 3) {
                // Near the beginning
                start = 2
                end = Math.min(5, totalPages - 1)
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                start = Math.max(totalPages - 4, 2)
                end = totalPages - 1
            } else {
                // In the middle
                start = currentPage - 1
                end = currentPage + 1
            }
            
            // Add ellipsis after first page if needed
            if (start > 2) {
                pages.push('...')
            }
            
            // Add pages in range
            for (let i = start; i <= end; i++) {
                pages.push(i)
            }
            
            // Add ellipsis before last page if needed
            if (end < totalPages - 1) {
                pages.push('...')
            }
            
            // Always show last page
            pages.push(totalPages)
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

