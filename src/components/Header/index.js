import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-bg">
      <ul className="nav-list">
        <Link to="/">
          <li className="nav-list-item">
            <img
              src="https://res.cloudinary.com/dyuf16cea/image/upload/v1707576156/Next%20Asses%20Project%20Resource/HeaderLogo_kizdgk.png"
              alt="website logo"
              className="header-website-logo"
            />
          </li>
        </Link>
        <li className="nav-list-item">
          <button type="button" className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
