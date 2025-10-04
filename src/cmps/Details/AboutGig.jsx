export function AboutGig({ description }) {
    const title = 'About this gig'

    // Handle both string and array formats for backward compatibility
    const renderDescription = () => {
        // If description is a string (legacy format)
        if (typeof description === 'string') {
            const lines = description.split('\n');
            let list = []
            
            return lines.map((line, index) => {
                const words = line.split(' ')
                if (words.length <= 5) {
                    list.push(line)
                    return null
                }
                let element = null
                if (list.length > 0) {
                    element = <ul key={`list-${index}`} className="about-list">
                        {list.map((li, liIndex) => (<li key={liIndex} className="bold">{li}</li>))}
                    </ul>
                    list = []
                }
                return element || <p key={index} className="regular">{line}</p>
            })
        }
        
        // If description is an array of objects (new format)
        if (Array.isArray(description)) {
            return description.map((item, index) => {
                const { element, style, text, items } = item
                
                // Handle list items
                if (element === 'ul' && items) {
                    return (
                        <ul key={index} className={style?.join(' ') || 'about-list'}>
                            {items.map((listItem, itemIndex) => {
                                if (Array.isArray(listItem)) {
                                    return (
                                        <li key={itemIndex}>
                                            {listItem.map((textItem, textIndex) => (
                                                <span key={textIndex} className={textItem.style?.join(' ') || ''}>
                                                    {textItem.text}
                                                </span>
                                            ))}
                                        </li>
                                    )
                                }
                                return <li key={itemIndex}>{listItem}</li>
                            })}
                        </ul>
                    )
                }
                
                // Handle other elements (p, h2, etc.)
                const Element = element || 'p'
                const className = style?.join(' ') || 'regular'
                
                return (
                    <Element key={index} className={className}>
                        {text}
                    </Element>
                )
            })
        }
        
        // Fallback
        return <p className="regular">{description || 'No description available'}</p>
    }

    return <div className="about">
        <h2>{title}</h2>
        <div className="content">
            {renderDescription()}
        </div>
    </div>
}