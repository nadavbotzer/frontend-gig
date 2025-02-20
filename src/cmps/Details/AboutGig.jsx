
export function AboutGig({ descriptionContent }) {

    const title = 'About this gig'

    return <div className="about">
        <h2>{title}</h2>
        <div className="content">
            {
                descriptionContent.map((element, index) => {
                    const classNames = element.style.reduce((a, b) => a + ' ' + b)
                    switch (element.element) {
                        case "p": return <p key={index} className={classNames}>{element.text}</p>
                        case "h2": return <h2 key={index} className={element.style}>{element.text}</h2>
                        case "ul": return <ul key={index} className={element.style}>
                            {
                                element.items.map((item, index) => {
                                    return <li key={index + item.style}>
                                        {
                                            item.map((span) => {
                                                const classNames = span.style.reduce((a, b) => a + ' ' + b)
                                                return <span key={span.text} className={classNames}>{span.text}</span>
                                            })
                                        }
                                    </li>
                                })
                            }
                        </ul>
                        default:
                            return <p className="regular">{par}</p>
                    }
                })
            }
        </div>
    </div>
}