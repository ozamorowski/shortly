function Statistics() {
  return (
    <div id="statistics" className="section has-background-light">
      <div className="container">
        <h1 className="title has-text-centered mb-3 is-spaced">
          Advanced Statistics
        </h1>
        <h2 className="subtitle has-text-centered column is-half is-offset-one-quarter has-text-grey-light">
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </h2>
        <div className="columns mt-6">
          <div className="column has-background-white p-6">
            <span className="icon is-large">
              <img src="/icon-brand-recognition.svg" alt="" />
            </span>
            <h2 className="title is-4">Brand recognition</h2>
            <p className="has-text-grey-light">
              Boost your brand recognition with each click. Generic links don’t
              mean a thing. Branded links help instil confidence in your
              content.
            </p>
          </div>
          <div className="column has-background-white p-6">
            <span className="icon is-large">
              <img src="/icon-detailed-records.svg" alt="" />
            </span>
            <h2 className="title is-4">Detailed records</h2>
            <p className="has-text-grey-light">
              Gain insights into who is clicking your links. Knowing when and
              where people engage with your content helps inform better
              decisions.
            </p>
          </div>
          <div className="column has-background-white p-6">
            <span className="icon is-large">
              <img src="/icon-fully-customizable.svg" alt="" />
            </span>
            <h2 className="title is-4">Fully Customizable</h2>
            <p className="has-text-grey-light">
              Improve brand awareness and content discoverability through
              customizable links, supercharging audience engagement.
            </p>
          </div>
          <hr className="background" />
        </div>
      </div>
    </div>
  )
}

export default Statistics
