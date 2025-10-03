export function LoadingSpinner({ message = "Loading...", size = "medium", fullPage = false, color = "green" }) {
    const sizeClass = `spinner-${size}`
    const colorClass = `spinner-${color}`
    const containerClass = fullPage ? 'loading-spinner-fullpage' : 'loading-spinner-container'

    return (
        <div className={containerClass}>
            <div className="loading-spinner">
                <div className={`spinner ${sizeClass} ${colorClass}`}></div>
                <p className="loading-message">{message}</p>
            </div>
        </div>
    )
}
