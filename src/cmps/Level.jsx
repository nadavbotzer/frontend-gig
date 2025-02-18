import '../assets/styles/cmps/Level.scss'

export function Level({ level }) {

    function createRatingStarString(level) {
        let diamonds = []
        for (let i = 0; i < level; i++) {
            diamonds.push(<img className='icon' src='/images/diamond-icon.png' key={i} />)
        }
        return diamonds;
    }

    function createLevel(level) {
        if (level < 3)
            return `Level ${level}`
        return `Top rated`;
    }

    const levelStr = createLevel(level)
    const diamonds = createRatingStarString(level)

    return <div className={`level ${level === 3 ? 'top' : ''}`}>
        <span className="txt">{levelStr}</span>
        <span className="diamonds">
            {
                diamonds.map((diamond) => {
                    return diamond
                })
            }
        </span>
    </div>
}