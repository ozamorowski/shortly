import { useState } from 'react'

const Header = () => {
  const [menuActive, setMenuActive] = useState(false)

  return (
    <nav className="navbar py-4" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="./">
          <h1 className="title">Shortly</h1>
        </a>

        <a
          role="button"
          className={`navbar-burger burger ${menuActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarTarget"
          onClick={() => setMenuActive(!menuActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarTarget"
        className={`navbar-menu ${menuActive ? 'is-active' : ''}`}
      >
        <div className="navbar-start">
          <a className="navbar-item">Features</a>

          <a className="navbar-item">Pricing</a>

          <a className="navbar-item">Resources</a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <a className="button is-text">Log in</a>
          </div>
          <div className="navbar-item">
            <a className="button is-primary is-rounded">
              <strong>Sign up</strong>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
