import { useState } from 'react'

function debounce(callback, delay = 300) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

const ComponentWithOwnDebounce = () => {
  const [inputValue, setInputValue] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  const handleInputChange = debounce(async (event) => {
    setInputValue(event.target.value)
    // Imagine very heavy request
    const response = await fetch("http://localhost:3000/suggestions")
    const data = await response.json()
    const filteredSuggestions = data.filter(({content}) => content.includes(event.target.value))
    setSuggestions(filteredSuggestions)
  }, 400)

  return (
    <>
      <h2>Own Debounce Example</h2>
      <input onChange={handleInputChange} /><br/>
      {inputValue !== null && suggestions.length === 0  && (<>No Matches</>)}
      {inputValue !== null && inputValue.length !== 0 && suggestions.map(({id, content}) => (
            <span key={id}>{content}</span>
      ))}
    </>
  )
}

export default ComponentWithOwnDebounce
