import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Link } from "react-router-dom";


export function Profile({ userId, imgSrc, fullname, location }) {
    return <div className="review-profile">

        <Link to={`/user/${userId}`} className="profile-link">
            <img className="img" src={imgSrc || '/images/profile-default.png'} />
        </Link>

        <div className="user-info">

            <Link to={`/user/${userId}`} className="fullname-link">
                <span className="fullname">{fullname}</span>
            </Link>

            <span className="location-dtl">
                <span className={`fi fi-${location.format} small`}></span>
                <span className="location">{location.name}</span>
            </span>

        </div>

    </div>
}