
import { useNavigate } from 'react-router'

export function TagsHeader() {
    const navigate = useNavigate()

    const tags = [
        { txt: 'Programming & Tech' },
        { txt: 'Graphics & Design' },
        { txt: 'Digital Marketing' },
        { txt: 'Writing & Translation' },
        { txt: 'Video & Animation' },
        { txt: 'AI Services' },
        { txt: 'Music & Audio' },
        { txt: 'Business' },
        { txt: 'Consultin' },
    ]

    function goToIndex(tag) {
        navigate(`/gig/?tags=[${tag}]`)

    }

    return (
        <section className='tags-header full'>
            {tags.map((tag => {
                return (
                    <section key={tag.txt}>
                        <article onClick={() => goToIndex(tag.txt)}>{tag.txt}</article>
                    </section>

                )
            }))}

        </section>
    )
}