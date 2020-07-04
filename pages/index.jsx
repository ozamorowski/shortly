import { useState, useEffect } from 'react'
import axios from 'axios'
import lscache from 'lscache'

import Hero from '../components/Hero'

const initialList = lscache.get('list') ? lscache.get('list') : []

function Index() {
  const [url, setUrl] = useState('')
  const [list, setList] = useState(initialList)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(
    function setLocalStorage() {
      lscache.set('list', list)
    },
    [list]
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await axios
      .post('https://rel.ink/api/links/', { url })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response.data)
        setError(true)
        setLoading(false)
      })

    if (result) {
      setList([result, ...list])
      setUrl('')
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setUrl(e.target.value)
    setError(false)
  }

  const handleCopy = (hashid) => {
    const textArea = document.getElementById('textarea-' + hashid)
    const button = document.getElementById('button-' + hashid)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand('copy')

      if (successful) {
        button.textContent = 'Copied!'
        setTimeout(() => {
          button.textContent = 'Copy'
        }, 1000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Hero />
      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="http://"
              type="url"
              name="url"
              value={url}
              onChange={handleChange}
              className="input"
            />
            <a
              type="submit"
              onClick={handleSubmit}
              className={`button is-primary ${loading ? 'is-loading' : ''}`}
            >
              Shorten it!
            </a>
          </form>

          <ul>
            {list.map(({ url, hashid }, index) => (
              <li key={index + 1} className="item">
                {url} -
                <a target="_blank" href={`https://rel.ink/${hashid}`}>
                  https://rel.ink/{hashid}
                </a>
                <textarea
                  id={'textarea-' + hashid}
                  cols="4"
                  rows="1"
                  value={`https://rel.ink/${hashid}`}
                  className="is-sr-only"
                  readOnly
                ></textarea>
                <button
                  id={'button-' + hashid}
                  onClick={() => handleCopy(hashid)}
                >
                  Copy
                </button>
              </li>
            ))}
          </ul>

          {error && <p>Please enter valid url!</p>}
        </div>
      </section>
    </>
  )
}

export default Index
