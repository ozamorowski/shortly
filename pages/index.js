import { useState, useEffect } from 'react'
import axios from 'axios'
import lscache from 'lscache'

const initialList = lscache.get('list') ? lscache.get('list') : []

function Index() {
  const [url, setUrl] = useState('')
  const [list, setList] = useState(initialList)
  const [error, setError] = useState(false)

  useEffect(
    function setLocalStorage() {
      lscache.set('list', list)
    },
    [list]
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await axios
      .post('https://rel.ink/api/links/', { url })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response.data)
        setError(true)
      })

    if (result) {
      setList([result, ...list])
      setUrl('')
    }
  }

  const handleChange = (e) => {
    setUrl(e.target.value)
    setError(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="http://"
          type="url"
          name="url"
          value={url}
          onChange={handleChange}
        />
      </form>

      <ul>
        {list.map(({ url, hashid }, index) => (
          <li key={index + 1} className="item">
            {url} -
            <a target="_blank" href={`https://rel.ink/${hashid}`}>
              https://rel.ink/{hashid}
            </a>
          </li>
        ))}
      </ul>

      {error && <p>Please enter valid url!</p>}
    </>
  )
}

export default Index
