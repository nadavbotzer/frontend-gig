
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export function TagsHeader() {

    const ctgs = [
        { txt: 'Programming & Tech', tags: ['programming', 'tech'] },
        { txt: 'Graphics & Design', tags: ['graphics', 'design'] },
        { txt: 'Digital Marketing', tags: ['digital-marketing'] },
        { txt: 'Writing & Translation', tags: ['writing', 'translation'] },
        { txt: 'Video & Animation', tags: ['video'] },
        { txt: 'AI Services', tags: ['ai-services'] },
        { txt: 'Music & Audio', tags: ['music', 'audio'] },
        { txt: 'Business', tags: ['business'] },
        { txt: 'Consultin', tags: ['consultin'] },
    ]

    return (
        <section className='tags-header main-layout full'>
            {ctgs.map((ctg => {
                return (
                    <Link key={ctg.txt} to={`/gig/?tags=${ctg.tags}`}>{ctg.txt}</Link>
                )
            }))}
        </section>
    )
}