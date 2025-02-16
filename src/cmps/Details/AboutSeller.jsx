import { MiniUser } from "../MiniUser/MiniUser";

export function AboutSeller({ username }) {

    const title = `Get to know ${username}`

    return <div className="about-seller">
        <h1>{title}</h1>
        <MiniUser isAbout={true} />
    </div>
}