export function ProfileImg({ imgUrl, fallbackImgUrl }) {
    return (
        <section className="profile">
            <img className="profile-img" src={imgUrl || fallbackImgUrl || '/images/profile-default.png'} />
        </section>
    )
}