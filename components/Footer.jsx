import {
  Facebook,
  Twitter,
  Pinterest,
  Instagram,
} from '@icons-pack/react-simple-icons'

const Footer = () => {
  return (
    <footer className="footer has-text-centered-mobile">
      <div className="container">
        <div className="columns">
          <div className="column">
            <h1 className="is-size-3">Shortly</h1>
          </div>
          <div className="column is-three-fifths pt-5">
            <div className="columns">
              <div className="column">
                <h4>Features</h4>
                <ul className="has-text-grey">
                  <li>Link Shortening</li>
                  <li>Branded Links</li>
                  <li>Analytics</li>
                </ul>
              </div>
              <div className="column">
                <h4>Resources</h4>
                <ul className="has-text-grey">
                  <li>Blog</li>
                  <li>Developers</li>
                  <li>Support</li>
                </ul>
              </div>
              <div className="column">
                <h4>Company</h4>
                <ul className="has-text-grey">
                  <li>About</li>
                  <li>Our Team</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="column is-flex pt-5">
            <span className="icon">
              <Facebook color="white" />
            </span>
            <span className="icon">
              <Twitter color="white" />
            </span>
            <span className="icon">
              <Pinterest color="white" />
            </span>
            <span className="icon">
              <Instagram color="white" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
