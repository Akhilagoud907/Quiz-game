import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showError: false,
    showPassword: false,
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const {history} = this.props

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    })

    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg, showError: true})
    }
  }

  render() {
    if (Cookies.get('jwt_token')) {
      return <Redirect to="/" />
    }

    const {username, password, errorMsg, showError, showPassword} = this.state

    return (
      <div className="login-bg">
        <div className="login-card">
          <img
            src="https://res.cloudinary.com/dqwm35pyb/image/upload/v1772024414/Frame_8787_cfcz38.png"
            alt="login website logo"
            className="login-logo"
          />

          <form className="login-form" onSubmit={this.onSubmitForm}>
            <label htmlFor="username">USERNAME</label>
            <input
              className="login-input"
              id="username"
              type="text"
              value={username}
              onChange={e => this.setState({username: e.target.value})}
            />

            <label htmlFor="password">PASSWORD</label>
            <input
              className="login-input"
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => this.setState({password: e.target.value})}
            />

            <label htmlFor="showPassword">
              <input
                id="showPassword"
                type="checkbox"
                checked={showPassword}
                onChange={() =>
                  this.setState(prev => ({
                    showPassword: !prev.showPassword,
                  }))
                }
              />
              Show Password
            </label>

            <button className="login-btn" type="submit">
              Login
            </button>

            {showError && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
