import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadUser } from '../store/actions/user.actions'
import { loadGigs } from '../store/actions/gig.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { Level } from '../cmps/Level'
import { LoadingSpinner } from '../cmps/LoadingSpinner'
import { GigList } from '../cmps/GigList'
import StarIcon from '@mui/icons-material/Star'
import DiamondIcon from '@mui/icons-material/Diamond'
import LanguageIcon from '@mui/icons-material/Language'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import MessageIcon from '@mui/icons-material/Message'
import WorkIcon from '@mui/icons-material/Work'

export function UserDetails() {
  const params = useParams()
  const user = useSelector(storeState => storeState.userModule.watchedUser)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)
  const isLoading = useSelector(storeState => storeState.systemModule.isLoading)

  useEffect(() => {
    loadUser(params.id)
    loadGigs()
  }, [params.id])

  // Filter gigs to show only this user's gigs
  const userGigs = gigs?.filter(gig => gig.owner?._id === user?._id) || []
  const topGigs = userGigs.slice(0, 8) // Show top 8 gigs

  function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }


  function formatJoinDate(createdAt) {
    if (!createdAt) return 'N/A'
    return new Date(createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <section className="user-profile">
        <LoadingSpinner message="Loading profile..." />
      </section>
    )
  }

  if (!user) {
    return (
      <section className="user-profile">
        <div className="profile-error">
          <h2>User not found</h2>
          <p>The user you're looking for doesn't exist or has been removed.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="user-profile">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-image-section">
            <img 
              src={user.imgUrl || '/images/profile-default.png'} 
              alt={user.fullname}
              className="profile-image"
            />
            <div className="profile-badge">
              <Level level={user.level} />
            </div>
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">{user.fullname}</h1>
            <p className="profile-profession">{user.proffession}</p>
            <div className="profile-location">
              <LocationOnIcon className="location-icon" />
              <span>{user.location?.name || 'Location not specified'}</span>
            </div>
            <div className="profile-join-date">
              <CalendarTodayIcon className="join-icon" />
              <span>Joined {formatJoinDate(user.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="profile-grid">
          {/* Sidebar - User Stats */}
          <aside className="profile-sidebar">
            {/* Profile Stats */}
            <div className="profile-stats">
              <h3>Statistics</h3>
              <div className="stat-card">
                <StarIcon className="stat-icon" />
                <div className="stat-content">
                  <h4>{user.rate || 0}</h4>
                  <p>Rating</p>
                </div>
              </div>
              
              <div className="stat-card">
                <DiamondIcon className="stat-icon" />
                <div className="stat-content">
                  <h4>{user.level || 1}</h4>
                  <p>Level</p>
                </div>
              </div>
              
              <div className="stat-card">
                <LanguageIcon className="stat-icon" />
                <div className="stat-content">
                  <h4>{user.languages?.length || 0}</h4>
                  <p>Languages</p>
                </div>
              </div>

              <div className="stat-card">
                <WorkIcon className="stat-icon" />
                <div className="stat-content">
                  <h4>{userGigs.length}</h4>
                  <p>Gigs</p>
                </div>
              </div>
            </div>

            {/* Languages */}
            {user.languages && user.languages.length > 0 && (
              <div className="languages-section">
                <h3>Languages</h3>
                <div className="languages-list">
                  {user.languages.map((language, index) => (
                    <span key={index} className="language-tag">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Button */}
            <div className="profile-actions">
              <button className="contact-btn">
                <MessageIcon className="contact-icon" />
                Contact Me
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="profile-main">
            {/* About Section */}
            <div className="about-section">
              <h2>About {user.fullname}</h2>
              <p className="about-text">
                {user.proffession || 'No description available'}
              </p>
            </div>

            {/* User's Gigs */}
            {topGigs.length > 0 && (
              <div className="user-gigs-section">
                <h2>Top Gigs by {user.fullname}</h2>
                <GigList gigs={topGigs} />
              </div>
            )}

            {topGigs.length === 0 && (
              <div className="no-gigs-section">
                <WorkIcon className="no-gigs-icon" />
                <h3>No gigs available</h3>
                <p>This user hasn't created any gigs yet.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  )
}