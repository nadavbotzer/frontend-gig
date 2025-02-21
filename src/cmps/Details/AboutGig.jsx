export function AboutGig({ description }) {

    let list = []
    const title = 'About this gig'
    const lines = description.split('\n');

    return <div className="about">

        <h2>{title}</h2>

        <div className="content">
            {
                lines.map((line) => {
                    const words = line.split(' ')
                    if (words.length <= 5) {
                        list.push(line)
                        return
                    }
                    let element = null
                    if (list.length > 0) {
                        element = <ul className="about-list">
                            {list.map((li) => (<li className="bold">{li}</li>))}
                        </ul>
                        list = []
                    }
                    return element || <p key={line} className="regular">{line}</p>
                })
            }
        </div>
    </div>
}