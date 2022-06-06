import { useState, useEffect } from 'react'
import axios from 'axios'
import lscache from 'lscache'

import Hero from '../components/Hero'
import Statistics from '../components/Statistics'
import GetStarted from '../components/GetStarted'

const initialList = lscache.get('list') ? lscache.get('list') : []

function Index() {
  const [url, setUrl] = useState('')
  const [list, setList] = useState(initialList)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
      .get('https://api.shrtco.de/v2/shorten?url=' + url)
      .then((response) => response.data.result)
      .catch((error) => {
        console.log(error.response.data)
        setError('Please enter valid URL')
        setLoading(false)
      })

    if (result) {
      const duplicate = list.filter((l) => l.code === result.code)

      if (!duplicate.length) {
        setList([result, ...list])
        setUrl('')
        setLoading(false)
      } else {
        setLoading(false)
        setError('Item already exist!')
      }
    }
  }

  const handleChange = (e) => {
    setUrl(e.target.value)
    setError('')
  }

  const handleCopy = (code) => {
    const textArea = document.getElementById('textarea-' + code)
    const button = document.getElementById('button-' + code)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand('copy')

      if (successful) {
        button.textContent = 'Copied!'
        button.classList.add('is-dark')
        button.classList.remove('is-primary')
        setTimeout(() => {
          button.textContent = 'Copy'
          button.classList.remove('is-dark')
          button.classList.add('is-primary')
        }, 1000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = (code) => {
    const removed = list.filter((item) => item.code != code)
    setList(removed)
  }

  return (
    <>
      <Hero />
      <div className="has-background-light">
        <div className="container form-container">
          <form onSubmit={handleSubmit} className="field is-grouped">
            <div className="control is-expanded">
              <input
                placeholder="Shorten a link here..."
                type="url"
                name="url"
                value={url}
                onChange={handleChange}
                className={`input is-medium ${error ? 'is-danger' : ''}`}
              />
              {error && <p className="help is-danger">{error}</p>}
            </div>
            <div className="control">
              <a
                type="submit"
                onClick={handleSubmit}
                className={`button is-primary is-medium ${
                  loading ? 'is-loading' : ''
                }`}
              >
                Shorten it!
              </a>
            </div>
          </form>

          {list.map(({ original_link, short_link, code }, index) => (
            <div
              key={index + 1}
              className="results columns is-vcentered has-background-white px-4 py-4 my-4"
            >
              <div className="column">
                <h4 className="is-size-4">{original_link}</h4>
              </div>
              <div className="column is-flex pull-right is-vcentered">
                <a target="_blank" href={short_link}>
                  {short_link}
                </a>

                <button
                  id={'button-' + code}
                  onClick={() => handleCopy(code)}
                  className="button is-primary ml-4"
                >
                  Copy
                </button>
                <button
                  className="delete is-invisible ml-3"
                  onClick={() => handleDelete(code)}
                ></button>
                <textarea
                  id={'textarea-' + code}
                  cols="4"
                  rows="1"
                  value={short_link}
                  className="is-sr-only"
                  readOnly
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Statistics />
      <GetStarted />
    </>
  )
}

export default Index
