export function ProfileImg({ imgSrc }) {
    return <section className="profile">
        <img className="profile-img" src={imgSrc || '/images/profile-default.png'} />
    </section>
}