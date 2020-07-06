import { useState, useEffect } from 'react'
import axios from 'axios'
import lscache from 'lscache'

import Hero from '../components/Hero'

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
      .post('https://rel.ink/api/links/', { url })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response.data)
        setError('Please enter valid URL')
        setLoading(false)
      })

    if (result) {
      const duplicate = list.filter((l) => l.hashid === result.hashid)

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

  const handleCopy = (hashid) => {
    const textArea = document.getElementById('textarea-' + hashid)
    const button = document.getElementById('button-' + hashid)
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

  const handleDelete = (hashid) => {
    const removed = list.filter((item) => item.hashid != hashid)
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

          {list.map(({ url, hashid }, index) => (
            <div
              key={index + 1}
              className="results columns is-vcentered has-background-white px-4 py-4 my-4"
            >
              <div className="column">
                <h4 className="is-size-4">{url}</h4>
              </div>
              <div className="column is-flex pull-right is-vcentered">
                <a target="_blank" href={`https://rel.ink/${hashid}`}>
                  https://rel.ink/{hashid}
                </a>

                <button
                  id={'button-' + hashid}
                  onClick={() => handleCopy(hashid)}
                  className="button is-primary ml-4"
                >
                  Copy
                </button>
                <button
                  className="delete is-invisible ml-3"
                  onClick={() => handleDelete(hashid)}
                ></button>
                <textarea
                  id={'textarea-' + hashid}
                  cols="4"
                  rows="1"
                  value={`https://rel.ink/${hashid}`}
                  className="is-sr-only"
                  readOnly
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Index
