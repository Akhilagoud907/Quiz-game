import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dqwm35pyb/image/upload/v1772024414/Frame_8787_cfcz38.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <button type="button" onClick={onClickLogout} className="logout-btn">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
