import "/node_modules/flag-icons/css/flag-icons.min.css";


export function Profile({ imgSrc, fullname, location }) {
    return <div className="review-profile">

        <img className="img" src={imgSrc || '/images/profile-default.png'} />

        <div className="user-info">

            <span className="fullname">{fullname}</span>

            <span className="location-dtl">
                <span className={`fi fi-${location.format} small`}></span>
                <span className="location">{location.name}</span>
            </span>

        </div>

    </div>
}