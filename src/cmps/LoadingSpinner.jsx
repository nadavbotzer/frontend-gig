export function LoadingSpinner({ message = "Loading...", size = "medium", fullPage = false }) {
    const sizeClass = `spinner-${size}`
    const containerClass = fullPage ? 'loading-spinner-fullpage' : 'loading-spinner-container'

    return (
        <div className={containerClass}>
            <div className="loading-spinner">
                <div className={`spinner ${sizeClass}`}></div>
                <p className="loading-message">{message}</p>
            </div>
        </div>
    )
}
